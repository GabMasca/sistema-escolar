const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/upload', uploadRoutes);

app.use('/uploads', express.static('uploads'));

const alunoRoutes = require('./routes/aluno');
app.use('/alunos', alunoRoutes);

const boletimRoutes = require('./routes/boletim');
app.use('/boletins', boletimRoutes);

const disciplinaRoutes = require('./routes/disciplina');
app.use('/disciplinas', disciplinaRoutes);

const turmaRoutes = require('./routes/turma');
app.use('/turmas', turmaRoutes);

const indicadorRoutes = require('./routes/indicador');
app.use('/indicadores', indicadorRoutes);

const notaRoutes = require('./routes/nota');
app.use('/notas', notaRoutes);

const avaliacaoIndicadorRoutes = require('./routes/avaliacaoIndicador');
app.use('/avaliacoes-indicadores', avaliacaoIndicadorRoutes);

const funcionarioRoutes = require('./routes/funcionario');
app.use('/funcionarios', funcionarioRoutes);

const cargoRoutes = require('./routes/cargo');
app.use('/cargos', cargoRoutes);


app.get('/', (req, res) => {
  res.send('API está rodando com Neon + Prisma! 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
