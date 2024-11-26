import fetch from "node-fetch";

const apiKey = "9a099691dcb5a5dbe99a4c44";
const baseURL = "https://v6.exchangerate-api.com/v6";

function associarTipoDeErrosDaApi(error) {
    switch (error) {
        case "unsupported-code":
            return "Erro: moeda não suportada";
        case "malformed-request":
            return "Erro: requisição mal formada";
        case "invalid-key":
            return "Erro: chave da API inválida";
        case "inactive-account":
            return "Erro: e-mail não confirmado";
        case "quota-reached":
            return "Erro: limite de requisições da API atingidos";
        default:
            return "Erro desconhecido";
    }
}


async function getMoedaConvertidaETaxa(baseCurrency, targetCurrency, amount) {
    console.log(`${baseURL}/${apiKey}/pair/${baseCurrency}/${targetCurrency}/${amount}`);
    const response = await fetch(`${baseURL}/${apiKey}/pair/${baseCurrency}/${targetCurrency}/${amount}`);
    const data = await response.json();
    if (!response.ok) {
        const errorMessage = associarTipoDeErrosDaApi(data['error-type']);
        throw new Error(errorMessage);
    }
    return [data.conversion_result, data.conversion_rate];
  }

export { getMoedaConvertidaETaxa };