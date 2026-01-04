import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // optional but helpful
    await transporter.verify();

    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);

    console.log(" Email sent successfully");
  } catch (error) {
    console.error(" sendMail Error:", error);
    throw error;
  }
};

export default sendMail;
