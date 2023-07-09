import nodemailer from "nodemailer";

const sendEmail = async (email, subject, payload, template) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const options = {
      from: `"GPChest" < ${process.env.FROM_EMAIL} >`,
      to: email,
      subject,
      html: template(email, payload),
    };

    // sending mail
    transporter.sendMail(options, (error, info) => {
      if (error) {
        return error;
      } else {
        return info;
      }
    });
  } catch (err) {
    return err;
  }
};

export default sendEmail;
