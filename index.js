const slider = require('./slider.js')
const system = require('./system.js')
const notifications = require('./notifications.js')

// used for the mail report
const downloaded_tracks = []

// download a track from track_name
const get_track = async track_name => {
    try {
        let possibilities = await slider.get_possibilities(track_name)
        let link = await slider.get_best_link(possibilities, track_name)
        await slider.download(link, track_name)
    } catch (e) {
        console.log(`[ERROR] ${e.message}`);
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
    } catch (e) {
        console.log(`[OVER] NO TRACK TO DOWNLOAD`)
    }
}

// TODO PUT KBITS/S IN TITLE AND SAVE? OR BETTER: send a report email to myself ?
get_tracks()

// TODO faire un npm config qui npm install et cree le config .json
