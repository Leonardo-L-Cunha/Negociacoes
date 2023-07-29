export function inspect() {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args) {
            const retorno = metodoOriginal.apply(this, args);
            console.log(`--- metodo: ${propertyKey}`);
            console.log(`----- parâmetros do metodo ${JSON.stringify(args)}`);
            console.log(`----- retorno do metodo: ${JSON.stringify(retorno)}`);
            return retorno;
        };
        return descriptor;
    };
}
