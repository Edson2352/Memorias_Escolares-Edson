// Base de dados das redações para exibição completa no Modal
const redaçõesData = {
    "essay-1": {
        titulo: "Desafios da Educação na Era Digital",
        categoria: "Modelo ENEM",
        nota: "960",
        ano: "3º Ano do Ensino Médio",
        texto: `
            <p><strong>Introdução:</strong> Na obra "Utopias Modernas", discute-se o papel da tecnologia como motor do progresso humano. No entanto, no cenário brasileiro atual, a integração do ambiente digital às salas de aula enfrenta gargalos estruturais e pedagógicos que impedem a plena democratização do saber.</p>
            <p><strong>Desenvolvimento 1:</strong> Em primeiro lugar, cabe pontuar a disparidade no acesso à infraestrutura de redes. Enquanto colégios privados investem em ferramentas avançadas, diversas redes públicas ainda sofrem com a falta de conectividade básica...</p>
            <p><strong>Desenvolvimento 2:</strong> Ademais, soma-se a isso a necessidade de capacitação contínua do corpo docente para a mediação pedagógica com novas mídias...</p>
            <p><strong>Proposta de Intervenção:</strong> Portanto, compete ao Ministério da Educação, em parceria com os municípios, implementar políticas públicas de inclusão digital e treinamentos constantes aos educadores, com o intuito de transformar a tecnologia em uma aliada inclusiva no aprendizado.</p>
        `
    },
    "essay-2": {
        titulo: "O Impacto das Redes Sociais na Juventude",
        categoria: "Artigo de Opinião",
        nota: "10/10",
        ano: "2º Ano do Ensino Médio",
        texto: `
            <p>As plataformas digitais transformaram profundamente a comunicação e as relações interpessoais dos adolescentes. Embora facilitem a troca instantânea de informações, a busca incessante por métricas de aprovação gera dilemas emocionais severos.</p>
            <p>É fundamental promover debates no ambiente escolar e familiar a fim de incentivar o uso consciente das redes, valorizando interações reais e o bem-estar psicológico dos jovens.</p>
        `
    },
    "essay-3": {
        titulo: "A Crítica Social em Machado de Assis",
        categoria: "Análise Literária",
        nota: "9.5",
        ano: "1º Ano do Ensino Médio",
        texto: `
            <p>Ao analisar a obra "Memórias Póstumas de Brás Cubas", percebe-se a ironia machadiana desmascarando a hipocrisia da elite oitocentista brasileira. Através de um narrador defunto, o autor reflete criticamente sobre o egoísmo, o status e as convenções sociais de sua época.</p>
        `
    }
};

document.addEventListener("DOMContentLoaded", () => {
    
    // Atualiza ano do footer dinamicamente
    document.getElementById("year").innerText = new Date().getFullYear();

    // 1. Alternar Expansão de Conteúdo na Linha do Tempo
    const toggleButtons = document.querySelectorAll(".btn-toggle");

    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const details = button.previousElementSibling;
            details.classList.toggle("hidden");

            if (details.classList.contains("hidden")) {
                button.innerText = "Ver Mais";
            } else {
                button.innerText = "Ver Menos";
            }
        });
    });

    // 2. Filtro das Redações
    const filterButtons = document.querySelectorAll(".filter-btn");
    const essayCards = document.querySelectorAll(".essay-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove classe ativa dos outros
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            essayCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 3. Modal de Visualização da Redação
    const modal = document.getElementById("essay-modal");
    const modalBody = document.getElementById("modal-body");
    const closeModal = document.querySelector(".close-modal");
    const readButtons = document.querySelectorAll(".btn-read-essay");

    readButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const essayId = btn.getAttribute("data-essay");
            const data = redaçõesData[essayId];

            if (data) {
                modalBody.innerHTML = `
                    <h2>${data.titulo}</h2>
                    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 15px;">
                        <strong>${data.categoria}</strong> • ${data.ano} • <strong>Nota: ${data.nota}</strong>
                    </p>
                    <hr style="margin-bottom: 15px; border: 0; border-top: 1px solid #e2e8f0;">
                    <div class="essay-full-text">${data.texto}</div>
                `;
                modal.classList.remove("hidden");
            }
        });
    });

    // Fechar Modal
    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.add("hidden");
        }
    });
});
