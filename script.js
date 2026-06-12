document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SISTEMA INTERATIVO DE ACCORDIONS
    // ==========================================
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const item = this.parentElement;
            const content = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Fecha outros blocos para visual minimalista organizado
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                    otherItem.querySelector('.accordion-content').setAttribute('aria-hidden', 'true');
                }
            });
            
            // Chaveamento dinâmico
            if (isExpanded) {
                item.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
                content.setAttribute('aria-hidden', 'true');
            } else {
                item.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + "px";
                content.setAttribute('aria-hidden', 'false');
            }
        });
    });

    // ==========================================
    // 2. FORMULÁRIO DE INSCRIÇÃO NO SEMINÁRIO
    // ==========================================
    const webinarForm = document.getElementById('webinar-form');
    const formFeedback = document.getElementById('form-feedback');
    
    if (webinarForm) {
        webinarForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            
            formFeedback.textContent = `Processando inscrição de ${name}...`;
            formFeedback.className = "form-feedback success";
            formFeedback.classList.remove('hidden');
            
            setTimeout(() => {
                formFeedback.textContent = `Inscrição Confirmada! O link exclusivo do seminário foi enviado para: ${email}.`;
                webinarForm.reset();
            }, 1200);
        });
    }

    // ==========================================
    // 3. ÁREA INTERATIVA DE COMENTÁRIOS DO LEITOR
    // ==========================================
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    
    if (commentForm && commentsList) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const commentText = document.getElementById('comment-text').value.trim();
            
            if (commentText) {
                const commentItem = document.createElement('div');
                commentItem.className = 'comment-item';
                
                const metaDiv = document.createElement('div');
                metaDiv.className = 'comment-meta';
                metaDiv.innerHTML = `<strong>Leitor Participante</strong> • Agora mesmo`;
                
                const textDiv = document.createElement('div');
                textDiv.className = 'comment-text';
                textDiv.textContent = commentText;
                
                commentItem.appendChild(metaDiv);
                commentItem.appendChild(textDiv);
                
                commentsList.insertBefore(commentItem, commentsList.firstChild);
                commentForm.reset();
            }
        });
    }

    // ==========================================
    // 4. MECANISMO DO PAINEL DE ACESSIBILIDADE
    // ==========================================
    const widgetToggle = document.getElementById('widget-toggle-btn');
    const widgetMenu = document.getElementById('widget-menu-box');
    
    widgetToggle.addEventListener('click', () => {
        const isHidden = widgetMenu.classList.contains('hidden');
        if (isHidden) {
            widgetMenu.classList.remove('hidden');
            widgetToggle.setAttribute('aria-expanded', 'true');
        } else {
            widgetMenu.classList.add('hidden');
            widgetToggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('click', (e) => {
        if (!widgetToggle.contains(e.target) && !widgetMenu.contains(e.target)) {
            widgetMenu.classList.add('hidden');
            widgetToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Redimensionamento de fontes via base rem
    let currentFontSizePercent = 100;
    const bodyEl = document.body;
    
    document.getElementById('btn-increase-font').addEventListener('click', () => {
        if (currentFontSizePercent < 140) {
            currentFontSizePercent += 10;
            bodyEl.style.fontSize = `${currentFontSizePercent}%`;
        }
    });
    
    document.getElementById('btn-decrease-font').addEventListener('click', () => {
        if (currentFontSizePercent > 80) {
            currentFontSizePercent -= 10;
            bodyEl.style.fontSize = `${currentFontSizePercent}%`;
        }
    });

    // Chaveamento Dark Mode / Light Mode
    document.getElementById('btn-toggle-theme').addEventListener('click', () => {
        bodyEl.classList.toggle('dark-mode');
    });

    // ==========================================
    // 5. LEITURA POR VOZ NATIIVA (SPEECH SYNTHESIS API)
    // ==========================================
    const btnStartVoice = document.getElementById('btn-start-voice');
    const btnStopVoice = document.getElementById('btn-stop-voice');
    let speechUtterance = null;
    
    btnStartVoice.addEventListener('click', () => {
        window.speechSynthesis.cancel(); // Evita sobreposições de áudio
        
        // Isolamento de leitura: Captura estritamente o conteúdo principal (exclui formulários e botões)
        const contentArea = document.getElementById('main-editorial-content');
        if (!contentArea) return;
        
        const textToRead = contentArea.innerText || contentArea.textContent;
        
        speechUtterance = new SpeechSynthesisUtterance(textToRead);
        speechUtterance.lang = 'pt-BR';
        speechUtterance.rate = 1.05;
        
        speechUtterance.onstart = () => {
            btnStartVoice.textContent = "🎙️ Lendo Conteúdo...";
            btnStartVoice.style.backgroundColor = "var(--color-green)";
            btnStartVoice.style.color = "white";
        };
        
        speechUtterance.onend = () => { resetVoiceButtonState(); };
        speechUtterance.onerror = () => { resetVoiceButtonState(); };

        window.speechSynthesis.speak(speechUtterance);
    });

    btnStopVoice.addEventListener('click', () => {
        window.speechSynthesis.cancel();
        resetVoiceButtonState();
    });

    function resetVoiceButtonState() {
        btnStartVoice.textContent = "🔊 Iniciar Leitura por Voz";
        btnStartVoice.style.backgroundColor = "var(--bg-light)";
        btnStartVoice.style.color = "inherit";
    }
});