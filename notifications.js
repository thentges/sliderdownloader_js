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

const start = (track_names) => {
    if (track_names.length === 1 && !track_names[0])
        // TODO open the txt file on click
        send_notification('no tracks to download', `${config.txt_path} is empty`)
    else
        send_notification(`${track_names.length} tracks to download`, `started downloading tracks from ${config.txt_path}`)
}

// TODO add onclick to open the dir
const end = (track_names) => {
    // if we downloaded something
    if ((track_names.length > 1 || track_names[0])) {
        send_notification("SliderDownloader", `all tracks downloaded in ${config.download_dir}`)
    }
}

module.exports = {
    start,
    end
}
