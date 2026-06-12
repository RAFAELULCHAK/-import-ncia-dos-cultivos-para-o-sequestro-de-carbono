// ==========================================================================
// SEÇÃO: ACCORDION COMPONENT
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.accordion-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            const contentId = trigger.getAttribute('aria-controls');
            const content = document.getElementById(contentId);

            // Alterna o estado atual
            trigger.setAttribute('aria-expanded', !isExpanded);
            if (content) {
                content.hidden = isExpanded;
                // Efeito suave opcional via altura
                if (!isExpanded) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = null;
                }
            }
        });
    });

    // ==========================================================================
    // SEÇÃO: FORMULÁRIOS INTERATIVOS (INSCRIÇÃO E COMENTÁRIOS)
    // ==========================================================================
    const regForm = document.getElementById('registration-form');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            regForm.hidden = true;
            document.getElementById('reg-success').hidden = false;
        });
    }

    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            commentForm.reset();
            const successMsg = document.getElementById('comment-success');
            successMsg.hidden = false;
            setTimeout(() => {
                successMsg.hidden = true;
            }, 5000);
        });
    }

    // ==========================================================================
    // SEÇÃO: CAIXA FLUTUANTE DE ACESSIBILIDADE
    // ==========================================================================
    const widgetToggle = document.getElementById('widget-toggle');
    const widgetMenu = document.getElementById('widget-menu');

    // Abre e fecha o menu flutuante
    widgetToggle.addEventListener('click', () => {
        const isOpen = widgetToggle.getAttribute('aria-expanded') === 'true';
        widgetToggle.setAttribute('aria-expanded', !isOpen);
        widgetMenu.hidden = isOpen;
    });

    // Controle de Tamanho de Fonte
    let currentZoom = 100;
    document.getElementById('btn-increase-font').addEventListener('click', () => {
        if (currentZoom < 130) {
            currentZoom += 5;
            document.documentElement.style.fontSize = `${currentZoom}%`;
        }
    });

    document.getElementById('btn-decrease-font').addEventListener('click', () => {
        if (currentZoom > 85) {
            currentZoom -= 5;
            document.documentElement.style.fontSize = `${currentZoom}%`;
        }
    });

    // Alternar Modo Escuro / Claro
    document.getElementById('btn-toggle-theme').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // ==========================================================================
    // SEÇÃO: SÍNTESE DE VOZ (SPEECH SYNTHESIS API)
    // ==========================================================================
    let utterance = null;

    document.getElementById('btn-tts-start').addEventListener('click', () => {
        // Cancela qualquer leitura em andamento para evitar sobreposição
        window.speechSynthesis.cancel();

        // Seleciona as partes principais de conteúdo textual da página
        const mainContentBlocks = document.querySelectorAll('main.content-column h2, main.content-column p, main.content-column h3');
        let textToRead = "";

        mainContentBlocks.forEach(block => {
            // Verifica se o texto não pertence a blocos ocultos do accordion
            if (!block.closest('[hidden]')) {
                textToRead += block.innerText + ". ";
            }
        });

        if (textToRead.trim() !== "") {
            utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.lang = 'pt-BR';
            utterance.rate = 1.0; // Velocidade de leitura normal

            window.speechSynthesis.speak(utterance);
        }
    });

    document.getElementById('btn-tts-stop').addEventListener('click', () => {
        window.speechSynthesis.cancel();
    });
});