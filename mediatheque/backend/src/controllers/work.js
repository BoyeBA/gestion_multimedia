const Work = require("../models/work");

exports.createWork = async (req, res) => {
  try {
    // Validation des IDs
    if (!req.body.authorId.startsWith('authors/')) {
      req.body.authorId = `authors/${req.body.authorId}`;
    }

    // Formatage des IDs pour les relations
    const formattedData = {
      ...req.body,
      themeIds: req.body.themeIds?.map(id => 
        id.startsWith('themes/') ? id : `themes/${id}`
      ),
      influenceIds: req.body.influenceIds?.map(id => 
        id.startsWith('influences/') ? id : `influences/${id}`
      )
    };

    const work = await Work.create(formattedData);
    res.status(201).json(work);
  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      details: error.response?.body || {}
    });
  }
};

exports.getWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ error: "Work not found" });
    }
    res.json(work);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listWorks = async (req, res) => {
  try {
    const featured = req.query.featured === "true";
    const works = await Work.findAll({ featured });
    res.json(works);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWork = async (req, res) => {
  try {
    const work = await Work.update(req.params.id, req.body);
    res.json(work);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteWork = async (req, res) => {
  try {
    await Work.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.incrementViews = async (req, res) => {
  try {
    const work = await Work.incrementViews(req.params.id);
    res.json(work);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
