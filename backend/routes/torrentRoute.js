const express = require("express");
const router = express.Router();

const {downloadTorrent} = require("../controller/search");

router.post("/download", downloadTorrent);

module.exports = router;
