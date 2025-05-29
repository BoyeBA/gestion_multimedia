const Theme = require("../models/theme");

exports.createTheme = async (req, res) => {
  try {
    const theme = await Theme.create(req.body);
    res.status(201).json(theme);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTheme = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme) {
      return res.status(404).json({ error: "Theme not found" });
    }
    res.json(theme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listThemes = async (_req, res) => {
  try {
    const themes = await Theme.findAll();
    res.json(themes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTheme = async (req, res) => {
  try {
    await Theme.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
