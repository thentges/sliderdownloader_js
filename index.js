const slider = require('./js/slider.js')
const system = require('./js/system.js')
const notifications = require('./js/notifications.js')
const mailer = require('./js/mailer.js')

// download a track from track_name
const get_track = async track_name => {
    try {
        let track = await slider.get_track_formated(track_name)
        await system.download(track.link, track.track_name)
        mailer.add_track_to_report(track, true)
    } catch (e) {
        if (e.name === "NoMatchError") {
            mailer.add_track_to_report(track_name, false)
        }
        else
            throw e
    }
}

// download all tracks in track_names array
const get_tracks = async () => {
    try {
        const track_names = await system.get_tracks()
        notifications.start(track_names)
        await Promise.all(
            track_names.map(
                async track_name => {
                    if (track_name)
                        return await get_track(track_name)
                }
            )
        )
        system.clear_file()
        notifications.end(track_names)
        mailer.send_recap()
    } catch (e) {
        if (e.name === "EmptyFileError")
            notifications.no_tracks()
        else
            throw e
    }
}

get_tracks()
