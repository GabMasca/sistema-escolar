const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔽 Aqui adicionamos a rota de usuários
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API está rodando com Neon + Prisma! 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
