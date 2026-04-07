import cron from "node-cron";
import Appointment from "../models/Appointment.js";
import sendEmail from "../utils/sendEmail.js";

const startReminderJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      const oneHourLaterStart = new Date(now.getTime() + 60 * 60 * 1000);
      const oneHourLaterEnd = new Date(now.getTime() + 61 * 60 * 1000);

      const appointments = await Appointment.find({
        appointmentDateTime: {
          $gte: oneHourLaterStart,
          $lt: oneHourLaterEnd,
        },
        status: "approved",
        reminderEmailSent: false,
      })
        .populate("patient", "name email")
        .populate("doctor", "name");

      for (const appointment of appointments) {
        try {
          if (!appointment.patient?.email) continue;

          await sendEmail({
            to: appointment.patient.email,
            subject: "Appointment Reminder",
            html: `
              <h2>Appointment Reminder</h2>
              <p>Hello ${appointment.patient.name || "Patient"},</p>
              <p>This is a reminder that your appointment is in 1 hour.</p>
              <p><strong>Doctor:</strong> ${appointment.doctor?.name || "Doctor"}</p>
              <p><strong>Date:</strong> ${appointment.date}</p>
              <p><strong>Time:</strong> ${appointment.time}</p>
              <p>Please arrive on time.</p>
            `,
          });

          appointment.reminderEmailSent = true;
          await appointment.save();

          console.log(`Reminder sent to ${appointment.patient.email}`);
        } catch (emailError) {
          console.error(
            `Failed to send reminder for appointment ${appointment._id}:`,
            emailError.message
          );
        }
      }
    } catch (error) {
      console.error("Reminder job error:", error.message);
    }
  });
};

export default startReminderJob;