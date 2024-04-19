document.addEventListener("DOMContentLoaded",function(){let e=document.querySelector(".in");e.addEventListener("click",function(){this.classList.toggle("active")})});const mode=document.getElementById("mode");function toggleMode(){let e=document.documentElement;"light"===e.getAttribute("data-mode")?(e.setAttribute("data-mode","dark"),localStorage.setItem("theme","dark")):(e.setAttribute("data-mode","light"),localStorage.setItem("theme","light"))}function initTheme(){let e=localStorage.getItem("theme");document.documentElement.setAttribute("data-mode",e||"light")}window.addEventListener("DOMContentLoaded",initTheme),mode.addEventListener("click",toggleMode);

function toggleVisibility(element) {
  if (element.classList.contains('hide')) {
    element.classList.remove('hide');
    element.classList.add('show');
  } else {
    element.classList.remove('show');
    element.classList.add('hide');
  }
}