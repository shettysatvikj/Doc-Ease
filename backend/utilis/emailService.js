import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

/* =========================================
   TRANSPORTER CONFIG
========================================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =========================================
   COMMON EMAIL TEMPLATE WRAPPER
========================================= */
const emailWrapper = (content) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #06353b;">
    <h2 style="margin-bottom: 10px;">Dr. Ease Private Clinic</h2>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
    ${content}
    <br/>
    <p style="margin-top: 30px; font-size: 12px; color: #6b7280;">
      This is an automated message. Please do not reply directly.
    </p>
  </div>
`;

/* =========================================
   CONFIRMATION EMAIL
========================================= */
export const sendConfirmationEmail = async ({
  name,
  email,
  date,
  time,
}) => {
  await transporter.sendMail({
    from: `"Dr. Ease Clinic" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "✅ Appointment Confirmed - Dr. Ease Clinic",
    html: emailWrapper(`
      <p>Hello <strong>${name}</strong>,</p>
      <p>Your appointment has been successfully confirmed.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p>Please arrive 10 minutes early.</p>
      <p>We look forward to seeing you.</p>
    `),
  });

  console.log("✅ Confirmation email sent to:", email);
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
  await transporter.sendMail({
    from: `"Dr. Ease Clinic" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "⏰ Appointment Reminder - Dr. Ease Clinic",
    html: emailWrapper(`
      <p>Hello <strong>${name}</strong>,</p>
      <p>This is a reminder for your upcoming appointment.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p>Please arrive 10 minutes early.</p>
    `),
  });

  console.log("✅ Reminder sent to:", email);
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
  await transporter.sendMail({
    from: `"Dr. Ease Clinic" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "❌ Appointment Cancelled - Dr. Ease Clinic",
    html: emailWrapper(`
      <p>Hello <strong>${name}</strong>,</p>
      <p>Your appointment has been cancelled.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p>If this was not intended, please contact the clinic or reschedule.</p>
    `),
  });

  console.log("✅ Cancellation email sent to:", email);
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
  await transporter.sendMail({
    from: `"Dr. Ease Clinic" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔄 Appointment Rescheduled - Dr. Ease Clinic",
    html: emailWrapper(`
      <p>Hello <strong>${name}</strong>,</p>
      <p>Your appointment has been successfully rescheduled.</p>

      <p><strong>Previous:</strong><br/>
      ${oldDate} at ${oldTime}</p>

      <p><strong>New Schedule:</strong><br/>
      ${newDate} at ${newTime}</p>

      <p>Please contact us if you have any questions.</p>
    `),
  });

  console.log("✅ Reschedule email sent to:", email);
};