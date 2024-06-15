/*RESURS: https://www.geeksforgeeks.org/how-to-submit-nextjs-form-to-api-using-formdata/*/
"use strict";
import { NextResponse } from "next/server";

const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "0d1f4336c916cd7921b3bba33c17236c"
  }
});

export async function POST(req, res) {
    //Get the Form Data
    const Formdata = await req.formData();
    const name = Formdata.get('name');
    const email = Formdata.get('email');
    const message = Formdata.get('message');

    const info = await transporter.sendMail({
        from: "sportify@demomailtrap.com",
        to: "alickovicnejra8@gmail.com, besic.e17@gmail.com, asasad204@gmail.com, matej.panic.2002@gmail.com, riadpap@live.com",
        subject: `Message from ${name} (${email})`,
        text: `${message}`
    });

    console.log("Message sent: %s", info.messageId);

    //Response
    return NextResponse.json({ name, email, message })
}

export async function sendNotification(username, email_from, email_to) {

    const info = await transporter.sendMail({
        from: "sportify@demomailtrap.com",
        to: email_to,
        subject: `Message from ${username} (${email_from})`,
        text: `${username} želi da se pridruži vašem terminu`
    });

    console.log("Message sent: %s", info.messageId);

    //Response
    return NextResponse.json({ name, email, message })
}

