// lista (array) que armazena os números já sorteados
let listaDeNumerosSorteados = [];
// define o número máximo que pode ser sorteado (limite superior)
let numeroLimite = 10;
// chama a função gerarNumeroAleatorio() e guarda o valor retornado em numeroSecreto
let numeroSecreto = gerarNumeroAleatorio();
// Conta o número de tentativas do jogador (inicia em 1, já que o primeiro chute conta como tentativa)
let tentativas = 1;

// Função que exibe texto na tela e fala o conteúdo
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    if ("speechSynthesis" in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = "pt-BR";
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// Função sem parâmetros que exibe a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto da Gigi');  // título + fala
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');   // instruções + fala
}

// Chamar logo no início
exibirMensagemInicial();


// Função que verifica o valor digitado pelo usuário no campo de input
function verificarChute() {
    let chute = document.querySelector('input').value; // captura o valor digitado no input

    // Caso o chute seja igual ao número secreto
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou'); // altera o título para "Acertou"

        // Define se a palavra será "tentativa" (singular) ou "tentativas" (plural)
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';

        // Usa template string para mostrar o número de tentativas na mensagem
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

        exibirTextoNaTela('p', mensagemTentativas);

        // Habilita o botão "Novo jogo" (antes estava desabilitado)
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        // Se errou o número, mostra dica se é maior ou menor
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }

        tentativas++;   // incrementa o número de tentativas
        limparCampo();  // limpa o campo de input e coloca o cursor de volta
    }
}

// Função que gera um número aleatório de 1 a 10
function gerarNumeroAleatorio() {
    // Math.random() gera entre 0 e 1 → multiplicamos por 10 e somamos 1
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    // guarda quantos números já foram sorteados até agora
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // verifica se já foram sorteados 10 números
    if (quantidadeDeElementosNaLista == numeroLimite) {
        // reinicia a lista, limpando todos os números já sorteados
        listaDeNumerosSorteados = [];

    }
    // Se já existir, chama a própria função novamente (recursividade) para gerar outro número
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // Caso já exista, chama a própria função novamente (recursividade)
        return gerarNumeroAleatorio();
    } else {
        // Se o número NÃO estiver na lista de já sorteados...
        listaDeNumerosSorteados.push(numeroEscolhido);
        // Caso não exista, retorna esse número como novo sorteado
        return numeroEscolhido; // devolve o número para quem chamou a função
    }
}

// Função que limpa o campo de entrada (input) e recoloca o cursor dentro dele
function limparCampo() {
    let input = document.querySelector('input'); // seleciona o campo <input>
    input.value = ''; // apaga o valor digitado
    input.focus();    // devolve o cursor para o input (para facilitar o próximo chute)
}

// Função que reinicia o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();     // gera novo número secreto
    limparCampo();                              // limpa o input
    tentativas = 1;                             // reinicia contador de tentativas
    exibirMensagemInicial();                    // exibe título e instruções novamente
    document.getElementById('reiniciar').setAttribute('disabled', 'true'); // desabilita o botão "Novo jogo"
}
