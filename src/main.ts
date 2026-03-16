import fetchData from "./fetchData";

import normalizarTransacao from "./normalizarTransacao";

async function handleData() {
  const data = await fetchData<TransacaoApi[]>(
    "https://api.origamid.dev/json/transacoes.json?_=" + Date.now(),
  );

  if (!data) return;
  const transacoesNormalizadas = data.map(normalizarTransacao);
  preecherTabela(transacoesNormalizadas);
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
