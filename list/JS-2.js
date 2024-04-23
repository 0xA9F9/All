
document.addEventListener("DOMContentLoaded", function () {
    var menu = `
        <div id="click-menu" class="click-menu" style="position: fixed; padding: 10px; border-radius: 5px; display: none;"></div>
    `;
    document.body.insertAdjacentHTML("beforeend", menu);

    document.addEventListener("click", function (e) {
        var clickMenu = document.getElementById("click-menu");
        if (e.button !== 2 && window.getComputedStyle(clickMenu).display === "block") {
            clickMenu.style.display = "none";
        }
    });

    document.documentElement.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        var clickMenu = document.getElementById("click-menu");
        clickMenu.style.display = "block";
        clickMenu.style.left = e.clientX + "px";
        clickMenu.style.top = e.clientY + "px";
    });
});


document.addEventListener("DOMContentLoaded",function(){var n=document.getElementById("searchInput");n.addEventListener("focus",function(){this.classList.add("on")}),n.addEventListener("blur",function(){this.classList.remove("on")})});
