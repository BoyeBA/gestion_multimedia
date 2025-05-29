const Influence = require("../models/influence");

exports.createInfluence = async (req, res) => {
  try {
    const influence = await Influence.create(req.body);
    res.status(201).json(influence);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getInfluence = async (req, res) => {
  try {
    const influence = await Influence.findById(req.params.id);
    if (!influence) {
      return res.status(404).json({ error: "Influence not found" });
    }
    res.json(influence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listInfluences = async (_req, res) => {
  try {
    const influences = await Influence.findAll();
    res.json(influences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteInfluence = async (req, res) => {
  try {
    await Influence.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
