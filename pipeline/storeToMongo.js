import mongoose from "mongoose";
import { simpleParser } from "mailparser";
import Email from "../src/models/email.model.js";
import connection from "../src/connections/mongoose.connnect.js";

// MongoDB connection
connection();

// Read raw email from stdin
let emailRaw = "";

process.stdin.on("data", (chunk) => (emailRaw += chunk));
process.stdin.on("end", async () => {
  try {
    const parsed = await simpleParser(emailRaw);

    await Email.create({
      from: parsed.from?.text,
      to: parsed.to?.value.map((t) => t.address),
      subject: parsed.subject,
      text: parsed.text,
      html: parsed.html,
      type: "receive",
      date: parsed.date || new Date(),
      raw: emailRaw || "",
    });

    console.log("Email saved to MongoDB");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error saving email:", err);
    mongoose.disconnect();
  }
});
