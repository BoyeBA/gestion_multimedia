const { db, aql } = require("../config/db");

class Influence {
  static async create(name) {
    const result = await db.query(aql`
      INSERT {
        name: ${name},
        createdAt: DATE_ISO8601(DATE_NOW())
      } INTO influences
      RETURN NEW
    `);
    return await result.next();
  }

  static async findAll() {
    const result = await db.query(aql`
      FOR influence IN influences
        RETURN influence
    `);
    return await result.all();
  }

  static async findById(id) {
    const result = await db.query(aql`
      RETURN DOCUMENT("influences", ${id})
    `);
    return await result.next();
  }

  static async delete(id) {
    const result = await db.query(aql`
      REMOVE ${id} IN influences
      RETURN OLD
    `);
    return await result.next();
  }
}

module.exports = Influence;
