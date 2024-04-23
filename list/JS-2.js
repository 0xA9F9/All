      function changeLanguage(lang) {
        var clickMenu = document.getElementById("click-menu");
        var ruButton = document.getElementById("ruButton");
        var enButton = document.getElementById("enButton");

        if (lang === 'ru') {
            clickMenu.textContent = "не трогай код!";
            ruButton.classList.add("active");
            enButton.classList.remove("active");
        } else if (lang === 'en') {
            clickMenu.textContent = "don't touch the code!";
            enButton.classList.add("active");
            ruButton.classList.remove("active");
        }
    }

document.addEventListener("DOMContentLoaded",function(){var e=`
        <div id="click-menu" class="click-menu" style="padding: 10px; border-radius: 5px;"></div>
    `;document.body.insertAdjacentHTML("beforeend",e),document.addEventListener("click",function(e){var t=document.getElementById("click-menu");2!==e.button&&"block"===t.style.display&&(t.style.display="none")}),document.documentElement.addEventListener("contextmenu",function e(t){t.preventDefault();var n=document.getElementById("click-menu");n.style.display="block",n.style.left=t.clientX+"px",n.style.top=t.clientY+"px"})});

document.addEventListener("DOMContentLoaded",function(){var n=document.getElementById("searchInput");n.addEventListener("focus",function(){this.classList.add("on")}),n.addEventListener("blur",function(){this.classList.remove("on")})});
