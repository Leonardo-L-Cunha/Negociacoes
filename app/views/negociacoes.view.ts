import { Negociacoes } from '../models/negociacoes';
import { View } from './view.js';

export class NegociacaoView extends View<Negociacoes> {
  protected template(model: Negociacoes): string {
    return `
            <table class="table table-hover table-bordered">
              <thead>
                <tr>
                   <th>DATA</th> 
                   <th>QUANTIDADE</th> 
                   <th>VALOR</th> 
                </tr>
              </thead>
              <tbody>
                ${model
                  .listar()
                  .map((negociacao) => {
                    return `
                        <tr>
                           <td>${Intl.DateTimeFormat().format(
                             negociacao.date
                           )}</td> 
                           <td>${negociacao.quantidade}</td> 
                           <td>${negociacao.valor}</td> 
                        </tr>
                    `;
                  })
                  .join('')}
              </tbody>  
            </table>
        `;
  }
}
