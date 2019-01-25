const config = require('./config')
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
 service: config.mail.service,
 auth: {
        user: config.mail.username,
        pass: config.mail.password
    }
});


const send_recap = (tracks, not_found) => {
    console.log(`[MAILER] starting`)
    let html = ''
    tracks.forEach(
        (track) => {
            html += `<b>${track.track_name}</b> <br />
            downloaded: ${track.tit_art} <br />
        bitrates: ${track.bitrate}kbits/s <br /><br />`
        }
    )
    html += '<br /><b>NOT FOUND:</b> <br/>'
    not_found.forEach(
        (track) => {
            html += `${track}<br />`
        }
    )

    const options = {
      from: config.mail.username,
      to: config.mail.recipient || config.mail.username,
      subject: `[sliderdownloader_js] your daily report`,
      html
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
