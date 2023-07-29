import { inspect } from '../decorators/inspect.js';
import { tempoDeExecucao } from '../decorators/logar.tempo.de.execucao.js';

export abstract class View<T> {
  protected element: HTMLElement;

  constructor(seletor: string) {
    const element = document.querySelector(seletor);

    if (element) {
      this.element = element as HTMLElement;
    } else {
      throw new Error(
        `O Seletor ${seletor} nao foi encontrado na DOM, por favor verifique!`
      );
    }
  }

  @tempoDeExecucao(true)
  @inspect()
  public update(model: T): void {
    let template = this.template(model);
    this.element.innerHTML = template;
  }

  protected abstract template(model: T): string;
}
