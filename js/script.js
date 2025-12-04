document.addEventListener('DOMContentLoaded', () => {

    
    const resumenesData = [
        { title: 'Semana 1', images: ['Semana1.jpg', 'Semana1.1.jpg'] },
        { title: 'Semana 2', images: ['Semana2.jpg', 'Semana2.1.jpg'] },
        { title: 'Semana 3', images: ['Semana3.jpg', 'Semana3.1.jpg'] },
        { title: 'Semana 4', images: ['Semana4.jpg', 'Semana4.1.jpg'] },
        { title: 'Semana 5', images: ['Semana5.jpg', 'Semana5.1.jpg'] },
        { title: 'Semana 6', images: ['Semana6.jpg', 'Semana6.1.jpg'] },
        { title: 'Semana 7', images: ['Semana7.jpg'] },
        { title: 'Semana 8', images: ['Semana8.jpg', 'Semana8.1.jpg'] },
        { title: 'Semana 9', images: ['Semana9.jpg'] },
        { title: 'Semana 10', images: ['Semana10.jpg'] }
    ];

    const talleresData = [
        { title: 'Taller Semana 1', images: ['Taller1.jpg', 'Taller1.1.jpg', 'Taller1.2.jpg', 'Taller1.3.jpg', 'Taller1.4.jpg'] },
        { title: 'Taller Semana 2', images: ['Taller2.jpg', 'Taller2.1.jpg', 'Taller2.2.jpg', 'Taller2.3.jpg', 'Taller2.4.jpg'] },
        { title: 'Taller Semana 3', images: ['Taller3.jpg', 'Taller3.1.jpg', 'Taller3.2.jpg', 'Taller3.3.jpg', 'Taller3.4.jpg', 'Taller3.5.jpg', 'Taller3.6.jpg'] },
        { title: 'Taller Semana 4', images: ['Taller4.jpg'] },
        { title: 'Taller Semana 5', images: ['Taller5.jpg', 'Taller5.1.jpg', 'Taller5.2.jpg', 'Taller5.3.jpg', 'Taller5.4.jpg', 'Taller5.5.jpg', 'Taller5.6.jpg'] },
        { title: 'Taller Semana 6', images: ['Taller6.jpg', 'Taller6.1.jpg', 'Taller6.2.jpg', 'Taller6.3.jpg'] },
        { title: 'Taller Semana 7', images: ['Taller7.jpg', 'Taller7.1.jpg', 'Taller7.2.jpg', 'Taller7.3.jpg', 'Taller7.4.jpg', 'Taller7.5.jpg', 'Taller7.6.jpg', 'Taller7.7.jpg', 'Taller7.8.jpg', 'Taller7.9.jpg', 'Taller7.10.jpg'] },
        { title: 'Taller Semana 8', images: ['Taller8.jpg', 'Taller8.1.jpg', 'Taller8.2.jpg', 'Taller8.3.jpg', 'Taller8.4.jpg'] },
        { title: 'Taller Semana 9', images: ['Taller9.jpg', 'Taller9.1.jpg', 'Taller9.2.jpg', 'Taller9.3.jpg', 'Taller9.4.jpg', 'Taller9.5.jpg', 'Taller9.6.jpg', 'Taller9.7.jpg'] },
        { title: 'Taller Semana 10', images: ['Taller10.jpg', 'Taller10.1.jpg', 'Taller10.2.jpg', 'Taller10.3.jpg', 'Taller10.4.jpg', 'Taller10.5.jpg'] }
    ];

    let currentGalleryImages = []; 
    let currentIndex = 0;

    const galleryContainer = document.getElementById('gallery-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!galleryContainer) {
        return;
    }

    const path = window.location.pathname;
    let dataToLoad = [];
    let imageFolder = '';

    if (path.includes('resumenes.html')) {
        dataToLoad = resumenesData;
        imageFolder = 'resumenes';
    } else if (path.includes('talleres.html')) {
        dataToLoad = talleresData;
        imageFolder = 'talleres';
    }

    function loadGallery(data, folder) {
        galleryContainer.innerHTML = '';
        currentGalleryImages = [];

        data.forEach(group => {
            group.images.forEach(imgName => {
                currentGalleryImages.push(`assets/${folder}/${imgName}`);
            });
        });

        data.forEach(group => {
            const groupSection = document.createElement('section');
            groupSection.className = 'gallery-group';

            const groupTitle = document.createElement('h2');
            groupTitle.className = 'gallery-group-title';
            groupTitle.textContent = group.title;
            groupSection.appendChild(groupTitle);

            const gridDiv = document.createElement('div');
            gridDiv.className = 'image-grid';

            group.images.forEach(imgName => {
                const imgElement = document.createElement('img');
                const imgSrc = `assets/${folder}/${imgName}`;
                
                imgElement.src = imgSrc;
                imgElement.alt = imgName;
                imgElement.classList.add('thumbnail');

                imgElement.addEventListener('click', () => {
                    const index = currentGalleryImages.indexOf(imgSrc);
                    openLightbox(index);
                });

                gridDiv.appendChild(imgElement);
            });

            groupSection.appendChild(gridDiv);
            galleryContainer.appendChild(groupSection);
        });
    }

    function openLightbox(index) {
        if (index === -1) return;
        currentIndex = index;
        showImage(currentIndex);
        lightbox.style.display = 'flex';
        document.addEventListener('keydown', handleKeyPress);
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.removeEventListener('keydown', handleKeyPress);
    }

    function showImage(index) {
        currentIndex = index;
        
        lightboxImg.src = currentGalleryImages[index];

        prevBtn.style.display = (index === 0) ? 'none' : 'block';
        nextBtn.style.display = (index === currentGalleryImages.length - 1) ? 'none' : 'block';
    }

    function nextImage() {
        if (currentIndex < currentGalleryImages.length - 1) {
            showImage(currentIndex + 1);
        }
    }

    function prevImage() {
        if (currentIndex > 0) {
            showImage(currentIndex - 1);
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    if(prevBtn) {
        prevBtn.addEventListener('click', prevImage);
    }
    if(nextBtn) {
        nextBtn.addEventListener('click', nextImage);
    }

    if(lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    loadGallery(dataToLoad, imageFolder);

});