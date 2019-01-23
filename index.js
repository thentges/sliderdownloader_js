const axios = require('axios')
const fs = require('fs')
// const path = require('path')

const INFO_URL = 'http://slider.kz/vk_auth.php?q='
const MORE_INFO_URL = 'http://slider.kz/info/'
const DOWNLOAD_URL = 'http://slider.kz/download/'
const LIMIT = 5

const download = async (url, track_name) => {
    const path = `${track_name}.mp3`
    const writer = fs.createWriteStream(path)
    const resp = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })
    resp.data.pipe(writer)
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
      })
}

const get_track = async track_name => {
    let possibilities = await get_possibilities(track_name)
    let link = await get_best_link(possibilities)
    download(link, track_name);
}

const get_possibilities = async track_name => {
    let url = get_url(INFO_URL, track_name)
    possibilities = await get_request(INFO_URL, url)
    return possibilities
}

const get_best_link = async possibilities => {
    let cursor = possibilities[0]
    await get_all_bitrates(possibilities)
    const best_track = get_best_track(possibilities)
    const best_link = get_link(best_track)
    return best_link
}

const get_link = track => {
    let link = DOWNLOAD_URL + track.id + '/'
    link = link + track.duration + '/'
    link = link + track.url + '/'
    link = link + track.tit_art + '.mp3' + '?extra='
    link = link + track.extra
    return link
}

const get_best_track = possibilities => {
    cursor = possibilities[0]
    possibilities.forEach(
        (track) => {
            if (track.bitrate > cursor.bitrate && track.duration >= cursor.duration)
                cursor = track
        }
    )
    return cursor
}

const get_all_bitrates = async possibilities => {
    await Promise.all(
        possibilities.map(
            async track => {
                return await get_bitrate(track)
            }
        )
    )
}

const get_bitrate = async track => {
    let url = get_url(MORE_INFO_URL, track)
    let bitrate = await get_request(MORE_INFO_URL, url)
    track.bitrate = bitrate
    return bitrate
}

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
            resp = resp.slice(0, LIMIT)
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
            return INFO_URL + track_name
            break
        case MORE_INFO_URL:
            track = object
            url = MORE_INFO_URL + track.id + '/'
            url = url + track.duration + '/'
            url = url + track.url + '.mp3'
            url = url + '?extra=' + track.extra
            return url
    }
}

get_track('DIMENSION - WHIP SLAP II')
