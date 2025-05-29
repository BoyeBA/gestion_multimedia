const { db, aql } = require("../config/db");

class Work {
  static async create(workData) {
    const work = await db.query(aql`
      INSERT {
        title: ${workData.title},
        description: ${workData.description},
        imageUrl: ${workData.imageUrl},
        authorId: ${workData.authorId},
        createdAt: DATE_ISO8601(DATE_NOW()),
        featured: ${workData.featured || false},
        views: 0
      } INTO works
      RETURN NEW
    `).then(cursor => cursor.next());

    // Liens vers les thèmes
    if (workData.themeIds) {
      for (const themeId of workData.themeIds) {
        const exists = await db.query(aql`
          RETURN DOCUMENT(${themeId}) != null
        `).then(cursor => cursor.next());

        if (exists) {
          await db.query(aql`
            INSERT {
              _from: ${work._id},
              _to: ${themeId},
              createdAt: DATE_ISO8601(DATE_NOW())
            } INTO work_theme_relations
          `);
        }
      }
    }

    // Liens vers les influences
    if (workData.influenceIds) {
      for (const influenceId of workData.influenceIds) {
        const exists = await db.query(aql`
          RETURN DOCUMENT(${influenceId}) != null
        `).then(cursor => cursor.next());

        if (exists) {
          await db.query(aql`
            INSERT {
              _from: ${work._id},
              _to: ${influenceId},
              createdAt: DATE_ISO8601(DATE_NOW())
            } INTO work_influence_relations
          `);
        }
      }
    }

    return work;
  }

  static async findById(id) {
    const result = await db.query(aql`
      LET work = DOCUMENT("works", ${id})
      LET author = DOCUMENT("authors", work.authorId)

      LET themes = (
        FOR edge IN work_theme_relations
          FILTER edge._from == work._id
          LET theme = DOCUMENT(edge._to)
          RETURN theme
      )

      LET influences = (
        FOR edge IN work_influence_relations
          FILTER edge._from == work._id
          LET influence = DOCUMENT(edge._to)
          RETURN influence
      )

      RETURN MERGE(work, {
        author,
        themes,
        influences
      })
    `);
    return await result.next();
  }

  static async findAll({ featured } = {}) {
    let filter = aql``;
    if (featured !== undefined) {
      filter = aql`FILTER work.featured == ${featured}`;
    }

    const result = await db.query(aql`
      FOR work IN works
        ${filter}
        LET author = DOCUMENT("authors", work.authorId)

        LET themes = (
          FOR edge IN work_theme_relations
            FILTER edge._from == work._id
            LET theme = DOCUMENT(edge._to)
            RETURN theme
        )

        LET influences = (
          FOR edge IN work_influence_relations
            FILTER edge._from == work._id
            LET influence = DOCUMENT(edge._to)
            RETURN influence
        )

        RETURN MERGE(work, {
          author,
          themes,
          influences
        })
    `);
    return await result.all();
  }

  static async update(id, { title, description, imageUrl, themeIds, influenceIds, featured }) {
    const result = await db.query(aql`
      UPDATE ${id} WITH {
        title: ${title},
        description: ${description},
        imageUrl: ${imageUrl},
        featured: ${featured}
      } IN works
      RETURN NEW
    `);
    const work = await result.next();

    // MAJ des thèmes
    if (themeIds) {
      await db.query(aql`
        FOR edge IN work_theme_relations
          FILTER edge._from == ${work._id}
          REMOVE edge IN work_theme_relations
      `);

      for (const themeId of themeIds) {
        await db.query(aql`
          INSERT {
            _from: ${work._id},
            _to: CONCAT("themes/", ${themeId})
          } INTO work_theme_relations
        `);
      }
    }

    // MAJ des influences
    if (influenceIds) {
      await db.query(aql`
        FOR edge IN work_influence_relations
          FILTER edge._from == ${work._id}
          REMOVE edge IN work_influence_relations
      `);

      for (const influenceId of influenceIds) {
        await db.query(aql`
          INSERT {
            _from: ${work._id},
            _to: CONCAT("influences/", ${influenceId})
          } INTO work_influence_relations
        `);
      }
    }

    return await this.findById(id);
  }

  static async incrementViews(id) {
    const result = await db.query(aql`
      UPDATE ${id} WITH {
        views: OLD.views + 1
      } IN works
      RETURN NEW
    `);
    return await result.next();
  }

  static async delete(id) {
    await db.query(aql`
      FOR edge IN work_theme_relations
        FILTER edge._from == ${id}
        REMOVE edge IN work_theme_relations
    `);

    await db.query(aql`
      FOR edge IN work_influence_relations
        FILTER edge._from == ${id}
        REMOVE edge IN work_influence_relations
    `);

    const result = await db.query(aql`
      REMOVE ${id} IN works
      RETURN OLD
    `);
    return await result.next();
  }
}

module.exports = Work;
