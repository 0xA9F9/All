let currentLanguage="ru",currentStatus="",animeListData=null,currentSearchResults=[];async function loadJSON(e){try{let t=await fetch(e,{headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"}});if(!t.ok)throw Error("Network response was not ok");return t.json()}catch(a){console.error("There was a problem with the fetch operation:",a)}}function convertQuotes(e){return e.replace(/"([^"]*)"/g,"\xab$1\xbb")}async function parseJSONAndDisplay(e){document.getElementById("my-anime-list").innerHTML='<span class="mdi mdi-loading"></span>';let t=await loadJSON("https://shikimori.one/api/users/1383110/anime_rates?limit=5000");animeListData=t.map(e=>(e.anime.name=convertQuotes(e.anime.name),e.anime.russian=convertQuotes(e.anime.russian),e));let a=currentSearchResults.length>0?currentSearchResults:animeListData;displayAnimeList(a,e)}async function displayAnimeList(e,t){e.sort((e,a)=>{let s="en"===t?e.anime.name:e.anime.russian,n="en"===t?a.anime.name:a.anime.russian;return s.localeCompare(n)});let a="";e.forEach((e,s)=>{let n="en"===t?e.anime.name:e.anime.russian,i=n.length>50?n.substring(0,50)+"...":n,r=e.anime.image.original,l="",o="";if("watching"===e.status)l="en"===t?"Watching":"Смотрю",o=` (${e.episodes} ${"en"===t?"episodes watched":"эпизодов просмотренно"})`;else switch(e.status){case"on_hold":l="en"===t?"On Hold":"Отложено";break;case"dropped":l="en"===t?"Dropped":"Брошено";break;case"completed":l="en"===t?"Completed":"Просмотрено";break;case"planned":l="en"===t?"Planned":"Запланировано";break;default:l="en"===t?"Unknown":"Неизвестно"}let c=getStatusClass(e.status);if(i&&(""===currentStatus||e.status===currentStatus)){let d=n.replace(/'/g,"\\'");a+=`<div class="anime"> <span class="num">${s+1}</span> <img class="poster" src="https://shikimori.one${r}" alt="${i}" /> <div class="text"> <a href="#" onclick="showKodikPlayer(${e.anime.id}, '${d}')" onmouseover="this.textContent='${d}'" onmouseout="this.textContent='${i}'"> ${i} </a> <sup class="${c}" style="display:block">${l}${o}</sup> </div> </div>`}}),document.getElementById("my-anime-list").innerHTML=a}function getStatusClass(e){switch(e){case"on_hold":return"status-on-hold pik";case"dropped":return"status-dropped pik";case"completed":return"status-completed pik";case"watching":return"status-watching pik";case"planned":return"status-planned pik";default:return"status-unknown pik"}}async function showKodikPlayer(e,t){let a=document.getElementById("ruButton"),s=a.classList.contains("active")?"ru":"en",n=`https://kodikapi.com/search?token=50e058ac7c2b71a73ee87e4fea333544&types=anime-serial,anime&shikimori_id=${e}`;fetch(n).then(e=>e.json()).then(e=>{if(0===e.results.length){let a=document.createElement("div");a.classList.add("error","modal"),a.innerHTML=`
                    <div class="modal-content">
                        <div class="header">
                            <h4 class="mdi mdi-movie-search"> ${"ru"===s?"Не найдено":"Not found"}</h4>
                            <span class="close" onclick="closeModal()">&times;</span>
                        </div>
                        <div class="modal-body">
                            ${"ru"===s?"Эпизоды не найдены в базе данных.":"Episodes not found in the database."}
                        </div>
                    </div>`,document.body.appendChild(a),a.style.display="flex";return}let n=e.results[0],i=`${n.link}`,r=document.createElement("div");r.classList.add("modal"),r.innerHTML=`
                <div class="modal-content">
                    <div class="header"> <h4 class="mdi mdi-monitor-eye"> ${t}</h4><span class="close" onclick="closeModal()">&times;</span></div>
                    <br> <iframe src="${i}" frameborder="0" allowfullscreen style="width: var(--max); height: var(--max); --max:100%;"></iframe>
                </div>`,document.body.appendChild(r),r.style.display="flex"})}

function changeLanguage(lang) {
    currentLanguage = lang;

    var clickMenu = document.getElementById("click-menu");
    var ruButton = document.getElementById("ruButton");
    var enButton = document.getElementById("enButton");
    var footerText = document.getElementById("footerText");

    if (lang === 'ru') {
        clickMenu.textContent = "не трогай код!";
        footerText.textContent = "© 2024 Все права защищены.";
        ruButton.classList.add("active");
        enButton.classList.remove("active");
    } else if (lang === 'en') {
      clickMenu.textContent = "don't touch the code!";
        footerText.textContent = "© 2024 All rights reserved.";
        enButton.classList.add("active");
        ruButton.classList.remove("active");
    }

    var searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.setAttribute("placeholder", lang === 'en' ? "Search..." : "Поиск...");
    }

    // Обновление отображения списка аниме
    var s = currentSearchResults.length > 0 ? currentSearchResults : animeListData;
    displayAnimeList(s, lang);
}



function closeModal() {
    let e = document.querySelector(".modal");
    e && e.parentNode.removeChild(e)
}
async function searchAnime(e) {
    searchQuery = e;
    let t = animeListData.filter(t => {
        let a = t.anime.russian.toLowerCase(),
            s = t.anime.name.toLowerCase();
        return a.includes(e.toLowerCase()) || s.includes(e.toLowerCase())
    });
    currentSearchResults = t, displayAnimeList(t, currentLanguage)
}
document.querySelectorAll(".status-btn").forEach(e => {
    e.addEventListener("click", () => {
        let t = e.dataset.status,
            a = e.classList.contains("active");
        document.querySelectorAll(".status-btn").forEach(t => {
            t !== e && t.classList.remove("active")
        }), a ? (e.classList.remove("active"), currentStatus = "") : (e.classList.add("active"), currentStatus = t), parseJSONAndDisplay(currentLanguage)
    })
}), window.onclick = function(e) {
    let t = document.getElementById("myModal");
    e.target == t && closeModal()
}, window.onload = function() {
    let e = navigator.language || navigator.userLanguage;
    e.startsWith("ru") ? changeLanguage("ru") : changeLanguage("en")
}, parseJSONAndDisplay(currentLanguage), document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".in").addEventListener("click", function() {
        this.classList.toggle("active")
    })
});
const mode = document.getElementById("mode");

function toggleMode() {
    let e = document.documentElement;
    "light" === e.getAttribute("data-mode") ? (e.setAttribute("data-mode", "dark"), localStorage.setItem("theme", "dark")) : (e.setAttribute("data-mode", "light"), localStorage.setItem("theme", "light"))
}

function initTheme() {
    let e = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-mode", e || "light")
}

function toggleVisibility(e) {
    e.classList.contains("hide") ? (e.classList.remove("hide"), e.classList.add("show")) : (e.classList.remove("show"), e.classList.add("hide"))
}
window.addEventListener("DOMContentLoaded", initTheme), mode.addEventListener("click", toggleMode);
