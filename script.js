// Header
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

// Footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });


// Slides compétences
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

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
})