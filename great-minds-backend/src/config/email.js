const { Resend } = require('resend');
const nodemailer = require('nodemailer');

const resend = new Resend(process.env.RESEND_API_KEY);

const backupTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

exports.sendSystemEmail = async (to, subject, htmlContent) => {
    try {
        // Attempt Primary Send via Resend
        await resend.emails.send({
            from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
            to,
            subject,
            html: htmlContent,
        });
        console.log(`Email dispatched successfully via Resend to ${to}`);
    } catch (error) {
        console.warn('Resend failed, trying backup Nodemailer transport layer...', error.message);
        
        // Failover strategy to Nodemailer
        await backupTransporter.sendMail({
            from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.NODEMAILER_USERNAME}>`,
            to,
            subject,
            html: htmlContent
        });
        console.log(`Email securely dispatched via backup Gmail node to ${to}`);
    }
};
