const { db, aql } = require("../config/db");

class Author {
  static async create({ name, bio, imageUrl }) {
    const result = await db.query(aql`
      INSERT {
        name: ${name},
        bio: ${bio},
        imageUrl: ${imageUrl},
        createdAt: DATE_ISO8601(DATE_NOW())
      } INTO authors
      RETURN NEW
    `);
    return await result.next();
  }

  static async findAll() {
    const result = await db.query(aql`
      FOR author IN authors
        RETURN author
    `);
    return await result.all();
  }

  static async findById(id) {
    // id peut être une clé simple (ex: "123456") ou la clé complète "authors/123456"
    const documentId = id.includes("/") ? id : `authors/${id}`;
    const result = await db.query(aql`
      RETURN DOCUMENT(${documentId})
    `);
    return await result.next();
  }

  static async delete(id) {
    const documentId = id.includes("/") ? id : `authors/${id}`;
    const result = await db.query(aql`
      REMOVE ${documentId} IN authors
      RETURN OLD
    `);
    return await result.next();
  }

  static async update(id, updateFields) {
    const documentId = id.includes("/") ? id : `authors/${id}`;
    const result = await db.query(aql`
      UPDATE ${documentId} WITH ${updateFields} IN authors
      RETURN NEW
    `);
    return await result.next();
  }
}

module.exports = Author;
