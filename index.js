const slider = require('./slider.js')
const system = require('./system.js')
const notifications = require('./notifications.js')

// download a track from track_name
const get_track = async track_name => {
    let possibilities = await slider.get_possibilities(track_name)
    let link = await slider.get_best_link(possibilities)
    await slider.download(link, track_name)
    notifications.track_downloaded(track_name)
}

// download all tracks in track_names array
const get_tracks = async () => {
    notifications.start()
    const track_names = await system.get_tracks()
    notifications.start_info(track_names)
    await Promise.all(
        track_names.map(
            async track_name => {
                if (track_name)
                    return await get_track(track_name)
            }
        )
    )
    notifications.end(track_names)
}

get_tracks()
