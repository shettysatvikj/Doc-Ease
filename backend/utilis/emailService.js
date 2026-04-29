import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;

/* =========================================
   BASE EMAIL FUNCTION USING BREVO API
========================================= */
const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Dr. Ease Clinic",
          email: SENDER_EMAIL,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent:", response.data.messageId);
    return true;
  } catch (error) {
    console.error(
      "❌ Brevo API Error:",
      error.response?.data || error.message
    );
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
    `,
  });
};

/* =========================================
   REMINDER EMAIL
========================================= */
export const sendReminderEmail = async ({
  name,
  email,
  date,
  time,
}) => {
  return sendEmail({
    to: email,
    subject: "⏰ Appointment Reminder",
    html: `
      <h3>Hello ${name},</h3>
      <p>This is a reminder for your appointment.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
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
