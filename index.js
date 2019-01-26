const slider = require('./slider.js')
const system = require('./system.js')
const notifications = require('./notifications.js')
const mailer = require('./mailer.js')

// download a track from track_name
const get_track = async track_name => {
    try {
        let track = await slider.get_track_formated(track_name)
        await system.download(track.link, track.track_name)
        mailer.add_track_to_report(track, true)
    } catch (e) {
        console.log(`[ERROR] ${e.message}`);
        mailer.add_track_to_report(track_name, false)
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
        notifications.end(track_names)
        mailer.send_recap()
    } catch (e) {
        console.log(`[OVER] NO TRACK TO DOWNLOAD`)
    }
}

get_tracks()

// TODO faire un npm config qui npm install et cree le config.json et chmod + x le .sh
