import Imap from "imap";
import { simpleParser } from "mailparser";
import Email from "../models/email.model.js"; // MongoDB Email model

export const inboxReceiveMail = async (req, res) => {
  const { userEmail } = req.body;

  if (!userEmail) {
    return res
      .status(400)
      .json({ code: 3, success: false, error: "userEmail field is required" });
  }
  try {
    if (!userEmail) {
      return res
        .status(400)
        .json({ success: false, error: "email is noot provided" });
    }
    const inbox = await Email.find({ to: userEmail, type: "receive" }).sort({
      date: -1,
    });
    return res.status(200).json({
      mails: inbox || [],
    });
  } catch (error) {
    console.log("Error: ==>  ", error.message);
    return res
      .status(500)
      .json({ code: 3, success: false, error: error.message });
  }
};

export const inboxSendMail = async (req, res) => {
  const { userEmail } = req.body;
  try {
    if (!userEmail) {
      return res
        .status(400)
        .json({ success: false, error: "email is noot provided" });
    }
    const inbox = await Email.find({ from: userEmail, type: "sent" }).sort({
      date: -1,
    });
    return res.status(200).json({
      mails: inbox || [],
    });
  } catch (error) {
    console.log("Error: ==>  ", error.message);
    return res
      .status(500)
      .json({ code: 3, success: false, error: error.message });
  }
};
