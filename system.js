const fs = require('fs')
const config = require('./config.json')

const get_tracks = () => {
    const txt_path = config.txt_path
    return new Promise((resolve, reject) => {
        fs.readFile(txt_path, 'utf8', (err, data) => {
            data = data.split('\n')
            resolve(data)
        })
    })
}

module.exports = {
    get_tracks
}
