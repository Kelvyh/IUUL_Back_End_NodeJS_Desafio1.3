import { conversorView } from "./conversorDeMoedas/conversorView.js";

async function app() {
    const conversorDeMoedas = new conversorView();
    await conversorDeMoedas.start();
    console.log("Saindo...");
}

app();