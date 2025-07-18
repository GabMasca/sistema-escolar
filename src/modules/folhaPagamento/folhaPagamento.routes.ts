import { Router } from "express";
import {
  criarFolhaPagamentoController,
  listarFolhasController,
  atualizarFolhaController,
  deletarFolhaController,
} from "./folhaPagamento.controller";

const router = Router();

router.post("/", criarFolhaPagamentoController);
router.get("/", listarFolhasController);
router.put("/:id", atualizarFolhaController);
router.delete("/:id", deletarFolhaController);

export default router;
