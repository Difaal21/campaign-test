const express = require("express");
const router = express.Router();
const httpHandler = require("../controllers/cast");

router.get("/", httpHandler.getAllCast);
router.post("/", httpHandler.createCast);
router.get("/:id", httpHandler.getOneCastByID);
router.put("/:id", httpHandler.updateCastByID);
router.delete("/:id", httpHandler.deleteCastByID);

module.exports = router;