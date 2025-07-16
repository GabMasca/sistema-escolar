function calcularClassificacao(experienciaPontos, formacaoPontos, inglesPontos) {
  const total = experienciaPontos + formacaoPontos + inglesPontos;

  let classificacao = 'Júnior';
  if (total >= 9) classificacao = 'Sênior';
  else if (total >= 6) classificacao = 'Pleno';

  return { total, classificacao };
}

module.exports = { calcularClassificacao };
