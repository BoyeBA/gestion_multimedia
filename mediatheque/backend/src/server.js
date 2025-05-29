import express from 'express';
import { Database } from 'arangojs';
const app = express();
const db = new Database({ url: "http://localhost:8529" });
db.useDatabase("art_db");
db.useBasicAuth("root", "root");

app.get('/api/works', async (req, res) => {
  const query = `
    FOR w IN works
      LET author = DOCUMENT(CONCAT("authors/", w.authorId))
      LET themes = (
        FOR t IN work_theme_relations
          FILTER t._from == w._id
          RETURN DOCUMENT(t._to)
      )
      LET influences = (
        FOR i IN work_influence_relations
          FILTER i._from == w._id
          RETURN DOCUMENT(i._to)
      )
      RETURN {
        ...w,
        author,
        themes,
        influences
      }
  `;
  const cursor = await db.query(query);
  const result = await cursor.all();
  res.json(result);
});

app.listen(3001, () => console.log("API sur http://localhost:3001"));
