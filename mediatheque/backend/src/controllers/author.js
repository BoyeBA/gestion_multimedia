const db = require("../config/db");
const authorsCollection = db.collection("authors");

exports.createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    let photoPath = null;
    if (req.file) {
      photoPath = "uploads/" + req.file.filename;
    }

    const newAuthor = { name, bio, photo: photoPath };
    const meta = await authorsCollection.save(newAuthor);
    res.status(201).json({ message: "Auteur créé", author: newAuthor, id: meta._key });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAuthor = async (req, res) => {
  try {
    const author = await authorsCollection.document(req.params.id);
    res.json(author);
  } catch (error) {
    res.status(404).json({ error: "Auteur non trouvé" });
  }
};

exports.listAuthors = async (_req, res) => {
  try {
    const cursor = await db.query("FOR a IN authors RETURN a");
    const authors = await cursor.all();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    await authorsCollection.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
