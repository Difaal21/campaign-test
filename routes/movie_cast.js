const express = require("express");
const router = express.Router();
const httpHandler = require("../controllers/movie_cast");

router.post("/", httpHandler.createMovieCast);
router.delete("/:id", httpHandler.deleteMovieCastByID);

module.exports = router;