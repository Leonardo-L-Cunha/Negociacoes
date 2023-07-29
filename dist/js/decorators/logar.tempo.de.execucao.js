export function tempoDeExecucao(emSegundos = false) {
    return function (target, propertyKey, descriptor) {
        const metodoOrigial = descriptor.value;
        descriptor.value = function (...args) {
            let divisor = 1;
            let frase = 'milisegundos';
            if (emSegundos) {
                divisor = 1000;
                frase = 'segundos';
            }
            const t1 = performance.now();
            const retorno = metodoOrigial.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução e : ${(t2 - t1) / divisor} ${frase}`);
            retorno;
        };
        return descriptor;
    };
}
