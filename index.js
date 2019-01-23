const slider = require('./slider.js')
const system = require('./system.js')

// download a track from track_name
const get_track = async track_name => {
    let possibilities = await slider.get_possibilities(track_name)
    let link = await slider.get_best_link(possibilities)
    console.log("started " + track_name)
    await slider.download(link, track_name)
    console.log("over " + track_name)
}

// download all tracks in track_names array
const get_tracks = async () => {
    const track_names = await system.get_tracks()
    await Promise.all(
        track_names.map(
            async track_name => {
                return await get_track(track_name)
            }
        )
    )
}

get_tracks()
