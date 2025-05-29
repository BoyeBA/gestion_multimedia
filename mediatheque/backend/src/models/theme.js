const { db, aql } = require("../config/db");

class Theme {
  static async create(name) {
    const result = await db.query(aql`
      INSERT {
        name: ${name},
        createdAt: DATE_ISO8601(DATE_NOW())
      } INTO themes
      RETURN NEW
    `);
    return await result.next();
  }

  static async findAll() {
    const result = await db.query(aql`
      FOR theme IN themes
        RETURN theme
    `);
    return await result.all();
  }

  static async findById(id) {
    const result = await db.query(aql`
      RETURN DOCUMENT("themes", ${id})
    `);
    return await result.next();
  }

  static async delete(id) {
    const result = await db.query(aql`
      REMOVE ${id} IN themes
      RETURN OLD
    `);
    return await result.next();
  }
}

module.exports = Theme;
