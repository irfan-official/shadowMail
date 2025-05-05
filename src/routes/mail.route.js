import express from "express";
import authenticateUser from "../middlewares/protectedRoute.middleware.js";
import sendMail from "../controllers/sendMail.controller.js";
import { inboxReceiveMail, inboxSendMail } from "../controllers/inbox.controller.js";

const router = express.Router();

router.post("/sendmail", authenticateUser, sendMail);
router.post("/inbox/receive", authenticateUser, receiveMail);
router.post("/inbox/send", authenticateUser, receiveMail);
export default router;
