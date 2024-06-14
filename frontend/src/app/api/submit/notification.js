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

export async function sendNotification() {

    const info = await transporter.sendMail({
        from: "sportify@demomailtrap.com",
        to: "alickovicnejra8@gmail.com",
        subject: "Poruka",
        text: "Korisnik želi da pristupi terminu"
    });

    console.log("Message sent: %s", info.messageId);

    //Response
    return NextResponse.json({ name, email, message })
}