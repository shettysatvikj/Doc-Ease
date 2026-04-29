import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

/* =========================================
   BREVO SMTP CONFIG
========================================= */
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

/* =========================================
   VERIFY CONNECTION
========================================= */
transporter.verify((error) => {
  if (error) {
    console.error("❌ Brevo SMTP Error:", error);
  } else {
    console.log("✅ Brevo SMTP Connected");
  }
});

/* =========================================
   BASE SEND FUNCTION
========================================= */
const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Dr. Ease Clinic" <${process.env.SENDER_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
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
