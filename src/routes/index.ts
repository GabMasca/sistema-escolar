import { Router } from "express";
import folhaPagamentoRoutes from "../modules/folhaPagamento/folhaPagamento.routes";
// import funcionarioRoutes from "../modules/funcionario/funcionario.routes"; // se tiver

const router = Router();

router.use("/folha-pagamento", folhaPagamentoRoutes);
// router.use("/funcionarios", funcionarioRoutes);

export default router;
