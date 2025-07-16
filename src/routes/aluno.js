const express = require('express');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const router = express.Router();
const prisma = new PrismaClient();

// 📄 GET /alunos – Lista todos os alunos
router.get('/', async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany();
    const alunosComLinks = alunos.map(aluno => ({
      ...aluno,
      docRg: aluno.docRg ? `http://localhost:3000/${aluno.docRg.replace(/\\/g, '/')}` : null,
      docCertidao: aluno.docCertidao ? `http://localhost:3000/${aluno.docCertidao.replace(/\\/g, '/')}` : null,
      docContrato: aluno.docContrato ? `http://localhost:3000/${aluno.docContrato.replace(/\\/g, '/')}` : null
    }));
    res.json(alunosComLinks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar alunos' });
  }
});

// 🔍 GET /alunos/:id – Ver um aluno específico
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const aluno = await prisma.aluno.findUnique({ where: { id: Number(id) } });

    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });

    res.json({
      ...aluno,
      docRg: aluno.docRg ? `http://localhost:3000/${aluno.docRg.replace(/\\/g, '/')}` : null,
      docCertidao: aluno.docCertidao ? `http://localhost:3000/${aluno.docCertidao.replace(/\\/g, '/')}` : null,
      docContrato: aluno.docContrato ? `http://localhost:3000/${aluno.docContrato.replace(/\\/g, '/')}` : null
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
});

// ✏️ PUT /alunos/:id – Atualizar dados do aluno
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, emailMae, emailPai, telefoneMae, telefonePai, endereco, observacoes } = req.body;

  try {
    const alunoAtualizado = await prisma.aluno.update({
      where: { id: Number(id) },
      data: { name, emailMae, emailPai, telefoneMae, telefonePai, endereco, observacoes }
    });

    res.json({ message: 'Aluno atualizado com sucesso', aluno: alunoAtualizado });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar aluno', detail: err.message });
  }
});

// 🗑 DELETE /alunos/:id – Apagar aluno e documentos
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const aluno = await prisma.aluno.findUnique({ where: { id: Number(id) } });
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });

    // Apagar arquivos físicos
    [aluno.docRg, aluno.docCertidao, aluno.docContrato].forEach((arquivo) => {
      if (arquivo && fs.existsSync(arquivo)) {
        fs.unlinkSync(arquivo);
      }
    });

    await prisma.aluno.delete({ where: { id: Number(id) } });

    res.json({ message: 'Aluno deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar aluno', detail: err.message });
  }
});

module.exports = router;
