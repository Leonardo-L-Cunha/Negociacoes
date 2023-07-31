import { NegociacoesDoDia } from '../interfaces/negociacoes.do.dia';
import { Negociacao } from '../models/negociacao.js';

export class NegociacoesService {
  public negociacoesDoDia(): Promise<Negociacao[]> {
    return fetch('http://localhost:8080/dados')
      .then((res) => res.json())
      .then((dadosDeHoje: NegociacoesDoDia[]) => {
        return dadosDeHoje.map((dados) => {
          return new Negociacao(new Date(), dados.vezes, dados.montante);
        });
      });
  }
}
