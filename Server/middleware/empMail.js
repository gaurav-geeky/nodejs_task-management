const nodemailer = require("nodemailer");

const userNodeMail = (uname, uemail, upass) => {

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "gauravnegi.geeky@gmail.com",
            pass: "orzy nfbt qjam nwwf",
        },
    });

    // Email options
    const mailOptions = {
        from: "gauravnegi.geeky@gmail.com",
        to: uemail,
        subject: "Mailing through Nodemailer",
        text: `Hello, Dear ${uname}, Your password is ${upass}, \n you can login through Email and Password Both. `,
        // html: "<b>Hello!</b> This is a <i>test</i> email."
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
}

module.exports = {
    userNodeMail, 
}