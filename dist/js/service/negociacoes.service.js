import { Negociacao } from '../models/negociacao.js';
export class NegociacoesService {
    negociacoesDoDia() {
        return fetch('http://localhost:8080/dados')
            .then((res) => res.json())
            .then((dadosDeHoje) => {
            return dadosDeHoje.map((dados) => {
                return new Negociacao(new Date(), dados.vezes, dados.montante);
            });
        });
    }
}
