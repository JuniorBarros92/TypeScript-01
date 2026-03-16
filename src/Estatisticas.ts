import countBy from "./countBy.js";
type TransacaoValor = TransacaoNormalizada & { valor: number };

function filtrarValor(
  transacao: TransacaoNormalizada,
): transacao is TransacaoValor {
  return transacao.valor !== null;
}

export default class Estatisticas {
  private transacoes;
  total;
  pagamento;
  status;
  constructor(transacoes: TransacaoNormalizada[]) {
    this.transacoes = transacoes;

    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
  }
  private setTotal() {
    return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
      return acc + item.valor;
    }, 0);
  }
  private setPagamento() {
    return countBy(this.transacoes.map(({ pagamento }) => pagamento));
  }
  private setStatus() {
    return countBy(this.transacoes.map(({ status }) => status));
  }
}
