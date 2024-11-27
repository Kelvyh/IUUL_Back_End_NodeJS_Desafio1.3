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
            throw new Error ('\nErro: moedas de origem e destino não podem ser iguais\n');
        if(!this.#verificarTamanhoDaString(moedaOrigem) || !this.#verificarTamanhoDaString(moedaDestino))
            throw new Error ('\nErro: moedas precisam ter 3 caracteres\n');
    }

    validarValor(valor) {
        if(isNaN(valor))
            throw new Error ('\nErro: valor precisa ser um número\n');
        if(valor <= 0)
            throw new Error ('\nErro: valor precisa ser maior que zero\n');
    }
    
    async converterMoeda(moedaOrigem, moedaDestino, valor) {
        try {
            return getMoedaConvertidaETaxa(moedaOrigem, moedaDestino, valor);
        } catch (error) {
            throw error;
        }
    }
}

