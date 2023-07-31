var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { domInjector } from '../decorators/dom.injector.js';
import { tempoDeExecucao } from '../decorators/logar.tempo.de.execucao.js';
import { DiasDaSemana } from '../enums/dias.da.semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesService } from '../service/negociacoes.service.js';
import { MensagemView } from '../views/mensagem.view.js';
import { NegociacaoView } from '../views/negociacoes.view.js';
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacaoView('#negociacoesView');
        this.mensagemView = new MensagemView('#mensagemView');
        this.negociacoesService = new NegociacoesService();
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
    importaDados() {
        this.negociacoesService
            .negociacoesDoDia()
            .then((negociacoesDeHoje) => {
            return negociacoesDeHoje.filter((negociacoesDeHoje) => {
                return !this.negociacoes
                    .listar()
                    .some((negociacao) => negociacao.ehIgual(negociacoesDeHoje));
            });
        })
            .then((negociacoesDeHoje) => {
            for (let negociacao of negociacoesDeHoje) {
                this.negociacoes.adiciona(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
        });
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
            data.getDay() < DiasDaSemana.SABADO);
    }
}
__decorate([
    domInjector('#data')
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    domInjector('#quantidade')
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInjector('#valor')
], NegociacaoController.prototype, "inputValor", void 0);
__decorate([
    tempoDeExecucao()
], NegociacaoController.prototype, "adiciona", null);
