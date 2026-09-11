const dadosExemplo = {
  REC: {
    "01": "Estagiário",
    "02": "Técnico de Enfermagem",
    "03": "Recrutador",
    "04": "Enfermeiro",
    "05": "Médico",
    "06": "Supervisor"
  },
  POLICIA: {
    "01": "Recruta",
    "02": "Soldado",
    "03": "Cabo",
    "04": "Sargento",
    "05": "Tenente"
  },
  MECANICA: {
    "01": "Aprendiz",
    "02": "Mecânico",
    "03": "Gerente"
  }
};

const equipe = document.getElementById("equipe");
const json = document.getElementById("json");
const resultado = document.getElementById("resultado");

function gerarHierarquia() {
  const texto = json.value.trim();

  if (!texto) {
    mostrar(dadosExemplo[equipe.value]);
    return;
  }

  try {
    const dados = JSON.parse(texto);
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
    linhas.push(`${cargo} - ${nome}`);
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

mostrar(dadosExemplo.REC);
