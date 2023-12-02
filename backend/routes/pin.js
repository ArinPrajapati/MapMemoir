const router = require("express").Router();

const Pin = require("../models/Pin");

// create pin
// endpoint localhost:8888/map/pins post-method

router.post("/", async (req, res) => {
  const { username, title, desc, rating, lat, long } = new Pin(req.body);
  if (!username || !title || !desc || !rating || !lat || !long) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  const newPin = new Pin({ username, title, desc, rating, lat, long });

  try {
    const savedPin = await newPin.save();
    if (savedPin) {
      res.status(201).json(savedPin);
    } else {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all pins
// router get localhost:8888/map/pins get-method

router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    if (pins) {
      res.status(200).json(pins);
    } else if (pins.length === 0) {
      res.status(200).json({ message: "No pins found" });
      res.status(200).json(pins);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
