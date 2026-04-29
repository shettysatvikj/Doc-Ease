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
    subject: "Appointment Confirmed | Dr. Ease Clinic",
    html: `
      <div style="font-family: Arial, sans-serif; background-color:#f4f6f8; padding:30px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px;">
          
          <h2 style="color:#0f766e; margin-bottom:5px;">Dr. Ease Private Clinic</h2>
          <p style="color:#6b7280; margin-top:0;">Your Health, Our Priority</p>
          
          <hr style="margin:20px 0; border:none; border-top:1px solid #e5e7eb;" />

          <h3 style="color:#111827;">Appointment Confirmation</h3>

          <p>Hello <strong>${name}</strong>,</p>

          <p>
            This is to confirm that your appointment has been successfully scheduled.
            Please find the details below:
          </p>

          <div style="background:#f9fafb; padding:15px; border-radius:6px; margin:20px 0;">
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Location:</strong> Dr. Ease Private Clinic</p>
          </div>

          <p>
            Kindly arrive at least 10 minutes before your scheduled time.
          </p>

          <p>
            If you need to cancel or reschedule, please contact us at the details below.
          </p>

          <hr style="margin:25px 0; border:none; border-top:1px solid #e5e7eb;" />

          <p style="font-size:14px; color:#6b7280;">
            Dr. Ease Private Clinic <br/>
            Email: support@drease.com <br/>
            Phone: +91-XXXXXXXXXX
          </p>

          <p style="font-size:12px; color:#9ca3af;">
            This is an automated email. Please do not reply directly to this message.
          </p>

        </div>
      </div>
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
    subject: "Appointment Cancelled | Dr. Ease Clinic",
    html: `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px;">
          
          <h2 style="color:#b91c1c;">Appointment Cancelled</h2>

          <p>Hello <strong>${name}</strong>,</p>

          <p>Your appointment has been cancelled.</p>

          <div style="background:#fef2f2; padding:15px; border-radius:6px; margin:20px 0;">
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Reason:</strong> ${reason}</p>
          </div>

          <p>If this was a mistake, please contact the clinic to reschedule.</p>

          <hr style="margin:25px 0;" />

          <p style="font-size:12px; color:#6b7280;">
            Dr. Ease Private Clinic
          </p>

        </div>
      </div>
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
    subject: "Appointment Rescheduled | Dr. Ease Clinic",
    html: `
      <div style="font-family: Arial, sans-serif; background-color:#f4f6f8; padding:30px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px;">
          
          <h2 style="color:#0f766e; margin-bottom:5px;">Dr. Ease Private Clinic</h2>
          <p style="color:#6b7280; margin-top:0;">Your Health, Our Priority</p>
          
          <hr style="margin:20px 0; border:none; border-top:1px solid #e5e7eb;" />

          <h3 style="color:#111827;">Appointment Rescheduled</h3>

          <p>Hello <strong>${name}</strong>,</p>

          <p>
            Your appointment has been successfully rescheduled. 
            Please review the updated details below:
          </p>

          <!-- Previous Appointment -->
          <div style="background:#fef3c7; padding:15px; border-radius:6px; margin:20px 0;">
            <p><strong>Previous Date:</strong> ${oldDate}</p>
            <p><strong>Previous Time:</strong> ${oldTime}</p>
          </div>

          <!-- New Appointment -->
          <div style="background:#ecfdf5; padding:15px; border-radius:6px; margin:20px 0;">
            <p><strong>New Date:</strong> ${newDate}</p>
            <p><strong>New Time:</strong> ${newTime}</p>
            <p><strong>Location:</strong> Dr. Ease Private Clinic</p>
          </div>

          <p>
            Kindly arrive at least 10 minutes before your scheduled time.
          </p>

          <p>
            If you have any questions or need further changes, please contact us.
          </p>

          <hr style="margin:25px 0; border:none; border-top:1px solid #e5e7eb;" />

          <p style="font-size:14px; color:#6b7280;">
            Dr. Ease Private Clinic <br/>
            Email: support@drease.com <br/>
            Phone: +91-XXXXXXXXXX
          </p>

          <p style="font-size:12px; color:#9ca3af;">
            This is an automated email. Please do not reply directly to this message.
          </p>

        </div>
      </div>
    `,
  });
};
