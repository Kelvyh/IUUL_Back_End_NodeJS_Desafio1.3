import { conversorController } from './conversorController.js';

import promptSync from 'prompt-sync';
var prompt = promptSync({ sigint: true });

export class conversorView {
    #controller = new conversorController();
    
    async start() {
        while(true) {
            const moedaOrigem = prompt('Moeda de origem: ');
            if(moedaOrigem === '') {
                break;
            }
            const moedaDestino = prompt('Moeda de destino: ');
            try {
                this.#controller.validarMoedas(moedaOrigem, moedaDestino);
            } catch (error) {
                console.log(error.message);
                continue;
            }

            const valor = prompt('Valor: ').replace(',','.');
            try {
                this.#controller.validarValor(valor);
            } catch (error) {
                console.log(error.message);
                continue;
            }

            try {
                const [valorConvertido, taxa] = await this.#controller.converterMoeda(moedaOrigem, moedaDestino, valor);
                console.log(`\n${moedaOrigem.toUpperCase()} ${parseFloat(valor).toFixed(2).replace('.',',')} => ${moedaDestino.toUpperCase()} ${valorConvertido.toFixed(2).replace('.',',')}`);
                console.log(`Taxa: ${taxa.toFixed(6).replace('.',',')}\n`)
            } catch (error) {
                console.log('\n'+error.message+'\n');
            }
        }
    }
}