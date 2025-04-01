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
