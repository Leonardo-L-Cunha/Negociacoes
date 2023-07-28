import { DiasDaSemana } from '../enums/dias.da.semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem.view.js';
import { NegociacaoView } from '../views/negociacoes.view.js';
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacaoView('#negociacoesView', true);
        this.mensagemView = new MensagemView('#mensagemView');
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.verificaData(negociacao.date)) {
            this.mensagemView.update('Apenas dia de semana e permitido fazer negociações!');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualiaView();
    }
    limparFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualiaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação criada com sucesso!');
    }
    verificaData(data) {
        return (data.getDay() > DiasDaSemana.DOMINGO &&
            data.getDate() < DiasDaSemana.SABADO);
    }
}
