const cluster = require('cluster');
const os = require('os');
const {
    tenSecondsPromise,
    twoSecondsPromise,
    oneSecondPromise
} = require('./promises');


// No exemplo que analisamos, temos três promessas:
//tenSecondsPromise, twoSecondsPromise e oneSecondPromise,
//Iremos abordar a execução delas de diferentes formas.

//Exemplo 1: Executando promessas em sequencia
async function executePromisesInSequence() {
    console.time('executePromisesInSequence');

    await tenSecondsPromise();
    console.log('tenSecondsPromise concluída');

    await twoSecondsPromise();
    console.log('twoSecondsPromise concluída');

    await oneSecondPromise();
    console.log('oneSecondPromise concluída');

    console.timeEnd('executePromisesInSequence'); //13 segundos
}
//executePromisesInSequence();
//_______________________________________________________________________________________________

//Exemplo 2: Executando promessas de maneira simultânea
async function executePromisesSimultaneously() {
    console.time('executePromisesSimultaneously');

    const promise1 = tenSecondsPromise();
    const promise2 = twoSecondsPromise();
    const promise3 = oneSecondPromise();

    //Estas três linhas iniciam as três promessas simultaneamente. 
    //Todas as três promessas começam a executar 
    //de maneira simultanea assim que essas linhas são alcançadas,
    //independentemente das linhas await que as seguem.

    await promise1;
    console.log('tenSecondsPromise concluída');
    await promise2;
    console.log('twoSecondsPromise concluída');
    await promise3;
    console.log('oneSecondPromise concluída');

    //Estas linhas esperam que cada promise termine individualmente e em ordem. No entanto,
    //como todas as três promessas já foram iniciadas anteriormente, elas estão, de fato,
    //executando em simultâneo.

    console.timeEnd('executePromisesSimultaneously'); //10 segundos
}
//executePromisesSimultaneously();
//_______________________________________________________________________________________________

//Exemplo 3: Executando promessas de maneira simultânea com Promise.all

//A abordagem Promise.all() é uma forma de executar múltiplas promessas em simultâneo
//e esperar que todas sejam concluídas. 
//Nesse caso temos o conceito de falha em bloco
//Se uma das promessas falhar, todas as outras promessas serão rejeitadas imediatamente.
async function executePromisesSimultaneouslyWithPromiseAll() {
    console.time('executePromisesSimultaneouslyWithPromiseAll');

    await Promise.all([tenSecondsPromise(), twoSecondsPromise(), oneSecondPromise()]);

    console.timeEnd('executePromisesSimultaneouslyWithPromiseAll'); //10 segundos
}
//executePromisesSimultaneouslyWithPromiseAll();
//_______________________________________________________________________________________________

//Exemplo 4: Executando promessas em simultâneo com Promise.allSettled

//A abordagem Promise.allSettled() é uma forma de executar múltiplas promessas em simultâneo
//e esperar que todas sejam concluídas.
//Nesse caso temos o conceito de falha tolerante
//Se uma das promessas falhar, as outras promessas serão concluídas normalmente.

async function executePromisesSimultaneouslyWithPromiseAllSettled() {
    console.time('executePromisesSimultaneouslyWithPromiseAllSettled');

    await Promise.allSettled([tenSecondsPromise(), twoSecondsPromise(), oneSecondPromise()]);

    console.timeEnd('executePromisesSimultaneouslyWithPromiseAllSettled'); //10 segundos
}
//executePromisesSimultaneouslyWithPromiseAllSettled();
//_______________________________________________________________________________________________

//Exemplo 5: Executando promessas em simultâneo com Promise.race

//A abordagem Promise.race() é uma forma de executar múltiplas promessas em simultâneo
//e esperar que a primeira seja concluída.
//Nesse a primeira promise a resolver ou rejeitar será a que será retornada

async function executePromisesSimultaneouslyWithPromiseRace() {
    console.time('executePromisesSimultaneouslyWithPromiseRace');

    await Promise.race([tenSecondsPromise(), twoSecondsPromise(), oneSecondPromise()]);

    console.timeEnd('executePromisesSimultaneouslyWithPromiseRace'); //1 segundo
}
//executePromisesSimultaneouslyWithPromiseRace();
//_______________________________________________________________________________________________

//Exemplo 6: Executando promessas em simultâneo com Promise.any

//A abordagem Promise.any() é uma forma de executar múltiplas promessas em simultâneo
//e esperar que a primeira seja concluída.
//Nesse caso temos o conceito de falha tolerante
//Se uma das promessas falhar, as outras promessas serão concluídas normalmente.
//Haverá falha somente se todas as promessas falharem

async function executePromisesSimultaneouslyWithPromiseAny() {
    console.time('executePromisesSimultaneouslyWithPromiseAny');

    await Promise.any([tenSecondsPromise(), twoSecondsPromise(), oneSecondPromise()]);

    console.timeEnd('executePromisesSimultaneouslyWithPromiseAny'); //1 segundo
}
//executePromisesSimultaneouslyWithPromiseAny();
//_______________________________________________________________________________________________

//Exemplo 7: Utilizando Generators para executar promessas com Lazy Evaluation
//Generators são funções que podem ser pausadas e retomadas posteriormente.
//São muito utilizados em bibliotecas como Redux Saga e Redux Observable.

function* promiseGenerator() {
    console.log('Iniciando tenSecondsPromise...');
    yield tenSecondsPromise();
    console.log('tenSecondsPromise concluída');
    doSomeOperation(); // Uma operação qualquer entre as execuções das promessas.

    console.log('Iniciando twoSecondsPromise...');
    yield twoSecondsPromise();
    console.log('twoSecondsPromise concluída');
    doAnotherOperation(); // Outra operação entre as execuções das promessas.

    console.log('Iniciando oneSecondPromise...');
    yield oneSecondPromise();
    console.log('oneSecondPromise concluída');
}

function doSomeOperation() {
    console.log('Realizando uma operação após a tenSecondsPromise...');
}

function doAnotherOperation() {
    console.log('Realizando uma operação após a twoSecondsPromise...');
}

async function executePromisesWithGenerator() {
    console.time('executePromisesWithGenerator');

    const generator = promiseGenerator();

    // Nesse caso, cada chamada de generator.next().value retorna uma promise.
    // Isso nos permite ter diferentes abordagens de execução de promises
    // e também operações entre cada yield.

    await generator.next().value;
    await generator.next().value;
    await generator.next().value;

    console.timeEnd('executePromisesWithGenerator'); //13s
}

// Chamada da função para iniciar a execução
// Esse tópico é gigante e bem profundo, veja isso como uma menção do conceito
//executePromisesWithGenerator();
//_______________________________________________________________________________________________

//Exemplo 8: Executando promessas com for of + await(dentro do laço)
//A abordagem for of + await(dentro do laço) é uma forma de executar múltiplas promessas em sequencia
//É vantajosa caso seja interessante bloquear a execução de uma promise até 
//que a anterior seja concluída, permitindo logging entre as resultados das promises (util para scripts)

async function executePromisesInSequenceWithForOfAwait() {
    console.time('executePromisesInSequenceWithForOfAwait');

    const promises = [tenSecondsPromise, twoSecondsPromise, oneSecondPromise];

    for (const promiseFunc of promises) {
        const result = await promiseFunc();
        console.log(`${result} concluída`);
    }

    console.timeEnd('executePromisesInSequenceWithForOfAwait'); // Aproximadamente 13 segundos, considerando que as promises levam 10, 2 e 1 segundo respectivamente.
}
//executePromisesInSequenceWithForOfAwait();
//_______________________________________________________________________________________________

//Exemplo 9: Executando promessas com recursão
//É vantajosa caso seja interessante bloquear a execução de uma promise até
//que a anterior seja concluída, permitindo logging entre as promises (util pra scripts)
//Comum pra quem costuma programar com abordagem funcional
//É bem util em blocos try-catch para casos de RETRY SEMANTICOS 
//(bom assunto pra pesquisar) -> utilizar recursão pra retry de promises

async function executePromisesInSequenceWithRecursion(promiseFuncs) {
    if (promiseFuncs.length === 0) {
        return;  // Base da recursão: se não houver mais funções de promessa, retorne.
    }

    const [firstPromiseFunc, ...remainingPromiseFuncs] = promiseFuncs;
    const result = await firstPromiseFunc();
    console.log(`${result} concluída`);

    // Chamada recursiva com as funções de promessa restantes.
    return executePromisesInSequenceWithRecursion(remainingPromiseFuncs);
}

async function runRecursiveExample() {
    console.time('executePromisesInSequenceWithRecursion');

    await executePromisesInSequenceWithRecursion([tenSecondsPromise, twoSecondsPromise, oneSecondPromise]);

    console.timeEnd('executePromisesInSequenceWithRecursion'); // Aproximadamente 13 segundos, considerando que as promises levam 10, 2 e 1 segundo respectivamente.
}
//runRecursiveExample();
//_______________________________________________________________________________________________

//Exemplo 10: Executando promessas com recursão e trampoline
//É vantajosa caso seja interessante bloquear a execução de uma promise até
//que a anterior seja concluída, permitindo logging entre as promises (util pra scripts)
//Comum pra quem costuma programar com abordagem funcional
//Trampoline é uma técnica que permite que uma função recursiva seja executada
//sem estourar a pilha de execução do JavaScript.

async function trampolineAsync(fn) {
    let result = fn();

    while (result instanceof Promise) {
        result = await result;
        if (typeof result === 'function') {
            result = result();
        }
    }

    return result;
}

function executePromisesInSequenceWithTrampoline(promiseFuncs) {
    return async function recur() {
        if (promiseFuncs.length === 0) {
            return;  // Base da recursão: se não houver mais funções de promessa, retorne.
        }

        const [firstPromiseFunc, ...remainingPromiseFuncs] = promiseFuncs;
        const result = await firstPromiseFunc();
        console.log(`${result} concluída`);

        // Retorna a próxima função a ser chamada pelo trampolim.
        promiseFuncs = remainingPromiseFuncs;
        return recur;
    };
}

async function runTrampolineExample() {
    console.time('executePromisesInSequenceWithTrampoline');

    await trampolineAsync(executePromisesInSequenceWithTrampoline([tenSecondsPromise, twoSecondsPromise, oneSecondPromise]));

    console.timeEnd('executePromisesInSequenceWithTrampoline'); // Aproximadamente 13 segundos.
}
//runTrampolineExample();
//_______________________________________________________________________________________________

//Exemplo 11 - Executando promessas com um método de composição assíncrono
//A abordagem de composição de funções é uma forma de executar múltiplas promessas em sequencia
//Segue bem alinhado com a thread antiga que fiz sobre FP

// Função composeAsync
const composeAsync = (...funcs) => async () => {
    return funcs.reverse().reduce(async (accPromise, func) => {
        const acc = await accPromise;
        console.log(`Executando função: ${func.name}`);
        return func(acc);
    }, Promise.resolve());
};


// Criando uma sequência usando composeAsync
const composedFunction = composeAsync(tenSecondsPromise, twoSecondsPromise, oneSecondPromise);

// Uso da função composta
async function useComposedFunction() {
    console.time('useComposedFunction');

    // Chamar a função composta
    await composedFunction(); // ou passar algum valor inicial se necessário: composedFunction(inputValue)

    console.timeEnd('useComposedFunction'); // Aproximadamente 13 segundos.
}

//useComposedFunction();
//_______________________________________________________________________________________________

// Exemplo 12: Executando promessas com .then
// Esse caso executará as promessas em sequencia (muito veem como uma sintax mais "old")
function executePromisesInSequenceWithThen() {
    console.time('executePromisesInSequenceWithThen');

    tenSecondsPromise()
        .then(result => {
            console.log(`${result} concluída`);
            return twoSecondsPromise();
        })
        .then(result => {
            console.log(`${result} concluída`);
            return oneSecondPromise();
        })
        .then(result => {
            console.log(`${result} concluída`);
            console.timeEnd('executePromisesInSequenceWithThen');  // Aproximadamente 13 segundos.
        })
        .catch(error => {
            console.error('Erro ao executar uma das promessas:', error);
        });
}

//executePromisesInSequenceWithThen();
//tem diferenças entre .then e async await "por baixo dos panos", mas essa fica pro proximo
//capitulo ou pra sua curiosidade
//Na pratica muitas vezes obeteremos resultados semelhantes
//_______________________________________________________________________________________________

// Exemplo 13: Utilizando Recursão no bloco catch (para retries)

// A abordagem de recursão no bloco catch é uma forma de executar retries de promessas
//dessa maneira criamos uma subfunção que executa a promise e caso ela falhe de acordo com o
// com um número máximo de tentativas definido no parâmetro.
//Essa aqui eu não testei porque não criei uma promise que falha, mas a ideia é essa (confia duo bot)
async function executePromisesInSequence() {
    console.time('executePromisesInSequence');

    const runWithRetry = async (func, retries = 3) => {
        try {
            await func();
        } catch (error) {
            console.log(`Erro na tentativa ${4 - retries} para ${func.name}. Tentando novamente...`);
            return retries > 1 ? await runWithRetry(func, retries - 1) : Promise.reject(error);
        }
    };

    await runWithRetry(tenSecondsPromise);
    console.log('tenSecondsPromise concluída');

    await runWithRetry(twoSecondsPromise);
    console.log('twoSecondsPromise concluída');

    await runWithRetry(oneSecondPromise);
    console.log('oneSecondPromise concluída');

    console.timeEnd('executePromisesInSequence'); // Aproximadamente 13 segundos
}

// executePromisesInSequence()
//     .catch(error => {
//         console.error('Erro ao executar uma das promessas:', error.message);
//     });
//_______________________________________________________________________________________________

//Exemplo 14 BOMUS: Promises utilizando Node Cluster KKK PRA TRANSCEDER 

//Pra quem não conhece Node Cluster ou não tem muita familiaridade com paralelismo essa é a hora

//O que é Node Cluster????
//Este código demonstra como executar três funções Promise em paralelo usando o módulo
//cluster do Node.js. Cada Promise representa uma tarefa que demora um determinado
//tempo para ser concluída: 10 segundos, 2 segundos e 1 segundo, respectivamente. O
//objetivo é distribuir essas tarefas entre os núcleos do processador da máquina para que
//sejam executadas simultaneamente, maximizando a utilização dos recursos e
//possivelmente reduzindo o tempo total de execução. Nesse caso estamos realmente paralelizando

const numberOfCPUs = os.cpus().length;

const workerAndPromiseTable = {
    0: tenSecondsPromise,
    1: twoSecondsPromise,
    2: oneSecondPromise
};

let completedWorkers = 0;

function createWorker(index) {
    if (index >= 3 || index >= numberOfCPUs) return;

    cluster.fork({ WORKER_TYPE: index });
    createWorker(index + 1);
}

function runPromisesInParallel() {
    if (cluster.isMaster) {
        console.log(`Master process ${process.pid} is running`);
        console.time('Execution Time');

        createWorker(0);

        cluster.on('exit', (worker, code, signal) => {
            completedWorkers++;
            if (completedWorkers === Object.keys(workerAndPromiseTable).length) {
                console.timeEnd('Execution Time');
            }
            console.log(`Worker ${worker.process.pid} died`);
        });
        return;
    }

    const workerFunction = workerAndPromiseTable[process.env.WORKER_TYPE];

    if (!workerFunction) {
        console.log(`Worker ${process.pid} doesn't have a defined task.`);
        return;
    }

    workerFunction().then(() => {
        console.log(`Worker ${process.pid} completed its task.`);
        process.exit(0);
    });
}

//runPromisesInParallel(); // Aproximadamente 10 segundos
//_______________________________________________________________________________________________

