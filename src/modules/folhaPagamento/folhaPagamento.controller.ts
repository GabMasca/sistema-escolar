import { Request, Response } from "express";
import {
  criarFolhaPagamento,
  listarFolhas,
  atualizarFolha,
  deletarFolha,
} from "./folhaPagamento.service";

export async function criarFolhaPagamentoController(req: Request, res: Response) {
  try {
    const folha = await criarFolhaPagamento(req.body);
    return res.status(201).json(folha);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function listarFolhasController(req: Request, res: Response) {
  try {
    const folhas = await listarFolhas();
    return res.json(folhas);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function atualizarFolhaController(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const folha = await atualizarFolha(id, req.body);
    return res.json(folha);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deletarFolhaController(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    await deletarFolha(id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
