const notifier = require('node-notifier')
const config = require('./config')

const send_notification = (title, message, onClick) => {
    notifier.notify(
      {
        title,
        message,
        sound: false,
        wait: true
      }
    );

    notifier.on('click', function(notifierObject, options) {
        onClick()
    });
}

const track_downloaded = (track_name) => {
    send_notification(track_name, `has been downloaded`)
}

const start = () => {
    send_notification("SliderDownloader", `started downloading tracks from ${config.txt_path}`)
}

const start_info = (track_names) => {
    if (track_names.length === 1 && !track_names[0])
        // TODO open the txt file
        send_notification("SliderDownloader", 'no tracks to download')
    else
        send_notification("SliderDownloader", `${track_names.length} tracks to download`)
}

// TODO add onclick to open the dir
const end = (track_names) => {
    if (track_names && (track_names.length > 1 || track_names[0])) {
        send_notification("SliderDownloader", `all tracks downloaded in ${config.download_dir}`)
    }
    else if (!track_names)
        send_notification("SliderDownloader", 'no track to downloads')
}

module.exports = {
    start,
    track_downloaded,
    end,
    start_info
}
