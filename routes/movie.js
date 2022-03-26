const express = require("express");
const router = express.Router();
const httpHandler = require("../controllers/movies");

router.get("/", httpHandler.getAllMovies);
router.post("/", httpHandler.createMovie);
router.get("/:id", httpHandler.getOneMovieByID);
router.put("/:id", httpHandler.updateMovie);
router.delete("/:id", httpHandler.deleteOneMovie);

module.exports = router;