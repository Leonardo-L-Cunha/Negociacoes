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
    throw new Error('Nao foi possivel inicializar a aplicação, verifique se o form existe');
}
