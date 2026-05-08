function roundMoney(value) {
  return Number(value.toFixed(2));
}

function simulateComparison(req, res) {
  const {
    valor_imovel,
    valor_entrada,
    prazo_meses,
    taxa_juros_anual,
    taxa_adm_total,
  } = req.body;

  const imovel = Number(valor_imovel);
  const entrada = Number(valor_entrada);
  const prazo = Number(prazo_meses);
  const jurosAnual = Number(taxa_juros_anual);
  const taxaAdmTotal = Number(taxa_adm_total);

  const hasInvalidNumbers = [imovel, entrada, prazo, jurosAnual, taxaAdmTotal].some(
    (value) => Number.isNaN(value)
  );

  if (hasInvalidNumbers) {
    return res.status(400).json({
      message: "Todos os campos devem ser numéricos.",
    });
  }

  if (imovel <= 0 || entrada < 0 || prazo <= 0 || jurosAnual < 0 || taxaAdmTotal < 0) {
    return res.status(400).json({
      message: "Valores inválidos. Verifique se os números são positivos.",
    });
  }

  if (!Number.isInteger(prazo)) {
    return res.status(400).json({
      message: "prazo_meses deve ser um número inteiro.",
    });
  }

  if (entrada >= imovel) {
    return res.status(400).json({
      message: "valor_entrada deve ser menor que valor_imovel.",
    });
  }

  const valorFinanciado = imovel - entrada;
  const taxaJurosMensal = jurosAnual / 100 / 12;
  const amortizacaoConstante = valorFinanciado / prazo;

  const primeiraParcela =
    amortizacaoConstante + valorFinanciado * taxaJurosMensal;
  const ultimaParcela = amortizacaoConstante * (1 + taxaJurosMensal);
  const jurosTotalFinanciamento =
    taxaJurosMensal * valorFinanciado * ((prazo + 1) / 2);
  const custoTotalFinanciamento = valorFinanciado + jurosTotalFinanciamento;

  const taxaAdmValor = imovel * (taxaAdmTotal / 100);
  const custoTotalConsorcio = imovel + taxaAdmValor;
  const parcelaMensalConsorcio = custoTotalConsorcio / prazo;

  return res.status(200).json({
    financiamento: {
      tipo: "financiamento",
      valor_financiado: roundMoney(valorFinanciado),
      primeira_parcela: roundMoney(primeiraParcela),
      ultima_parcela: roundMoney(ultimaParcela),
      custo_total: roundMoney(custoTotalFinanciamento),
    },
    consorcio: {
      tipo: "consorcio",
      parcela_mensal: roundMoney(parcelaMensalConsorcio),
      custo_total: roundMoney(custoTotalConsorcio),
    },
  });
}

module.exports = {
  simulateComparison,
};
