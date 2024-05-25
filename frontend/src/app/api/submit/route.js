/*RESURS: https://www.geeksforgeeks.org/how-to-submit-nextjs-form-to-api-using-formdata/*/

import { NextResponse } from "next/server";

export async function POST(req, res) {
    //Get the Form Data
    const Formdata = await req.formData();
    const name = Formdata.get('name');
    const email = Formdata.get('email');
    const message = Formdata.get('message');
    //Response
    return NextResponse.json({ name, email, message })
}