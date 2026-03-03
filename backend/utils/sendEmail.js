import nodemailer from "nodemailer";

const sendMail = async ({ name, email, userId }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Verification mail",
      html: `<p>Hi ${name} Please <a href="${process.env.SERVER_URL}/api/auth/verify-mail?id=${userId}">Click here</a></p> to verify your email.`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully! " + info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default sendMail;
