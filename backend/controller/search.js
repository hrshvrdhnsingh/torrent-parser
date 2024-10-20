const fs = require('fs');
const path = require('path');

exports.downloadTorrent = async (req, res) => {
    const { default: WebTorrent } = await import('webtorrent');
    const client = new WebTorrent();

    const downloadDir = path.join(__dirname, 'downloads');
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir);
    }

    try {
        const torrentId = req.body.magnet;
        console.log(req.body)
        console.log("Magnet Link : ", torrentId);

        // Validate if the magnet link is correct
        if (!torrentId.startsWith('magnet:?xt=urn:btih:')) {
            console.error('Invalid magnet link format:', torrentId);
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid magnet link format' 
            });
        }

        client.add(torrentId, torrent => {
            console.log(torrent)
            console.log('Client is downloading:', torrent.infoHash);

            // Loop through all files in the torrent
            torrent.files.forEach(file => {
                console.log('Downloading:', file.name);

                const filePath = path.join(downloadDir, file.name);
                const fileStream = fs.createWriteStream(filePath);

                // Pipe the torrent file stream to the write stream
                file.createReadStream().pipe(fileStream);

                // When the file finishes downloading
                fileStream.on('finish', () => {
                    console.log(`Finished downloading: ${file.name}`);

                    // Now, send the file directly to the user
                    res.download(filePath, file.name, (err) => {
                        if (err) {
                            console.error('Error sending file:', err);
                            res.status(500).send('Failed to download the file');
                        } else {
                            // Optionally, you can delete the file after download
                            fs.unlink(filePath, (unlinkErr) => {
                                if (unlinkErr) {
                                    console.error('Error deleting file:', unlinkErr);
                                }
                            });
                        }
                    });
                });

                fileStream.on('error', err => {
                    console.error(`Error downloading ${file.name}: `, err.message);
                    res.status(500).send(`Error downloading ${file.name}`);
                });
            });
        });

        client.on('error', err => {
            console.error('WebTorrent error: ', err.message);
            res.status(500).send('Failed to download torrent');
        });
    } catch (err) {
        console.error('Caught error: ', err.message);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request.',
            description: err.message
        });
    }
};
