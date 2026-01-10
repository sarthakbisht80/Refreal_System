const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const controller = require("../controllers/candidate.controller");

router.post("/", auth, upload.single("resume"), controller.createCandidate);
router.get("/", auth, controller.getCandidates);
router.put("/:id/status", auth, controller.updateStatus);
router.delete("/:id", auth, controller.deleteCandidate);
router.get("/metrics", auth, controller.metrics);

module.exports = router;
