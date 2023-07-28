export abstract class View<T> {
  protected element: HTMLElement;
  private escapar = false;

  constructor(seletor: string, escapar?: boolean) {
    const element = document.querySelector(seletor);

    if (element) {
      this.element = element as HTMLElement;
    } else {
      throw new Error(
        `O Seletor ${seletor} nao foi encontrado na DOM, por favor verifique!`
      );
    }

    if (escapar) {
      this.escapar = escapar;
    }
  }

  public update(model: T): void {
    let template = this.template(model);
    if (this.escapar) {
      template = template.replace(/<script>[\s\S]*?<\/script>/, '');
    }
    this.element.innerHTML = template;
  }

  protected abstract template(model: T): string;
}
