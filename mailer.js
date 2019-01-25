const config = require('./config')
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
 service: config.mail.service,
 auth: {
        user: config.mail.username,
        pass: config.mail.password
    }
});


const send_recap = () => {
    console.log(`[MAILER] starting`)
    const options = {
      from: config.mail.username,
      to: config.mail.recipient || config.mail.username,
      subject: `[sliderdownloader_js] your daily report`,
      html: `<p>this is your daily report bro</p>`
    };

    transport.sendMail(options,
        (err, info) => {
            err ? console.log(`[MAILER][ERROR] ${err}`) : console.log(`[MAILER]${info}`)
        }
    );
}

module.exports = {
    send_recap
}
