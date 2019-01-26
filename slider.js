const axios = require('axios')
const fs = require('fs')
const config = require('./config.json')

const INFO_URL = 'http://slider.kz/vk_auth.php?q='
const MORE_INFO_URL = 'http://slider.kz/info/'
const DOWNLOAD_URL = 'http://slider.kz/download/'
const LIMIT = 5

const get_track_formated = async (track_name) => {
    let possibilities = await get_possibilities(track_name)
    let track_formated = await get_best_track_with_link(possibilities, track_name)
    return track_formated
}

// get all results
const get_possibilities = async track_name => {
    let url = get_url(INFO_URL, track_name)
    possibilities = await get_request(INFO_URL, url)
    return possibilities
}

// get the best download link within possibilities array
const get_best_track_with_link = async (possibilities, track_name) => {
    const restricted_pos = reduce_possibilities(possibilities, track_name)
    await get_all_bitrates(restricted_pos)
    const best_track = get_best_track(restricted_pos)
    const best_link = get_url(DOWNLOAD_URL, best_track)
    return {link: best_link, ...best_track}
}

// TODO clean this method
// TODO + add cleaner_match (contains check)
const reduce_possibilities = (possibilities , track_name) => {
    const exact_match = []
    possibilities.forEach(
        track => {
            if (!track.tit_art){
                throw new Error(track_name + " no match")
            }
            else if (track.tit_art.toUpperCase() === track_name.toUpperCase())
                exact_match.push(track)

            track.track_name = track_name

            if (exact_match.length === 5){
                console.log(`[MATCHING] limit at 5 exact matches for ${track_name}`)
                return exact_match;
            }

        }
    )
    if (exact_match.length < 1){
        console.log(`[MATCHING] no exact match ${track_name}`)
        return possibilities.slice(0, LIMIT)
    }
    console.log(`[MATCHING] ${exact_match.length} exact matches for ${track_name}`)
    return exact_match
}

// get the best track from possibilities
const get_best_track = possibilities => {
    let cursor = possibilities[0]
    possibilities.forEach(
        (track) => {
            if (track.bitrate > cursor.bitrate && track.duration >= cursor.duration)
                cursor = track
        }
    )
    console.log(`[BEST] ${cursor.tit_art} : ${cursor.bitrate}kbits/s`)
    return cursor
}

// get all the bitrates of the possibles tracks
const get_all_bitrates = async possibilities => {
    await Promise.all(
        possibilities.map(
            async track => {
                return await get_bitrate(track)
            }
        )
    )
}

// get the bitrate of one track
const get_bitrate = async track => {
    let url = get_url(MORE_INFO_URL, track)
    let bitrate = await get_request(MORE_INFO_URL, url)
    track.bitrate = bitrate
    return bitrate
}

// make a get request and convert the data depending on the type
const get_request = async (type, url) => {
    let resp = await axios.get(url)
    resp = convert_data(type, resp)
    return resp
}

const convert_data = (type, resp) => {
    switch (type) {
        // data to array
        case INFO_URL:
            resp = resp.data.audios
            resp = Object.values(resp)
            resp = resp[0]
            break
        // data to bitrate
        case MORE_INFO_URL:
            resp = resp.data
            let maxPos = resp.indexOf('kbps')
            let minPos = maxPos - 4
            resp = Number(resp.substring(minPos, maxPos))
            break
    }
    return resp
}

const get_url = (type, object) => {
    switch (type) {
        case INFO_URL:
            track_name = object
            return INFO_URL + encodeURIComponent(track_name)
            break
        case MORE_INFO_URL:
            track = object
            let url = MORE_INFO_URL + track.id + '/'
            url = url + track.duration + '/'
            url = url + track.url + '.mp3'
            url = url + '?extra=' + track.extra
            return url
            break
        case DOWNLOAD_URL:
            track = object
            let link = DOWNLOAD_URL + track.id + '/'
            link = link + track.duration + '/'
            link = link + track.url + '/'
            link = link + track.tit_art + '.mp3' + '?extra='
            link = link + track.extra
            return link
    }
}

module.exports = {
    get_track_formated,
}
