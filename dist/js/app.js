import { NegociacaoController } from './controllers/negociacao.controller.js';
const negociacaoController = new NegociacaoController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        negociacaoController.adiciona();
    });
}
else {
    throw Error('Nao foi possivel inicializar a aplicação, verifique se o form existe');
}
const botaoImporta = document.querySelector('#botao-importa');
if (botaoImporta) {
    botaoImporta.addEventListener('click', () => {
        negociacaoController.importaDados();
    });
}
else {
    throw Error(' Nao foi possivel encontrar o botao, por favor verifique!');
}
