import cron from "node-cron";
import Appointment from "../models/Appointment.js";
import { sendReminderEmail } from "../utilis/emailService.js";

export const startReminderJob = () => {
  cron.schedule("0 * * * *", async () => {   // ✅ every minute for testing
    console.log("⏰ Checking for upcoming appointments...");

    const now = new Date();

    // ✅ IMPORTANT: populate patient
    const appointments = await Appointment.find({
      reminderEmailSent: false,
      status: { $in: ["pending", "approved"] },
    }).populate("patient");

  for (let appt of appointments) {
  const appointmentDateTime = appt.appointmentDateTime;
  const diffInMs = appointmentDateTime - now;
  const diffInHours = diffInMs / (1000 * 60 * 60);

  console.log("Diff hours:", diffInHours);

  // ✅ Send 2 hours before
  if (diffInHours <= 2 && diffInHours > 1) {

    console.log("✅ Sending 2-hour reminder to:", appt.patient.email);

    await sendReminderEmail({
      name: appt.patient.name,
      email: appt.patient.email,
      date: appt.date,
      time: appt.time,
    });

    appt.reminderEmailSent = true;
    await appt.save();
  }
}
  });

  console.log("✅ Reminder job started");
};