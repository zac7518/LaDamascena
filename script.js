// JSON

document.addEventListener('DOMContentLoaded', () => {
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('presentation-heading').textContent = data.presentation.heading;
            document.getElementById('presentation-description').textContent = data.presentation.description;
            document.getElementById('cv-button-text').textContent = data.presentation.cv_button_text;
            document.getElementById('competences-heading').textContent = data.competences.heading;
            document.getElementById('competences-description').textContent = data.competences.description;
            document.getElementById('preentreprise-heading').textContent = data.preentreprise.heading;
            document.getElementById('preentreprise-description').textContent = data.preentreprise.description;
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
});

// HEADER

fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

// FOOTER 

fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

// INDEX

// Présentation

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const presentationText = document.querySelector('.presentation_texte_titre');
        presentationText.classList.add('visible');
    }, 1000); 

    setTimeout(() => {
        const presentationSeparator = document.querySelector('.presentation_texte_separation');
        presentationSeparator.classList.add('visible');
    }, 2000); 

    setTimeout(() => {
        const presentationParagraph = document.querySelector('.presentation_texte_paragraphe');
        presentationParagraph.classList.add('visible');
    }, 3000); 
});

function initScrollReveal() {
    document.querySelectorAll('.avis_card').forEach((card, index) => {
        if (!card.classList.contains('scroll-reveal')) {
            card.classList.add('scroll-reveal');
        }
        if (!card.dataset.revealDelay) {
            card.dataset.revealDelay = 300 + index * 80;
        }
    });

    document.querySelectorAll('.carte_texte').forEach(card => {
        if (!card.classList.contains('scroll-reveal')) {
            card.classList.add('scroll-reveal');
        }
        if (!card.dataset.revealDelay) {
            card.dataset.revealDelay = 200;
        }
    });

    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const element = entry.target;
            const delay = parseInt(element.dataset.revealDelay, 10) || 0;
            setTimeout(() => {
                element.classList.add('visible');
            }, delay);
            obs.unobserve(element);
        });
    }, {
        threshold: 0.2,
    });

    revealElements.forEach((element, index) => {
        if (!element.dataset.revealDelay) {
            element.dataset.revealDelay = index * 100;
        }
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', initScrollReveal);

// Carrousel infini fluide

let track;
let scrollAmount = 0;
let paused = false;
const SCROLL_SPEED = 1; // ajuster la vitesse ici (pixels par frame)
let loopWidth = 0;
let platsData = [];

function smoothScroll() {
    if (!track) return requestAnimationFrame(smoothScroll);

    if (!paused) {
        scrollAmount -= SCROLL_SPEED;
        if (Math.abs(scrollAmount) >= loopWidth) {
            scrollAmount += loopWidth;
        }
        track.style.transform = `translateX(${scrollAmount}px)`;
    }

    requestAnimationFrame(smoothScroll);
}

document.addEventListener('DOMContentLoaded', () => {
    // Charger les données des plats
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            platsData = data.plats || [];
            initCarousel();
        })
        .catch(error => console.error('Erreur lors du chargement des plats:', error));
});

function initCarousel() {
    track = document.querySelector('.galerie_carousel_track');

    if (!track) return;

    // Remplir les informations des plats
    const items = track.querySelectorAll('.galerie_carousel_item');
    items.forEach((item, index) => {
        const platIndex = index % platsData.length;
        const plat = platsData[platIndex];
        
        const nameEl = item.querySelector('.galerie_carousel_name');
        const descEl = item.querySelector('.galerie_carousel_description');
        
        if (nameEl) nameEl.textContent = plat.name;
        if (descEl) descEl.textContent = plat.description;
    });

    const originalItems = Array.from(track.children);
    if (originalItems.length === 0) return;

    // Dupliquer les éléments pour créer un défilement continu
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    loopWidth = track.scrollWidth / 2;
    track.style.willChange = 'transform';

    // Ajouter les événements hover sur chaque item
    const allItems = track.querySelectorAll('.galerie_carousel_item');
    allItems.forEach(item => {
        item.addEventListener('mouseenter', () => { paused = true; });
        item.addEventListener('mouseleave', () => { paused = false; });
    });

    track.addEventListener('touchstart', () => { paused = true; });
    track.addEventListener('touchend', () => { paused = false; });

    window.addEventListener('resize', () => {
        loopWidth = track.scrollWidth / 2;
    });

    setTimeout(() => {
        requestAnimationFrame(smoothScroll);
    }, 100);
}

