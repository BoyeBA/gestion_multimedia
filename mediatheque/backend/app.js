import express from 'express';
import { db, testConnection, initCollections } from './src/arangoConfig.js';

const app = express();
const PORT = 3000;

async function startServer() {
  if (!await testConnection()) {
    process.exit(1);
  }

  await initCollections();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('API Médiathèque fonctionnelle');
  });

  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);