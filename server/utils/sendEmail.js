import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const resend = new Resend(process.env.RESEND_API_KEY);

// Resend email function (preferred)
async function sendEmailWithResend(to, subject, htmlContent) {
  try {
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@daveenci.ai',
      to,
      subject,
      html: htmlContent,
    });
    console.log('✅ Email sent successfully with Resend:', result.id);
    return result;
  } catch (error) {
    console.error('❌ Resend email failed:', error);
    throw error;
  }
}

// Fallback SMTP function (backup)
async function sendEmailWithSMTP(to, subject, htmlContent) {
  const transporter = nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent
  };

  return await transporter.sendMail(mailOptions);
}

// Main email function with intelligent fallback
export async function sendEmail(to, subject, htmlContent, useResend = true) {
  // Try Resend first if API key is available
  if (useResend && process.env.RESEND_API_KEY) {
    try {
      return await sendEmailWithResend(to, subject, htmlContent);
    } catch (error) {
      console.log('🔄 Resend failed, trying SMTP fallback...');
      // Fall back to SMTP if Resend fails
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        return await sendEmailWithSMTP(to, subject, htmlContent);
      }
      throw error;
    }
  }
  
  // Use SMTP if no Resend API key
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log('📧 Using SMTP (no Resend API key found)');
    return await sendEmailWithSMTP(to, subject, htmlContent);
  }

  // No email configuration found
  console.log('⚠️ No email configuration found, logging email content:');
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Content: ${htmlContent}`);
  
  return { message: 'Email logged (no service configured)' };
} 