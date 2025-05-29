export const login = async (email: string, password: string) => {
  try {
    console.log('Tentative de connexion frontend avec:', email); // Debug
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    console.log('Réponse du serveur:', response.status); // Statut HTTP

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur de connexion:', errorData); // Détails erreur
      throw new Error(errorData.error || 'Échec de la connexion');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.user;
  } catch (error) {
    console.error('Erreur dans authService:', error);
    throw error;
  }
};