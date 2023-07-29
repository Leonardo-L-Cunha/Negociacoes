export function tempoDeExecucao(emSegundos: boolean = false) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const metodoOrigial = descriptor.value;

    descriptor.value = function (...args: any[]) {
      let divisor = 1;
      let frase = 'milisegundos';

      if (emSegundos) {
        divisor = 1000;
        frase = 'segundos';
      }

      const t1 = performance.now();
      const retorno = metodoOrigial.apply(this, args);
      const t2 = performance.now();
      console.log(
        `${propertyKey}, tempo de execução e : ${(t2 - t1) / divisor} ${frase}`
      );
      retorno;
    };
    return descriptor;
  };
}
