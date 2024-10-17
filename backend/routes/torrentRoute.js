const express = require("express");
const router = express.Router();

const {searchTorrents} = require("../controller/search");

router.post("/search", searchTorrents);

module.exports = router;
