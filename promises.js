//gera uma Promise que é resolvida após 10 segundos
function tenSecondsPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise 1");
        }, 10000);
    });
}

//gera uma Promise que é resolvida após 2 segundos
function twoSecondsPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise 2");
        }, 2000);
    });
}

//gera uma Promise que é resolvida após 1 segundo
function oneSecondPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise 3");
        }, 1000);
    });
}

module.exports = {
    tenSecondsPromise,
    twoSecondsPromise,
    oneSecondPromise
}