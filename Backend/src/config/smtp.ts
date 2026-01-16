import nodemailer from "nodemailer";;

interface MailProps {
    email: string,
    subject: string
    template: any
}

export async function sendEmail({ email, subject, template }: MailProps) {

    const transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false,
        service: "gmail",
        auth: {
            user: process.env.GOOGLE_APP_USER,
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    })
    
    try {
        await transporter.sendMail({
            from: process.env.GOOGLE_APP_USER!,
            to: email,
            subject: subject,
            html: template,
        });
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Email error:", error);
        throw error;
    }
}