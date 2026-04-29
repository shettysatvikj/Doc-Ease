import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const SENDER = "Dr. Ease Clinic <onboarding@resend.dev>";
// Later you can verify your own domain

/* =========================================
   BASE SEND FUNCTION
========================================= */
const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: SENDER,
      to,
      subject,
      html,
    });

    if (response.error) {
      console.error("❌ Resend Error:", response.error);
      return false;
    }

    console.log("✅ Email sent successfully:", response.data?.id);
    return true;

  } catch (error) {
    console.error("❌ Email failed:", error.message);
    return false;
  }
};

/* =========================================
   CONFIRMATION EMAIL
========================================= */
export const sendConfirmationEmail = async ({
  name,
  email,
  date,
  time,
}) => {
  return sendEmail({
    to: email,
    subject: "✅ Appointment Confirmed - Dr. Ease Clinic",
    html: `
      <h3>Hello ${name},</h3>
      <p>Your appointment has been confirmed.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p>Please arrive 10 minutes early.</p>
    `,
  });
};

/* =========================================
   CANCELLATION EMAIL
========================================= */
export const sendCancellationEmail = async ({
  name,
  email,
  date,
  time,
  reason,
}) => {
  return sendEmail({
    to: email,
    subject: "❌ Appointment Cancelled",
    html: `
      <h3>Hello ${name},</h3>
      <p>Your appointment has been cancelled.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Reason:</strong> ${reason}</p>
    `,
  });
};

/* =========================================
   RESCHEDULE EMAIL
========================================= */
export const sendRescheduleEmail = async ({
  name,
  email,
  oldDate,
  oldTime,
  newDate,
  newTime,
}) => {
  return sendEmail({
    to: email,
    subject: "🔄 Appointment Rescheduled",
    html: `
      <h3>Hello ${name},</h3>
      <p>Your appointment has been rescheduled.</p>
      <p><strong>Old:</strong> ${oldDate} at ${oldTime}</p>
      <p><strong>New:</strong> ${newDate} at ${newTime}</p>
    `,
  });
};
export const sendReminderEmail = async ({
  name,
  email,
  date,
  time,
}) => {
  return sendEmail({
    to: email,
    subject: "⏰ Appointment Reminder - Dr. Ease Clinic",
    html: `
      <h3>Hello ${name},</h3>
      <p>This is a reminder for your upcoming appointment.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p>Please arrive 10 minutes early.</p>
    `,
  });
};
