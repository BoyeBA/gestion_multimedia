const { Database } = require("arangojs");

const db = new Database({
  url: "http://localhost:8529", // ou l'IP/URL de ton serveur Arango
});

db.useDatabase("art_db"); // remplace par le nom réel
db.useBasicAuth("root", "root"); // les identifiants Arango

async function testConnection() {
  try {
    const version = await db.version();
    console.log("Connexion réussie à ArangoDB !");
    console.log("Version :", version.version);
  } catch (err) {
    console.error("Échec de la connexion à ArangoDB :", err.message);
  }
}

testConnection();