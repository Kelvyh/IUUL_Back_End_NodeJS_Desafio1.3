import { conversorController } from './conversorController.js';

import promptSync from 'prompt-sync';
var prompt = promptSync({ sigint: true });

export class conversorView {
    #controller = new conversorController();
    
    async start() {
        while(true) {
            const moedaOrigem = prompt('Moeda de Origem: ');
            if(moedaOrigem === '') {
                break;
            }
            const moedaDestino = prompt('Moeda de Destino: ');

            try {
                this.#controller.validarMoedas(moedaOrigem, moedaDestino);
            } catch (error) {
                console.log(error.message);
                continue;
            }

            const valor = prompt('Valor: ');
            try {
                this.#controller.validarValor(valor);
            } catch (error) {
                console.log(error.message);
                continue;
            }

            try {
                const [valorConvertido, taxa] = await this.#controller.converterMoeda(moedaOrigem, moedaDestino, valor);
                console.log(`${moedaOrigem} ${valor} => ${moedaDestino} ${valorConvertido.toFixed(2)} (Taxa de Conversão: ${taxa.toFixed(6)}) \n`);
            } catch (error) {
                console.log(error.message+'\n');
            }
        }
    }
}