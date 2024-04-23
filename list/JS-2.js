document.addEventListener("DOMContentLoaded",function(){var e=`
        <div id="click-menu" class="click-menu" style="padding: 10px; border-radius: 5px;">
            не трогай код!
        </div>
    `;document.body.insertAdjacentHTML("beforeend",e),document.addEventListener("click",function(e){var t=document.getElementById("click-menu");2!==e.button&&"block"===t.style.display&&(t.style.display="none")}),document.documentElement.addEventListener("contextmenu",function e(t){t.preventDefault();var n=document.getElementById("click-menu");n.style.display="block",n.style.left=t.clientX+"px",n.style.top=t.clientY+"px"})});

document.addEventListener("DOMContentLoaded",function(){var n=document.getElementById("searchInput");n.addEventListener("focus",function(){this.classList.add("on")}),n.addEventListener("blur",function(){this.classList.remove("on")})});
