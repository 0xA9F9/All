const firebaseConfig = {
    apiKey: "AIzaSyCkvaWekEMMk0y43Nf744KRaH9QYd3Hj6I",
    authDomain: "test-71cc8.firebaseapp.com",
    databaseURL: "https://test-71cc8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-71cc8",
    storageBucket: "test-71cc8.appspot.com",
    messagingSenderId: "911748905714",
    appId: "1:911748905714:web:ad42c0b23920a5f9bd6e6b",
    measurementId: "G-FZ0SC6YJJB"
  }; 
import {
	initializeApp as e
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
	getAnalytics as t
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
	getDatabase as a,
	ref as s,
	push as n,
	onValue as m,
	remove as o
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
let app = e(firebaseConfig),
	analytics = t(app),
	database = a(),
	commentForm = document.getElementById("commentForm"),
	commentInput = document.getElementById("commentInput"),
	commentsBlock = document.getElementById("commentsBlock"),
	loadMoreButton = document.createElement("span");
loadMoreButton.textContent = "Еще", loadMoreButton.classList.add("load-more-button"), commentsBlock.after(loadMoreButton);
let comments = [],
	commentLimit = 10;

function displayComment(comment) {
    let div = document.createElement("div");
    div.classList.add("comment");

    let avatar = document.createElement("img");
    avatar.src = "img/ava.webp";
    avatar.alt = "pirate";
    div.appendChild(avatar);

    let nickname = document.createElement("span");
    nickname.textContent = "Pirate";
    nickname.classList.add("nickname");
    div.appendChild(nickname);

     let dateSpan = document.createElement("span");
    dateSpan.textContent = formatTimeDifference(comment.date);
    dateSpan.classList.add("date");
    div.appendChild(dateSpan);

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete", "mdi", "mdi-close");
    deleteButton.addEventListener("click", () => deleteComment(comment.key));
    div.appendChild(deleteButton);

    let textDiv = document.createElement("div");
    let textContent = comment.text.substring(0, 400);
    textDiv.innerHTML = parseCommentText(textContent);
    textDiv.classList.add("cmt");
    div.appendChild(textDiv);

    if (comment.text.length > 400) {
        let moreText = document.createElement("span");
        moreText.textContent = "... Читать дальше";
        moreText.addEventListener("click", () => {
            textDiv.innerHTML = parseCommentText(comment.text);
            moreText.style.display = "none";
        });
        moreText.classList.add("more-text");
        textDiv.appendChild(moreText);
    }

    commentsBlock.appendChild(div);
}

function displayComments() {
    commentsBlock.innerHTML = "";
    comments.slice(0, commentLimit).forEach(displayComment);
    commentLimit >= comments.length ? loadMoreButton.style.display = "none" : loadMoreButton.style.display = "inline";
}


function parseCommentText(e) {
    // Заменяем [hr] на <hr>
    e = e.replace(/\[hr\]/g, '<hr>');
    // Заменяем другие BB-коды
    e = (e = (e = e.replace(/\[right\]([\s\S]*?)\[\/right\]/g, '<div class="right">$1</div>')).replace(/\[center\]([\s\S]*?)\[\/center\]/g, '<div class="center">$1</div>')).replace(/\[img=([^\s]+)\s+w=(\d+)\s+h=(\d+)\]/g, '<img src="$1" alt="img" style="width: $2px; height: $3px;">');
    
    // Добавляем обработку списка
    e = e.replace(/\[_list([\s\S]*?)\]/g, function(match, p1) {
        // Убираем лишние пробелы в начале и конце строки
        var listItems = p1.trim().split('\n');
        var result = '<ul class="list">';
        listItems.forEach(function(item) {
            // Убираем лишние пробелы в начале и конце элемента списка
            var listItem = item.trim();
            // Добавляем элемент <li> с текстом элемента списка
            result += '<li>' + listItem + '</li>';
        });
        result += '</ul>';
        return result;
    });

    // Обработка блоков кода
e = e.replace(/\[code=(\w+)]([\s\S]*?)\[\/code]/g, function(match, lang, code) {
    return '<pre><span class="lang">' + lang + '</span> <code>' + code.trim() + '</code></pre>';
});

    // Обработка спойлеров
    e = e.replace(/\[spoiler=(.*?)\]([\s\S]*?)\[\/spoiler\]/g, function(match, title, content) {
        return '<div class="spoil"><div class="title">' + title + '</div><div class="content">' + content + '</div></div>';
    });

    // Обработка ссылок
    e = e.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/g, '<a href="$1" target="_blank">$2</a>');

    // Заменяем переносы строк на <br> после обработки списка и блоков кода
    e = e.replace(/\n/g, '<br>');

    return e;
}

document.addEventListener('click', function(event) {
    var target = event.target;
    if (target.classList.contains('title')) {
        target.classList.toggle('jez');
    }
});




function deleteComment(e) {
	let t = s(database, `comments/${e}`);
	o(t)
}

function formatTimeDifference(commentDate) {
    const now = new Date();
    const diff = now - new Date(commentDate);

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (months > 0) {
        return months === 1 ? "месяц назад" : `${months} месяца назад`;
    } else if (weeks > 0) {
        return weeks === 1 ? "неделю назад" : `${weeks} недели назад`;
    } else if (days > 0) {
        return days === 1 ? "вчера" : `${days} дня назад`;
    } else if (hours > 0) {
        return hours === 1 ? "час назад" : `${hours} часа назад`;
    } else if (minutes > 0) {
        return minutes === 1 ? "минуту назад" : `${minutes} минут назад`;
    } else if (seconds > 0) {
        return seconds === 1 ? "секунду назад" : `${seconds} секунд назад`;
    } else {
        return "только что";
    }
}


function sendComment(e) {
    if (e.text.trim() !== "") {
        let commentsRef = s(database, "comments");
        let commentWithDate = {
            text: e.text,
            date: (new Date()).toISOString() // ISO формат даты
        };
        n(commentsRef, commentWithDate);
    } else {
        alert("Пожалуйста, введите комментарий.");
    }
}

loadMoreButton.addEventListener("click", () => {
	commentLimit += 10, displayComments()
}), m(s(database, "comments"), snapshot => {
    comments = [];
    snapshot.forEach(childSnapshot => {
        let commentDate = new Date(childSnapshot.val().date); 
        let comment = {
            key: childSnapshot.key,
            text: childSnapshot.val().text,
            date: commentDate
        };
        comments.push(comment);
    });
    comments.reverse();
    displayComments();
}), commentForm.addEventListener("submit", e => {
	e.preventDefault();
	let t = commentInput.value.trim();
	"" !== t ? (sendComment({
		text: t
	}), commentInput.value = "") : alert("Пожалуйста, введите комментарий.")
});


let searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function() {
    let searchText = searchInput.value.toLowerCase();
    displayFilteredComments(searchText);
});

function displayFilteredComments(searchText) {
    let filteredComments = comments.filter(comment => comment.text.toLowerCase().startsWith(searchText));
    commentsBlock.innerHTML = "";
    filteredComments.slice(0, commentLimit).forEach(displayComment);
    commentLimit >= filteredComments.length ? loadMoreButton.style.display = "none" : loadMoreButton.style.display = "inline";
}
