let cardContainer = document.querySelector(".card-container");
let dados = [];
const cardsIniciaisSection = document.querySelector('.cards-iniciais'); // Seleciona a seção inteira
const inputBusca = document.getElementById("input-busca");
const resetBtn = document.getElementById("reset-btn");
const botaoBusca = document.getElementById("botao-busca");

// Mapeamento corrigido dos títulos dos cards iniciais para os nomes no JSON
const mapeamentoCards = {
    "Backend": "O que é Backend", // Corrigido para levar à definição correta
    "Bancos de Dados": "Banco de Dados",
    "APIs & HTTP": "API",
    "Servidores": "Express" // 'Express' é um framework de servidor, 'Node.js' também funcionaria, mas Express é um servidor framework mais direto.
};

// Conteúdo inicial (vazio)
const conteudoInicial = ``;

// --- Funções de Inicialização e Busca ---

// Adiciona listener de clique no botão de busca (já que o HTML usa onclick ou type="button")
// Esta linha substitui o 'onclick' no HTML se você decidir usar o addEventListener no JS.
// Se você mantiver onclick="iniciarBusca()" no HTML, esta linha é redundante mas não quebra.
botaoBusca.addEventListener("click", iniciarBusca);


// Função auxiliar para carregar os dados
async function carregarDados() {
    if (dados.length === 0) { // Carrega os dados apenas uma vez
        try {
            let resposta = await fetch("./data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    }
}

// Renderiza conteúdo inicial e prepara eventos
window.addEventListener("DOMContentLoaded", async () => {
    await carregarDados();
    cardContainer.innerHTML = conteudoInicial;
    
    // Adiciona evento de clique nos cards iniciais
    adicionarListenersAosCardsIniciais();
});

// Função para adicionar listeners aos cards de fundamentos
function adicionarListenersAosCardsIniciais() {
    const cardsIniciais = document.querySelectorAll('.card-info');

    cardsIniciais.forEach(card => {
        card.addEventListener('click', () => {
            const titulo = card.querySelector('h3').textContent.trim();
            const nomeDoItemNoJson = mapeamentoCards[titulo];

            if (nomeDoItemNoJson) {
                // Esconde os cards iniciais
                cardsIniciaisSection.style.display = 'none';

                // Filtra o dado correspondente
                const resultado = dados.filter(d => d.nome === nomeDoItemNoJson);

                // Preenche o input com o termo buscado (opcional, mas bom para feedback)
                inputBusca.value = nomeDoItemNoJson;

                // Renderiza o resultado
                renderizarCard(resultado);
            } else {
                 console.warn(`Mapeamento não encontrado para o card: ${titulo}`);
            }
        });
    });
}


async function iniciarBusca() {
    const termoBusca = inputBusca.value.toLowerCase().trim();

    // Garante que os dados estão carregados
    if (dados.length === 0) {
        await carregarDados();
    }

    // Filtra dados
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    // Esconde cards iniciais
    cardsIniciaisSection.style.display = 'none';

    renderizarCard(dadosFiltrados);
}

// Função para renderizar resultados
function renderizarCard(dadosParaRenderizar) {
    cardContainer.innerHTML = "";

    if (dadosParaRenderizar.length === 0) {
        cardContainer.innerHTML = `<article style="text-align: center; padding: 2rem;"><h2>Nenhum resultado encontrado.</h2><p>Tente refinar sua busca.</p></article>`;
        return;
    }

    dadosParaRenderizar.forEach(dado => {
        let article = document.createElement("article");
        article.classList.add("card-resultado"); // Adicionada classe específica
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p><strong>Ano:</strong> ${dado.ano}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    });
}

// Cursor nave futurista (mantido o seu código)
document.addEventListener("mousemove", (e) => {
    const nave = document.querySelector(".nave-cursor");
    if (nave) {
        nave.style.left = e.clientX + "px";
        nave.style.top = e.clientY + "px";
    }
});

// Reset da tela ao clicar no H1
resetBtn.addEventListener("click", () => {
    cardContainer.innerHTML = conteudoInicial;
    cardsIniciaisSection.style.display = 'block'; // Mostra cards iniciais
    inputBusca.value = "";
    inputBusca.focus();
});
const btnLua = document.getElementById("btn-lua");

// Botão Lua volta para a tela inicial
btnLua.addEventListener("click", () => {
    cardContainer.innerHTML = conteudoInicial;
    cardsIniciaisSection.style.display = 'block';
    inputBusca.value = "";
    inputBusca.focus();
});
