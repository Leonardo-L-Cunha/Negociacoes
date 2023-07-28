import { NegociacaoController } from './controllers/negociacao.controller.js';

const negociacaoController = new NegociacaoController();

const form = document.querySelector('.form');

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  negociacaoController.adiciona();
});
