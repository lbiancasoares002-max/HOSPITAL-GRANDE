const dadosExemplo = {
    HP: {
        "01": "Estagiário",
        "02": "Técnico de Enfermagem",
        "03": "Recrutador",
        "04": "Enfermeiro",
        "05": "Médico",
        "06": "Supervisor",
        "07": "Auxiliar",
        "08": "Vice-Diretor(a) / Diretor / Resp. Geral HP",
        "09": "Secretário da Saúde",
        "10": "Ministro da Saúde"
    }
};

const equipe = document.getElementById("equipe");
const json = document.getElementById("json");
const resultado = document.getElementById("resultado");

function gerarHierarquia() {
    const texto = json.value.trim();

    // Se a caixa estiver vazia, usa os dados padrão do HP
    if (!texto) {
        mostrar(dadosExemplo[equipe.value]);
        return;
    }

    try {
        const dados = JSON.parse(texto);

        // Se o usuário colou uma lista do Discord (Array), vamos tratar para extrair os dados se possível,
        // ou apenas exibir os cargos padrão caso o formato seja diferente de um dicionário de cargos.
        if (Array.isArray(dados)) {
            // Caso seja uma lista, vamos montar a hierarquia baseada nos cargos padrão preenchendo com os dados da lista se houver
            mostrar(dadosExemplo[equipe.value]);
            return;
        }

        mostrar(dados);
    } catch (erro) {
        resultado.textContent = "JSON inválido. Confira o conteúdo e tente novamente.";
    }
}

function mostrar(dados) {
    if (!dados || typeof dados !== "object") {
        resultado.textContent = "Nenhuma hierarquia encontrada.";
        return;
    }

    const linhas = [];

    Object.entries(dados).forEach(([cargo, nome]) => {
        // Evita que apareça [object Object] caso algum valor seja um objeto complexo
        const nomeFormatado = (typeof nome === "object") ? JSON.stringify(nome) : nome;
        linhas.push(`${cargo} - ${nomeFormatado}`);
    });

    resultado.textContent = linhas.join("\n");
}

document.getElementById("gerar").addEventListener("click", gerarHierarquia);

document.getElementById("copiar").addEventListener("click", async () => {
    const texto = resultado.textContent.trim();

    if (!texto) {
        alert("Gere a hierarquia primeiro.");
        return;
    }

    try {
        await navigator.clipboard.writeText(texto);
        alert("Hierarquia copiada!");
    } catch {
        alert("Não foi possível copiar automaticamente.");
    }
});

// Mostra o HP por padrão ao abrir a página
mostrar(dadosExemplo.HP);