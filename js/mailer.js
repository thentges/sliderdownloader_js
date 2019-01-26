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
    if (!config.pref.mail)
        return

    console.log(`[MAILER] starting`)
    const options = {
      from: config.mail.username,
      to: config.mail.recipient || config.mail.username,
      subject: get_subject(),
      html: get_mail_content()
    };

    transport.sendMail(options,
        (err, info) => {
            err ? console.log(`[MAILER][ERROR] ${err}`) : console.log(`[MAILER] Done`)
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

    if (downloaded_tracks.length > 0) {
        downloaded_tracks.forEach(
            (track) => {
                html += `<b>${track.track_name}</b> <br />
                downloaded: ${track.tit_art} <br />
            bitrates: ${track.bitrate}kbits/s <br /><br />`
            }
        )
    }

    if (not_found.length > 0) {
        html += '<br /><b>NOT FOUND:</b> <br/>'
        not_found.forEach(
            (track) => {
                html += `${track}<br />`
            }
        )
    }
    return html
}

const get_subject = () => {
    const OK = downloaded_tracks.length > 0
    const NF = not_found.length > 0
    let subject = `[sliderdownloader_js]`
    if (OK)
        subject += ` OK: ${downloaded_tracks.length}`
    if (OK && NF)
        subject +=  ' |'
    if (NF)
        subject += ` 404: ${not_found.length}`
    return subject
}

module.exports = {
    send_recap,
    add_track_to_report
}
