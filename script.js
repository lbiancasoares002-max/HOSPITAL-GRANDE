// ==========================================
// HIERARQUIA DO HOSPITAL
// ==========================================

const dadosHospital = [
    {
        numero: "01",
        cargo: "Estagiário",
        requisitos: [
            "60 reanimações",
            "2 dias de estagiário",
            "Carteira de trabalho",
            "Roupa branca"
        ]
    },

    {
        numero: "02",
        cargo: "Técnico de Enfermagem",
        requisitos: [
            "120 reanimações",
            "4 dias de técnico de enfermagem",
            "Curso de paraquedas",
            "Curso de recrutamento",
            "Carteira de trabalho",
            "Roupa roxa"
        ]
    },

    {
        numero: "03",
        cargo: "Recrutador",
        requisitos: [
            "200 reanimações",
            "5 dias de recrutador",
            "Curso REC",
            "Curso ROC",
            "15 recrutamentos"
        ]
    },

    {
        numero: "04",
        cargo: "Enfermeiro",
        requisitos: []
    },

    {
        numero: "05",
        cargo: "Médico",
        requisitos: []
    },

    {
        numero: "06",
        cargo: "Supervisor",
        requisitos: []
    }
];


// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const equipe = document.getElementById("equipe");
const campoJson = document.getElementById("json");
const resultado = document.getElementById("resultado");
const botaoGerar = document.getElementById("gerarHierarquia");
const botaoCopiar = document.getElementById("copiar");


// ==========================================
// ESCAPAR HTML
// ==========================================

function escaparHTML(texto) {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ==========================================
// CRIAR UM CARD DE CARGO
// ==========================================

function criarCargo(item, index) {

    const numero =
        item.numero ||
        String(index + 1).padStart(2, "0");

    const cargo =
        item.cargo ||
        item.nome ||
        `Cargo ${index + 1}`;

    let requisitos = "";

    if (
        Array.isArray(item.requisitos) &&
        item.requisitos.length > 0
    ) {

        requisitos = `
            <div class="requisitos">
                ${item.requisitos.map(requisito => `
                    <div class="requisito">
                        <span class="check">✓</span>
                        <span>${escaparHTML(requisito)}</span>
                    </div>
                `).join("")}
            </div>
        `;

    } else {

        requisitos = `
            <div class="sem-requisitos">
                Requisitos ainda não definidos
            </div>
        `;
    }

    return `
        <div class="cargo">

            <div class="cargo-topo">

                <div class="numero">
                    ${escaparHTML(numero)}
                </div>

                <div class="cargo-nome">
                    ${escaparHTML(cargo)}
                </div>

            </div>

            <div class="cargo-conteudo">

                <div class="titulo-requisitos">
                    REQUISITOS
                </div>

                ${requisitos}

            </div>

        </div>
    `;
}


// ==========================================
// MOSTRAR HIERARQUIA
// ==========================================

function mostrar(dados) {

    if (!Array.isArray(dados)) {

        resultado.innerHTML = `
            <div class="erro">
                O formato do JSON precisa ser uma lista de cargos.
            </div>
        `;

        return;
    }

    if (dados.length === 0) {

        resultado.innerHTML = `
            <div class="erro">
                Nenhuma hierarquia encontrada.
            </div>
        `;

        return;
    }

    resultado.innerHTML = `

        <div class="resultado-cabecalho">

            <div>
                <span class="resultado-titulo">
                    HIERARQUIA
                </span>

                <span class="resultado-subtitulo">
                    Hospital
                </span>
            </div>

            <div class="contador">
                ${dados.length} cargos
            </div>

        </div>

        <div class="lista-cargos">

            ${dados.map((item, index) =>
        criarCargo(item, index)
    ).join("")}

        </div>
    `;
}


// ==========================================
// GERAR HIERARQUIA
// ==========================================

function gerar() {

    const texto = campoJson.value.trim();

    // Se o usuário não colocou JSON,
    // mostra a hierarquia padrão.
    if (!texto) {

        mostrar(dadosHospital);

        return;
    }

    try {

        const dados = JSON.parse(texto);

        mostrar(dados);

    } catch (erro) {

        resultado.innerHTML = `
            <div class="erro">
                <strong>JSON inválido.</strong><br><br>
                Confira o conteúdo digitado e tente novamente.
            </div>
        `;

        console.error("Erro no JSON:", erro);
    }
}


// ==========================================
// BOTÃO GERAR
// ==========================================

if (botaoGerar) {

    botaoGerar.addEventListener(
        "click",
        gerar
    );
}


// ==========================================
// BOTÃO COPIAR
// ==========================================

if (botaoCopiar) {

    botaoCopiar.addEventListener(
        "click",
        async () => {

            // Copia uma versão em texto simples
            // da hierarquia.

            let texto = "";

            dadosHospital.forEach((item) => {

                texto += `${item.numero} - ${item.cargo}\n`;

                if (
                    item.requisitos &&
                    item.requisitos.length > 0
                ) {

                    item.requisitos.forEach(
                        requisito => {
                            texto += `    • ${requisito}\n`;
                        }
                    );

                }

                texto += "\n";
            });

            try {

                await navigator.clipboard.writeText(texto);

                alert("Hierarquia copiada!");

            } catch (erro) {

                alert(
                    "Não foi possível copiar automaticamente."
                );

                console.error(
                    "Erro ao copiar:",
                    erro
                );
            }
        }
    );
}


// ==========================================
// MOSTRAR AUTOMATICAMENTE AO ABRIR
// ==========================================

mostrar(dadosHospital);