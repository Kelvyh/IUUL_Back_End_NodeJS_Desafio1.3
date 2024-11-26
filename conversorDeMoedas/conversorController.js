import { getMoedaConvertidaETaxa } from "./conversorApi.js";

export class conversorController {
    #verificarMoedasDiferentes(moedaOrigem, moedaDestino) {
        if(moedaOrigem === moedaDestino)
            return false;
        return true;
    }

    #verificarTamanhoDaString(moeda) {
        if(moeda.length !== 3)
            return false;
        return true;
    }

    validarMoedas(moedaOrigem, moedaDestino) {
        if(!this.#verificarMoedasDiferentes(moedaOrigem, moedaDestino))
            throw new Error ('Erro: moedas de Origem e Destino não podem ser iguais');
        if(!this.#verificarTamanhoDaString(moedaOrigem) || !this.#verificarTamanhoDaString(moedaDestino))
            throw new Error ('Erro: moedas precisam ter 3 caracteres');
    }

    validarValor(valor) {
        if(isNaN(valor))
            throw new Error ('Erro: valor precisa ser um número');
        if(valor <= 0)
            throw new Error ('Erro: valor precisa ser maior que zero');
    }
    
    async converterMoeda(moedaOrigem, moedaDestino, valor) {
        try {
            return getMoedaConvertidaETaxa(moedaOrigem, moedaDestino, valor);
        } catch (error) {
            throw error;
        }
    }
}

