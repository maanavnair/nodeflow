import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, body: string) {
    if (!to) {
        throw new Error("Recipient email is required");
    }

    if (!body) {
        throw new Error("Email body is empty");
    }

    const safeHtml = textToHtml(body);

    await resend.emails.send({
        from: "Synapse <onboarding@resend.dev>",
        to,
        subject: "Automated Email from Synapse",
        html: `<p>${safeHtml}</p>`,
        text: body,
    });
}

function textToHtml(text: string) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\n/g, "<br />");
}
