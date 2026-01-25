"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const resend_1 = require("resend");
if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not set");
}
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
function sendEmail(to, body) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!to) {
            throw new Error("Recipient email is required");
        }
        if (!body) {
            throw new Error("Email body is empty");
        }
        const safeHtml = textToHtml(body);
        yield resend.emails.send({
            from: "Synapse <onboarding@resend.dev>",
            to,
            subject: "Automated Email from Synapse",
            html: `<p>${safeHtml}</p>`,
            text: body,
        });
    });
}
exports.sendEmail = sendEmail;
function textToHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\n/g, "<br />");
}
