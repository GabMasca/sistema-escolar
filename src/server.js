const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/upload', uploadRoutes);


app.use('/uploads', express.static('uploads'));

const alunoRoutes = require('./routes/aluno');
app.use('/alunos', alunoRoutes);



app.get('/', (req, res) => {
  res.send('API está rodando com Neon + Prisma! 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
