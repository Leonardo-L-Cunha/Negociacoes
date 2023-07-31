import { domInjector } from '../decorators/dom.injector.js';
import { tempoDeExecucao } from '../decorators/logar.tempo.de.execucao.js';
import { DiasDaSemana } from '../enums/dias.da.semana.js';
import { NegociacoesDoDia } from '../interfaces/negociacoes.do.dia.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesService } from '../service/negociacoes.service.js';
import { MensagemView } from '../views/mensagem.view.js';
import { NegociacaoView } from '../views/negociacoes.view.js';

export class NegociacaoController {
  @domInjector('#data')
  private inputData: HTMLInputElement;
  @domInjector('#quantidade')
  private inputQuantidade: HTMLInputElement;
  @domInjector('#valor')
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacaoView('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');
  private negociacoesService = new NegociacoesService();
  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @tempoDeExecucao()
  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );

    if (!this.verificaData(negociacao.date)) {
      this.mensagemView.update(
        'Apenas dia de semana e permitido fazer negociações!'
      );
      return;
    }

    this.negociacoes.adiciona(negociacao);
    this.limparFormulario();
    this.atualiaView();
  }

  public importaDados(): void {
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

  private limparFormulario(): void {
    this.inputData.value = '';
    this.inputQuantidade.value = '';
    this.inputValor.value = '';
    this.inputData.focus();
  }

  private atualiaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update('Negociação criada com sucesso!');
  }

  private verificaData(data: Date): boolean {
    return (
      data.getDay() > DiasDaSemana.DOMINGO &&
      data.getDay() < DiasDaSemana.SABADO
    );
  }
}
