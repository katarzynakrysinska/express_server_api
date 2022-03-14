const Seat = require('../models/seats.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getItem = async (req, res) => {

  try {
    const dep = await Seat.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found ...' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postItem = async (req, res) => {

  try {

    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({
      day: day,
      seat: seat,
      client: client,
      email: email,
    });
    await newSeat.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteItem = async (req, res) => {

  try {
    const dep = await Seat.findById(req.params.id);
    if(dep) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json( dep );
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putItem = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const dep = await Seat.findById(req.params.id);
    if (dep) {
      await Seat.updateOne(
        { _id: req.params.id },
        { $set: { day: day,
          seat: seat,
          client: client,
          email: email, } }
      );
      const depChenged = await Seat.findById(req.params.id);
      res.json(depChenged);
    } else res.status(404).json({ message: 'Not found..' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};