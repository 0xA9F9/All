
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


var goTop = document.createElement("button");
goTop.classList.add("mdi", "mdi-arrow-up-bold-circle");
goTop.id = "goTop";
goTop.style.display = "none";
goTop.style.position = "fixed";
goTop.style.bottom = "20px";
goTop.style.right = "20px"; 
goTop.style.fontSize = "18px";
goTop.addEventListener("click", scrollToTop);
document.body.appendChild(goTop);


window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goTop.style.display = "block";
  } else {
    goTop.style.display = "none";
  }
};

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0; 



//ripple

document.addEventListener('DOMContentLoaded', function() {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        button.addEventListener('click', createRipple);
      });
    });

    function createRipple(event) {
      const button = event.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
      circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
      circle.classList.add("ripple");

      const ripple = button.getElementsByClassName("ripple")[0];

      if (ripple) {
        ripple.remove();
      }

      button.appendChild(circle);
    }
