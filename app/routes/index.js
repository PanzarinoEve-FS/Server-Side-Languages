const express = require('express');
const router = express.Router();




// localhost:3000/api/
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Get to API",
        metadata: {
            hostname: req.hostname, method: req.method },
    });
});

// localhost:3000/api/:id
router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        message: "Get to API with param",
        id,
        metadata: {
            hostname: req.hostname, method: req.method },
    });
});

router.post("/", (req, res) => {

    const { data } = req.body ?? {};
    res.status(200).json({
        message: "Post to API",
        data,
        metadata: {
            hostname: req.hostname, method: req.method },
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body ?? {};
    res.status(200).json({
        message: "Put to API with param",
        id,
        data,
        metadata: {
            hostname: req.hostname, method: req.method },
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        message: "Delete to API with param",
        id,
        metadata: {
            hostname: req.hostname, method: req.method },
    });
});

module.exports = router;
