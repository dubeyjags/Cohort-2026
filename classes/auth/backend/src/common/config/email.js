import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const emailVerification = async (username,to, link) => {
    const textContent =`Please click the link to verify your email. Link: ${link}`;
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>Auth App - Email Verification</title>
</head> 
<body>
    <h1>Hi ${username},</h1>
    <p>Click the link below to verify your email address: <a href="${link}">Verify Email</a></p>
</body>
</html>`;

   try {
        const info = await transporter.sendMail({
            from: '"Auth App" <auth@localhost.com>', // sender address
            to, // list of receivers    
            subject : "Please verify your email", // Subject line
            text: textContent, // plain text body
            html: htmlContent // html body
        })    
        console.log("Message sent: %s", info.messageId) ;
    } catch (error) {
        console.error("Error setting up email transporter:", error);
    }
}

export { transporter, emailVerification };