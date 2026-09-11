function mostrar(dados) {
    if (!Array.isArray(dados) && typeof dados !== "object") {
        resultado.textContent = "Nenhuma hierarquia encontrada.";
        return;
    }

    let linhas = [];

    if (Array.isArray(dados)) {
        dados.forEach((item, index) => {
            if (typeof item === "object" && item !== null) {
                const valores = Object.entries(item)
                    .map(([chave, valor]) => `${chave}: ${valor}`)
                    .join(" | ");

                linhas.push(`${String(index + 1).padStart(2, "0")} - ${valores}`);
            } else {
                linhas.push(`${String(index + 1).padStart(2, "0")} - ${item}`);
            }
        });
    } else {
        Object.entries(dados).forEach(([cargo, nome]) => {
            if (typeof nome === "object" && nome !== null) {
                const valores = Object.entries(nome)
                    .map(([chave, valor]) => `${chave}: ${valor}`)
                    .join(" | ");

                linhas.push(`${cargo} - ${valores}`);
            } else {
                linhas.push(`${cargo} - ${nome}`);
            }
        });
    }

    resultado.textContent = linhas.join("\n");
}