const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const router = express.Router();
const prisma = new PrismaClient();

// Criar novo usuário com senha criptografada
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Recebido:', { name, email, password });


  try {
    // Criptografar a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
      // Senha não deve ser retornada
    });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário', detail: error.message });
  }
});

module.exports = router;
