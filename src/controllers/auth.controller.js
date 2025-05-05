import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  let { username, password } = req.body;

  username = username.trim() || "";

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: "please fill the form fields",
    });
  }

  try {
    const email = `${username}@mail.irfans.dev`;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
    });

    user.smtpPassword = `${email}mission24`;

    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: "User not found" });
    }

    // Compare the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
