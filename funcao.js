document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecionar elementos existentes
    const navContainer = document.querySelector('nav .container');
    
    if (!navContainer) {
        console.error("Erro: Não encontrei o container dentro da tag <nav>.");
        return;
    }

    // 2. Criar e Injetar o Botão Hambúrguer
    const toggleBtn = document.createElement('div');
    toggleBtn.className = 'menu-toggle';
    toggleBtn.innerHTML = '<span></span><span></span><span></span>';
    navContainer.appendChild(toggleBtn);

    // 3. Criar e Injetar o Overlay do Menu
    const overlay = document.createElement('div');
    overlay.id = 'mobile-overlay';
    overlay.innerHTML = `
        <a href="#sobre">Sobre</a>
        <a href="#servicos">Serviços</a>
        <a href="#projetos">Projetos</a>
        <a href="#contato">Contato</a>
    `;
    document.body.appendChild(overlay);

    // 4. Lógica de Abrir/Fechar Menu
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('open');
        overlay.classList.toggle('open');
        // Bloqueia o scroll do fundo quando o menu está aberto
        document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : 'auto';
    });

    // Fechar menu ao clicar em qualquer link dele
    overlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });

    // 5. Lógica do Botão Voltar ao Topo
    const btt = document.getElementById('backToTop'); // Certifique-se que o ID no HTML é este
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            btt?.classList.add('show');
        } else {
            btt?.classList.remove('show');
        }
    });
});

// Função para o botão do topo (chamada via onclick no HTML)
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
            const btn = document.getElementById('backToTop');
            if (window.scrollY > 400) {
                btn.classList.remove('opacity-0', 'invisible');
                btn.classList.add('opacity-100', 'visible');
            } else {
                btn.classList.add('opacity-0', 'invisible');
                btn.classList.remove('opacity-100', 'visible');
            }
        });

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const successAlert = document.getElementById('success-message');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    submitBtn.disabled = true;
    submitBtn.innerText = "ENVIANDO...";
    submitBtn.style.opacity = "0.5";

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            contactForm.reset();
            submitBtn.classList.add('hidden');
            successAlert.classList.remove('hidden');
        } else {
            throw new Error('Erro no servidor');
        }
    } catch (error) {
        alert("Opa! Algo deu errado. Tente enviar diretamente para thiago.cortez@edu.senai.br");
        submitBtn.disabled = false;
        submitBtn.innerText = "TENTAR NOVAMENTE";
        submitBtn.style.opacity = "1";
    }
});