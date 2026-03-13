import fetchData from "./fetchData";

type TransacaoPagamento =  "Boleto" | "Cartão de Crédito";
type TransacaoStatus = "Paga" | "Recusada pela operadora de cartão" | "Aguardando pagamento" |  "Estornada" 



interface TransacaoApi {
Nome: string;
ID: number;
Data: string;
Status: TransacaoStatus;
Email: string;
["Valor (R$)"]: string;
["Forma de Pagamento"]: TransacaoPagamento 
["Cliente Novo"]: number;

}

async function handleData() {
  const data = await fetchData<TransacaoApi[]>("https://api.origamid.dev/json/transacoes.json");
  data?.forEach((item) => {
    console.log(item);
  });
}


  handleData();