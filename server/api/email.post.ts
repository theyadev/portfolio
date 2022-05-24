import { createTransport } from "nodemailer";

export default defineEventHandler(async (event) => {
  const { googleUser, googlePass, email } = useRuntimeConfig();

  const body = await useBody(event);

  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: googleUser,
      pass: googlePass,
    },
  });

  const info = await transporter.sendMail({
    from: `fassitheo.com <${body.email}>`,
    to: email,
    subject: "Nouveau message de: " + body.name,
    html: body.message,
  });

  console.log("Message sent: %s", info.messageId);

  return {
    message: "Message sent: " + info.messageId,
  };
});
