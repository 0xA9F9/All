
function showModal(imageSrc, altText) {
    var modal = document.createElement('div');
    modal.className = 'full modal';
    
    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    var closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });


    var modalImg = document.createElement('img');
    modalImg.src = imageSrc;
    modalImg.alt = altText;
    modalImg.className = 'full-poster'; 
    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalImg);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    modal.style.display = 'flex';
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('poster')) {
        var imageSrc = event.target.src;
        var altText = event.target.alt;
        showModal(imageSrc, altText);
    }
});

