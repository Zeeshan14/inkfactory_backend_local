const nodemailer = require("nodemailer");
const sendEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const emailsend = await transporter.sendMail({
      from: `"Ink factory" <${process.env.EMAIL_USER}>`,
      to: "inkfactoryartists@gmail.com",
      subject: data.subject,
      // text: data.note,
      html: `<b>Email: ${data.email_address}</b></br><b>Name: ${data.name}</b></br><p><b>Note:</b> ${data.note}</p></br><p><b>Order Number:</b> ${data.order_number}</p>`,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
const sendEmailForOrder = async (statusChange, orderNumber, status) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const emailsend = await transporter.sendMail({
      from: `"Ink factory" <${process.env.EMAIL_USER}>`,
      to: "inkfactoryartists@gmail.com",
      subject: `${statusChange ? "Order Status Change" : "New Order Placed"}`,
      html: `${
        !statusChange
          ? `<b>Your order is placed order number ${orderNumber} </b>`
          : `<b>Status Change to ${status}  for order number ${orderNumber} </b>`
      } `,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
const sendEmailToUserForOrder = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const emailsend = await transporter.sendMail({
      from: `"Ink factory" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Order Placed",
      html: `<b>Your order is placed </b>`,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
const sendAutoReplyEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const emailsend = await transporter.sendMail({
      from: `"Ink factory" <${process.env.EMAIL_USER}>`,
      to: data.email_address,
      subject: data.subject,
      text: "Your email is received",
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = {
  sendEmail,
  sendEmailForOrder,
  sendEmailToUserForOrder,
  sendAutoReplyEmail
};
