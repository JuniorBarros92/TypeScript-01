import { CountList, } from "./countBy";
import fetchData from "./fetchData";
import Estatisticas from "./Estatisticas";
import normalizarTransacao from "./normalizarTransacao";

async function handleData() {
  const data = await fetchData<TransacaoApi[]>(
    "https://api.origamid.dev/json/transacoes.json?_=" 
  );

  if (!data) return;
  const transacoesNormalizadas = data.map(normalizarTransacao);
  preecherTabela(transacoesNormalizadas);
   preencherEstatisticas(transacoesNormalizadas);
}

function preencherLista(lista: CountList, containerId: string): void {
  const containerElement = document.getElementById(containerId);
  if (containerElement) {
    Object.keys(lista).forEach((key) => {
      containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
    });
  }
}

function preencherEstatisticas(transacoes: TransacaoNormalizada[]): void {

  const estatisticas = new Estatisticas(transacoes);

   preencherLista(estatisticas.pagamento, "pagamento");
  preencherLista(estatisticas.status, "status");


 const totalElement = document.querySelector<HTMLElement>("#total span");
 if (totalElement) {
   totalElement.innerText = estatisticas.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}



function preecherTabela(transacoes: TransacaoNormalizada[]): void {
  const tabela = document.querySelector("#transacoes tbody");
  transacoes.forEach((transacao) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${transacao.nome}</td>
      <td>${transacao.email}</td>
      <td>${transacao.moeda}</td>
      <td>${transacao.pagamento}</td>
      <td>${transacao.status}</td>
    `;
    tabela?.appendChild(tr);
  });
}

handleData();
