import nodemailer from "nodemailer";
import Email from "../models/email.model.js";
import User from "../models/user.model.js";

const sendMail = async (req, res) => {
  const { userEmail, to, subject, message } = req.body;

  if (!to || !subject || !message || !userEmail) {
    return res.status(400).json({
      success: false,
      error: "please fill the form",
    });
  }

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return res.status(400).json({
      success: false,
      error: "No valid user",
    });
  }

  // Transporter configuration for sending emails
  const transporter = nodemailer.createTransport({
    host: "mail.irfans.dev", // Your SMTP server
    port: 25, // SMTP port
    secure: false,
    auth: {
      user: user.email, // dynamic user
      pass: user.smtpPassword, // from your MongoDB
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${user.name}" <${user.email}>`,
      to,
      subject,
      text: message,
    });

    // Save sent email to MongoDB
    const sentEmail = await Email.create({
      from: userEmail,
      to,
      subject,
      text: message,
      type: "sent",
      createdAt: new Date(),
    });

    res.json({
      success: true,
      info: `sent mail to: ${sentEmail.to} from: ${sentEmail.from}`,
      messageId: info.messageId || "",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default sendMail;
