const axios = require('axios')
const fs = require('fs')
const config = require('../config.json')

const get_tracks = () => {
    const txt_path = config.txt_path
    return new Promise((resolve, reject) => {
        fs.readFile(txt_path, 'utf8', (err, data) => {
            if (data)
                data = data.split('\n')
            resolve(data)
        })
    })
}
// TODO clean le .txt qd fini

// download a file from url to track_name.mp3
const download = async (url, track_name) => {
    const path = `${config.download_dir}${track_name}.mp3`
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


module.exports = {
    get_tracks,
    download
}