import { DiasDaSemana } from '../enums/dias.da.semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem.view.js';
import { NegociacaoView } from '../views/negociacoes.view.js';

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacaoView('#negociacoesView', true);
  private mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this.inputData = document.querySelector('#data') as HTMLInputElement;
    this.inputQuantidade = document.querySelector(
      '#quantidade'
    ) as HTMLInputElement;
    this.inputValor = document.querySelector('#valor') as HTMLInputElement;
    this.negociacoesView.update(this.negociacoes);
  }

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
