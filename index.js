const slider = require('./js/slider.js')
const system = require('./js/system.js')
const notifications = require('./js/notifications.js')
const mailer = require('./js/mailer.js')

// TODO clean
const track_name = process.argv[2]

// download a track from track_name
const get_track = async track_name => {
    try {
        console.log(track_name)
        let track = await slider.get_track_formated(track_name)
        await system.download(track.link, track.track_name)
        mailer.add_track_to_report(track, true)
    } catch (e) {
        // TODO gerer cas slider down
        if (e.name === "NoMatchError") {
            mailer.add_track_to_report(track_name, false)
        }
        else
            throw e
    }
}

get_track(track_name)

// // download all tracks in track_names array
// const get_tracks = async () => {
//     try {
//         const track_names = await system.get_tracks()
//         notifications.start(track_names)
//         await Promise.all(
//             track_names.map(
//                 async track_name => {
//                     if (track_name)
//                         return await get_track(track_name)
//                 }
//             )
//         )
//         system.clear_file()
//         notifications.end()
//         mailer.send_recap()
//     } catch (e) {
//         if (e.name === "EmptyFileError")
//             notifications.no_tracks()
//         else
//             throw e
//     }
// }
//
// get_tracks()
