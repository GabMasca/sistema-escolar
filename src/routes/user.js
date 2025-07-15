const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware/authMiddleware'); // 🔐 Importa o middleware

const router = express.Router();
const prisma = new PrismaClient();

// 📌 ROTA 1 – Criar novo usuário com senha criptografada
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Recebido:', { name, email, password });

  try {
    // 🔐 Criptografar a senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Criação do usuário no banco
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    // ✅ Resposta sem a senha
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(400).json({ error: 'Erro ao criar usuário', detail: error.message });
  }
});

// 📌 ROTA 2 – Obter o perfil do usuário autenticado (protegida)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // 🔐 Pego do token decodificado

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.json(user);
  } catch (error) {
    console.error('Erro na rota /profile:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
