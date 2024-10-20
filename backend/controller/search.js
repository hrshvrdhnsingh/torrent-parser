exports.downloadTorrent = async (req, res) => {
    const torrentId = req.body.magnet;
    console.log("Searching for magnet ->", torrentId)
};
