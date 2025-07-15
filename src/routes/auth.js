// Importa os módulos necessários
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const prisma = new PrismaClient();

// Rota POST para cadastro de usuário (register)
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifica se o email já está cadastrado
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário no banco
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Retorna o usuário criado (sem a senha)
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota POST para login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('🔐 Tentando logar:', email);

  try {
    // Procura o usuário no banco pelo email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Se usuário não existe, retorna erro 401 (não autorizado)
    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Compara a senha enviada com a senha criptografada no banco
    const senhaCorreta = await bcrypt.compare(password, user.password);

    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Cria o token JWT com dados do usuário e chave secreta do .env
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Envia o token para o cliente
    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
