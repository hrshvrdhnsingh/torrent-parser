const express = require("express");
const router = express();

const { searchTorrents } = require("../controller/search");

router.post("/search", searchTorrents);

module.exports = router;
