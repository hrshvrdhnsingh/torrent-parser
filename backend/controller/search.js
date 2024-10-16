const WebTorrent = require("webtorrent")
const client = new WebTorrent();

exports.downloadTorrent = async (req, res) => {
    try {
        const torrentId = req.body.magnetLink;
        console.log("Magnet Link : ", torrentId);

        client.add(torrentId, torrent => {
            console.log('Client is downloading:', torrent.infoHash);

            // Loop through all files in the torrent
            torrent.files.forEach(file => {
                console.log('Downloading:', file.name);

                // Create a write stream to save the file to disk
                const filePath = path.join(__dirname, 'downloads', file.name);
                const fileStream = fs.createWriteStream(filePath);

                // Pipe the torrent file stream to the write stream
                file.createReadStream().pipe(fileStream);

                // When the file finishes downloading
                fileStream.on('finish', () => {
                    console.log(`Finished downloading: ${file.name}`);
                });

                fileStream.on('error', err => {
                    console.error(`Error downloading ${file.name}: `, err.message);
                });
            })
        })

        return res.json({
            success: true, 
            message: 'File downloading ...',
            torrentName: torrentName
        })
    }
    catch(err) {
        return res.json({
            success: false,
            messsage: err.message
        })
    }
}
