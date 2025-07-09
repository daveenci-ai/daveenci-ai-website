import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const resend = new Resend(process.env.RESEND_API_KEY);

// Resend email function (preferred)
async function sendEmailWithResend(to, subject, htmlContent) {
  try {
    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Email send timeout')), 15000)
    );
    
    const emailPromise = resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@daveenci.ai',
      to,
      subject,
      html: htmlContent,
    });

    const result = await Promise.race([emailPromise, timeoutPromise]);
    console.log('✅ Email sent successfully with Resend:', result.id);
    return result;
  } catch (error) {
    console.error('❌ Resend email failed:', error.message);
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
    },
    timeout: 10000, // 10 second timeout
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent
  };

  // Add timeout to prevent hanging
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('SMTP timeout')), 15000)
  );

  return await Promise.race([
    transporter.sendMail(mailOptions),
    timeoutPromise
  ]);
}

// Main email function with intelligent fallback
export async function sendEmail(to, subject, htmlContent, useResend = true) {
  const startTime = Date.now();
  
  // Try Resend first if API key is available
  if (useResend && process.env.RESEND_API_KEY) {
    try {
      const result = await sendEmailWithResend(to, subject, htmlContent);
      console.log(`📧 Email sent via Resend in ${Date.now() - startTime}ms`);
      return result;
    } catch (error) {
      console.log('🔄 Resend failed, trying SMTP fallback...');
      // Fall back to SMTP if Resend fails
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          const result = await sendEmailWithSMTP(to, subject, htmlContent);
          console.log(`📧 Email sent via SMTP fallback in ${Date.now() - startTime}ms`);
          return result;
        } catch (smtpError) {
          console.error('❌ Both Resend and SMTP failed:', smtpError.message);
          throw error; // Throw original Resend error
        }
      }
      throw error;
    }
  }
  
  // Use SMTP if no Resend API key
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log('📧 Using SMTP (no Resend API key found)');
    try {
      const result = await sendEmailWithSMTP(to, subject, htmlContent);
      console.log(`📧 Email sent via SMTP in ${Date.now() - startTime}ms`);
      return result;
    } catch (error) {
      console.error('❌ SMTP failed:', error.message);
      throw error;
    }
  }

  // No email configuration found
  console.log('⚠️ No email configuration found, logging email content:');
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Content: ${htmlContent}`);
  
  return { message: 'Email logged (no service configured)' };
} 