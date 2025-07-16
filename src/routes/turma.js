const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { nome, turno, anoLetivo } = req.body;
  try {
    const turma = await prisma.turma.create({
      data: { nome, turno, anoLetivo }
    });
    res.status(201).json(turma);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar turma' });
  }
});

module.exports = router;
