import { Database, aql } from 'arangojs';
import bcrypt from 'bcrypt';

const db = new Database({
  url: 'http://localhost:8529',
  databaseName: 'art_db',
  auth: { username: 'root', password: '' }
});

async function testConnection() {
  try {
    const collections = await db.listCollections();
    console.log('✅ Connecté à ArangoDB');
    return true;
  } catch (err) {
    console.error('❌ Erreur de connexion:', err);
    return false;
  }
}

async function createInitialUser() {
  const users = db.collection('users');
  const count = await users.count();
  
  if (count === 0) {
    const hash = await bcrypt.hash('password', 10);
    await users.save({
      _key: 'admin001',
      email: 'namoudouba851@gmail.com',
      password: hash,
      name: 'Admin',
      role: 'admin',
      createdAt: new Date().toISOString()
    });
    console.log('👤 Utilisateur admin créé');
  }
}

async function initCollections() {
  const collections = ['users', 'works', 'authors'];
  
  for (const colName of collections) {
    try {
      const col = db.collection(colName);
      if (!await col.exists()) {
        await col.create();
        if (colName === 'users') {
          await col.ensureIndex({
            type: 'persistent',
            fields: ['email'],
            unique: true
          });
        }
        console.log(`🆕 Collection ${colName} créée`);
      }
    } catch (err) {
      console.error(`Erreur création ${colName}:`, err);
    }
  }
  
  await createInitialUser();
}

async function verifyCredentials(email, password) {
  try {
    const cursor = await db.query(aql`
      FOR user IN users
        FILTER user.email == ${email}
        LIMIT 1
        RETURN user
    `);
    const user = await cursor.next();
    
    if (!user) return { valid: false };
    
    const valid = await bcrypt.compare(password, user.password);
    if(!valid){
      return {'error': 'Erreurrrrrrrrrrr'};
    }
    return { valid, user };
  } catch (err) {
    console.error('Erreur vérification:', err);
    return { valid: false };
  }
}


async function createUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    role: "user",
  };

  const result = await db.collection("users").save(user);
  return { ...user, _key: result._key, password: undefined };
}

async function findUserByEmail(email) {
  const cursor = await db.query(aql`
    FOR user IN users
    FILTER user.email == ${email}
    RETURN user
  `);
  return cursor.next();
}


export { 
  db, 
  aql, 
  testConnection, 
  initCollections,
  verifyCredentials,
  findUserByEmail,
  createUser
};