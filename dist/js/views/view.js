export class View {
    constructor(seletor) {
        const element = document.querySelector(seletor);
        if (element) {
            this.element = element;
        }
        else {
            throw new Error(`O Seletor ${seletor} nao foi encontrado na DOM, por favor verifique!`);
        }
    }
    update(model) {
        let template = this.template(model);
        this.element.innerHTML = template;
    }
}
