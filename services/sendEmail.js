import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (data) => {
  try {
    const config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: 'anton.nodemail@meta.ua',
        pass: process.env.EMAIL_PASS,
      },
    };

    const transporter = nodemailer.createTransport(config);
    const emailOptions = {
      ...data, from:
        'anton.nodemail@meta.ua'
    }
    
    await transporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error)
  }
};
