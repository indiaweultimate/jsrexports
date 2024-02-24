const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const html = `
    <h1>Welcome to JSR Groups...</h1>
    <h3>Users Data</h3>
`
async function main(){
    const transporter = nodeMailer.createTransport({
        host: 'jsrexports.in',
        port: 465,
        auth: {
            user: "support@jsrexports.in",
            pass: "JSRexports@2024"
        }
    });

    const info = await transporter.sendMail({
        from: 'support@jsrexports.in',
        to: 'ranjug0319@gmail.com',
        subject: "TEST MAIL, testing, 123",
        html: html
    })

    console.log("Message Sent "+ info.messageId);
}

main().catch(e=> console.log("ERROR: ====>>>>", e))