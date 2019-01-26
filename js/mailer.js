const config = require('../config')
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
 service: config.mail.service,
 auth: {
        user: config.mail.username,
        pass: config.mail.password
    }
});

const downloaded_tracks = []
const not_found = []

const send_recap = () => {
    console.log(`[MAILER] starting`)
    const options = {
      from: config.mail.username,
      to: config.mail.recipient || config.mail.username,
      subject: `[sliderdownloader_js] your daily report`,
      html: get_mail_content()
    };

    transport.sendMail(options,
        (err, info) => {
            err ? console.log(`[MAILER][ERROR] ${err}`) : console.log(`[MAILER]${info}`)
        }
    );
}

const add_track_to_report = (track, is_found) => {
    if (is_found)
        downloaded_tracks.push(track)
    else
        not_found.push(track)
}

const get_mail_content = () => {
    let html = ''

    downloaded_tracks.forEach(
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
    return html
}

module.exports = {
    send_recap,
    add_track_to_report
}
