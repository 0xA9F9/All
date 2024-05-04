document.addEventListener("DOMContentLoaded", function() {
    var e = document.querySelector(".comments"),
        t = document.getElementById("login"),
        n = t.querySelector("input"),
        r = t.querySelector(".q"),
        o = document.getElementById("logout");

    function addRedShadow() {
        n.style.boxShadow = "red 0px 0px 0px 2px";
    }

    function removeRedShadow() {
        n.style.boxShadow = ""; 
    }

    localStorage.getItem("isLoginProcessed") ? (t.remove(), document.querySelector('div[style="padding: .555em;width: 100%;"]').appendChild(e)) : (e.remove(), r ? r.addEventListener("click", function(r) {
        r.preventDefault();

        if (n.value.toLowerCase() !== "0xa9f9") {
            addRedShadow();
        } else {
            removeRedShadow(); 
        }
        "0xa9f9" === n.value.toLowerCase() && (t.remove(), document.querySelector('div[style="padding: .555em;width: 100%;"]').appendChild(e), localStorage.setItem("isLoginProcessed", !0), location.reload())
    }) : console.error("Кнопка не найдена")), o ? o.addEventListener("click", function() {
        localStorage.removeItem("isLoginProcessed"), location.reload()
    }) : console.error("Кнопка выхода не найдена")
}), document.addEventListener("DOMContentLoaded", function() {
    var e = document.querySelector(".comments"),
        t = document.getElementById("logout");
    !e && t && t.remove()
}), document.addEventListener("DOMContentLoaded", function() {
    var e = document.querySelector(".comments"),
        t = document.querySelector(".menu");
    e || (t.classList.remove("menu"), t.classList.add("toggle"))
});

document.addEventListener("DOMContentLoaded", function() {
    var main = document.querySelector(".main");
    var comments = document.querySelector(".comments");

    if (main && comments) {
        main.appendChild(comments);
    }
});
