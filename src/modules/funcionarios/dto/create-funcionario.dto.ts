// src/modules/funcionarios/dto/create-funcionario.dto.ts

export class CreateFuncionarioDto {
  nome: string;
  cargo: string;
  cargoId: number; // ID do cargo relacionado
  dataAdmissao: string; // formato: YYYY-MM-DD
  formacao: string;
  nivelIngles: string;
  experienciaPontos: number; // inserido manualmente
  formacaoPontos: number;   // inserido manualmente
  inglesPontos: number;
    dataContratacao: Date;    // inserido manualmente
}
