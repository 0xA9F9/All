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
	commentLimit = 5;

function displayComment(comment) {
    let div = document.createElement("div");
    div.classList.add("comment");

    let avatar = document.createElement("img");
    avatar.src = "/img/ava.webp";
    avatar.alt = "pirate";
    div.appendChild(avatar);

    let nickname = document.createElement("span");
    nickname.textContent = "0xA9F9";
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
    textDiv.classList.add("cmt");

    // Проверяем, содержит ли текст комментария изображение с кодированными данными
    if (comment.text.includes("data:image")) {
        textDiv.innerHTML = parseCommentText(comment.text);
    } else {
        let textContent = comment.text.substring(0, 50000);
        textDiv.innerHTML = parseCommentText(textContent);

        if (comment.text.length > 50000) {
            let moreText = document.createElement("span");
            moreText.textContent = "... Читать дальше";
            moreText.addEventListener("click", () => {
                textDiv.innerHTML = parseCommentText(comment.text);
                moreText.style.display = "none";
            });
            moreText.classList.add("more-text");
            textDiv.appendChild(moreText);
        }
    }

    div.appendChild(textDiv);

 div.querySelectorAll('code').forEach((block) => {
        hljs.highlightBlock(block);
    });

    commentsBlock.appendChild(div);


}


function displayComments() {
    commentsBlock.innerHTML = "";
    let reversedComments = comments.slice(0, commentLimit).reverse(); // Переворачиваем массив комментариев
    reversedComments.forEach(displayComment); // Отображаем комментарии в обратном порядке
    commentLimit >= comments.length ? loadMoreButton.style.display = "none" : loadMoreButton.style.display = "inline";
}



function parseCommentText(e) {
    // Сохраняем блоки кода с плейсхолдерами
    const codeBlocks = [];
    e = e.replace(/\[code=(\w+)]([\s\S]*?)\[\/code]/g, function(match, lang, code) {
        // Убираем внутренние блоки кода из блока кода
        code = code.replace(/\[code=(\w+)]([\s\S]*?)\[\/code]/g, function(innerMatch, innerLang, innerCode) {
            return '[code=' + innerLang + ']' + innerCode + '[/code]';
        });
        codeBlocks.push({lang, code});
        return '\x01' + (codeBlocks.length - 1) + '\x01';
    });

    // Обработка остальных BB-кодов
    e = e.replace(/\[hr\]/g, '<hr>');
    e = (e = (e = e.replace(/\[right\]([\s\S]*?)\[\/right\]/g, '<div class="right">$1</div>')).replace(/\[center\]([\s\S]*?)\[\/center\]/g, '<div class="center">$1</div>')).replace(/\[img=([^\s]+)(?:\s+w=(\d+))?(?:\s+h=(\d+))?\]/g, function(match, src, width, height) {
        if (width && height) {
            return '<img src="' + src + '" alt="img" style="width: ' + width + 'px; height: ' + height + 'px;">';
        } else {
            return '<img src="' + src + '" alt="img">';
        }
    });
    // Добавляем обработку списка
    e = e.replace(/\[_list([\s\S]*?)\]/g, function(match, p1) {
        var listItems = p1.trim().split('\n');
        var result = '<ul class="list">';
        listItems.forEach(function(item) {
            var listItem = item.trim();
            result += '<li>' + listItem + '</li>';
        });
        result += '</ul>';
        return result;
    });

    // Обработка спойлеров
    e = e.replace(/\[spoiler=(.*?)\]([\s\S]*?)\[\/spoiler\]/g, function(match, title, content) {
        return '<div class="spoil"><div class="title">' + title + '</div><div class="content">' + content + '</div></div>';
    });

    // Обработка ссылок
    e = e.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/g, '<a href="$1" target="_blank">$2</a>');

    // Заменяем переносы строк на <br> после обработки списка и блоков кода
    e = e.replace(/\n/g, '<br>');

    // Вставляем блоки кода обратно на место
    e = e.replace(/\x01(\d+)\x01/g, function(match, index) {
        const block = codeBlocks[index];
        return '<pre><span class="lang">' + block.lang + '</span> <code class="language-' + block.lang + '">' + block.code.trim() + '</code></pre>';
    });

    return e;
}



document.addEventListener('click', function(event) {
    var target = event.target;
    var titleElement = target.closest('.title');
    var isInsidePreview = target.closest('#preview');

    if (titleElement && !isInsidePreview) {
        titleElement.classList.toggle('jez');
    }
});

document.getElementById('preview').addEventListener('click', function(event) {
    var target = event.target;
    var titleElement = target.closest('.title');

    if (titleElement) {
        titleElement.classList.toggle('jez');
    }
});




let isPreviewVisible = false; // Переменная для отслеживания состояния предпросмотра

document.getElementById('b-preview').addEventListener('click', function() {
    const commentInput = document.getElementById('commentInput');
    const previewBlock = document.getElementById('preview');

    // Если предпросмотр не видим, показать предпросмотр и скрыть текстовое поле
    if (!isPreviewVisible) {
        const commentText = commentInput.value;
        const processedCommentText = parseCommentText(commentText);
        previewBlock.innerHTML = processedCommentText;
        commentInput.style.display = 'none';
        previewBlock.style.display = 'block';
        isPreviewVisible = true;
    } else { // Если предпросмотр видим, скрыть его и показать текстовое поле
        commentInput.style.display = 'block';
        previewBlock.style.display = 'none';
        isPreviewVisible = false;
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
    const years = Math.floor(days / 365);

    if (years > 0) {
        return years === 1 ? "год назад" : `${years} ${years % 10 === 2 || years % 10 === 3 || years % 10 === 4 ? 'года' : 'лет'} назад`;
    } else if (months > 0) {
        return months === 1 ? "месяц назад" : `${months} ${months % 10 === 1 ? 'месяц' : 'месяца'} назад`;
    } else if (weeks > 0) {
        return weeks === 1 ? "неделю назад" : `${weeks} ${weeks % 10 === 1 ? 'неделю' : 'недели'} назад`;
    } else if (days > 0) {
        return days === 1 ? "вчера" : `${days} ${days % 10 === 1 ? 'день' : 'дня'} назад`;
    } else if (hours > 0) {
        return hours === 1 ? "час назад" : `${hours} ${hours % 10 === 1 ? 'час' : 'часа'} назад`;
    } else if (minutes > 0) {
        return minutes === 1 ? "минуту назад" : `${minutes} ${minutes % 10 === 1 ? 'минуту' : 'минуты'} назад`;
    } else if (seconds > 0) {
        return seconds === 1 ? "секунду назад" : `${seconds} ${seconds % 10 === 1 ? 'секунду' : 'секунды'} назад`;
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
    let filteredComments = comments.filter(comment => {
        // Создаем регулярное выражение для поиска текста внутри BB-кода
        let regex = new RegExp(searchText, 'i'); // 'i' флаг для игнорирования регистра

        // Проверяем, соответствует ли текст комментария поисковому запросу
        return regex.test(comment.text.toLowerCase());
    });

    commentsBlock.innerHTML = "";
    filteredComments.slice(0, commentLimit).forEach(displayComment);
    commentLimit >= filteredComments.length ? loadMoreButton.style.display = "none" : loadMoreButton.style.display = "inline";
}


// Функция для вставки текста в поле ввода
function insertTextAtCursor(text) {
    const textarea = document.getElementById("commentInput");
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const beforeText = textarea.value.substring(0, startPos);
    const afterText = textarea.value.substring(endPos, textarea.value.length);
    textarea.value = beforeText + text + afterText;
    textarea.selectionStart = startPos + text.length;
    textarea.selectionEnd = startPos + text.length;
    textarea.focus();
}

// Обработчик нажатия клавиш
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "o") {
       event.preventDefault();
        const textarea = document.getElementById("commentInput");
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const selectedText = textarea.value.substring(startPos, endPos);
        insertTextAtCursor("[code=code]" + selectedText + "[/code]");
    }
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        const textarea = document.getElementById("commentInput");
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const selectedText = textarea.value.substring(startPos, endPos);
        insertTextAtCursor("[spoiler]" + selectedText + "[/spoiler]");
    }
});

