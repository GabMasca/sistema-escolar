const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // O token deve vir no cabeçalho Authorization, no formato "Bearer <token>"
  const authHeader = req.headers['authorization']; 

  // Se não tem token, já responde 401 (não autorizado)
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  // Separar o "Bearer" do token
  const token = authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token inválido' });

  // Verifica se o token é válido usando a chave secreta do .env
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token expirado ou inválido' });

    // Salva as informações do usuário no req para poder usar depois nas rotas
    req.user = user;

    // Continua para a próxima função da rota (que realmente entrega os dados)
    next();
  });
}

module.exports = authenticateToken;
