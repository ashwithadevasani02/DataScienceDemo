import nodemailer from 'nodemailer'
let cachedTransporter

function getTransporter() {
  if (cachedTransporter) return cachedTransporter

  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS

  if (!user || !pass) {
    throw new Error('EMAIL_USER and EMAIL_PASS must be set in environment to send emails')
  }

  const host = process.env.EMAIL_HOST || 'smtp.gmail.com'
  const port = Number(process.env.EMAIL_PORT || 465)
  const secure = process.env.EMAIL_SECURE
    ? process.env.EMAIL_SECURE === 'true'
    : port === 465

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  })

  return cachedTransporter
}

export async function sendOtpEmail(to, otpCode) {
  const transporter = getTransporter()

  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER

  const mailOptions = {
    from,
    to,
    subject: 'Your OTP Code - Data Science Club',
    text: `Your OTP is ${otpCode}. It expires in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Data Science Club Verification</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <p style="font-size: 22px; font-weight: bold; letter-spacing: 2px;">${otpCode}</p>
        <p>This code will expire in <strong>10 minutes</strong>.</p>
        <p>If you didn't request this, you can ignore this email.</p>
      </div>
    `
  }

  const info = await transporter.sendMail(mailOptions)
  if (process.env.NODE_ENV !== 'production') {
    console.log('OTP email sent:', { to, messageId: info.messageId })
  }
}

export default sendOtpEmail


