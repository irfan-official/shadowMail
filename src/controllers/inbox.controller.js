import Imap from "imap";
import { simpleParser } from "mailparser";
import Email from "../models/email.model.js"; // MongoDB Email model

export const receiveMail = async (req, res) => {
  const userEmail = req.user.email;
  try {
    if (!userEmail) {
      return res
        .status(400)
        .json({ success: false, error: "email is noot provided" });
    }
    const inbox = await Email.find({ to: userEmail, type: "receive" }).sort({
      date: -1,
    });
    res.json(inbox);
  } catch (error) {
    console.log("Error: ==>  ", error.message);
    res.status(500).json({ code: 3, success: false, error: error.message });
  }
};

export const sendMail = async (req, res) => {
  const userEmail = req.user.email;
  try {
    if (!userEmail) {
      return res
        .status(400)
        .json({ success: false, error: "email is noot provided" });
    }
    const inbox = await Email.find({ from: userEmail, type: "sent" }).sort({
      date: -1,
    });
    res.json(inbox);
  } catch (error) {
    console.log("Error: ==>  ", error.message);
    res.status(500).json({ code: 3, success: false, error: error.message });
  }
};
