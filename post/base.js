let firebaseConfig = {
	apiKey: "AIzaSyDFLbXFdvOnuqmBQbaLlQl5H-T4wdjHTvM",
  authDomain: "vxwvxwvxwvxwvxwvxw.firebaseapp.com",
  databaseURL: "https://vxwvxwvxwvxwvxwvxw-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vxwvxwvxwvxwvxwvxw",
  storageBucket: "vxwvxwvxwvxwvxwvxw.appspot.com",
  messagingSenderId: "634499836834",
  appId: "1:634499836834:web:bd382166da1ddaf707a0fb",
  measurementId: "G-74DV8QY73V"
};
import {
	initializeApp as e
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
	getAnalytics as t
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
	getDatabase as n,
	ref as a,
	push as i,
	onValue as l,
	remove as s,
	update as o
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
let app = e(firebaseConfig),
	analytics = t(app),
	database = n(),
	commentForm = document.getElementById("commentForm"),
	commentInput = document.getElementById("commentInput"),
	commentsBlock = document.getElementById("commentsBlock"),
	loadMoreButton = document.createElement("span");
loadMoreButton.textContent = "Еще", loadMoreButton.classList.add("load-more-button"), document.querySelector(".main").insertBefore(loadMoreButton, commentsBlock);
let comments = [],
	commentLimit = 5;

function displayComment(e) {
	let t = document.createElement("div");
	t.id = `comment-${e.key}`, t.classList.add("comment"), t.setAttribute("data-key", e.key);
	let n = document.createElement("div");
	if (n.classList.add("appear"), !document.querySelector("form.login")) {
		let a = document.createElement("button");
		a.classList.add(...["edit-button", "mdi", "mdi-lead-pencil"]), a.addEventListener("click", () => displayEditForm(e.key)), n.appendChild(a);
		let i = document.createElement("button");
		i.classList.add("delete", "mdi", "mdi-close"), i.addEventListener("click", () => deleteComment(e.key)), n.appendChild(i)
	}
	t.appendChild(n);
	let l = document.createElement("img");
	l.src = "/img/ava.webp", l.alt = "pirate", t.appendChild(l);
	let s = document.createElement("span");
	s.textContent = "0xA9F9", s.classList.add("nickname"), t.appendChild(s);
	let o = document.createElement("span");
	o.textContent = formatTimeDifference(e.date), o.classList.add("date"), t.appendChild(o);
	let r = document.createElement("div");
	if (r.classList.add("cmt"), r.innerHTML = parseCommentText(e.text), t.appendChild(r), e.edited) {
		let c = document.createElement("span");
		c.classList.add("edited");
		let d = new Date(e.edited);
		c.innerHTML = `<span class="e-date">${d.toLocaleString()}</span> <span class="mdi mdi-lead-pencil"></span>`, t.appendChild(c)
	}
	if (t.querySelectorAll("code").forEach(e => {
			hljs.highlightBlock(e)
		}), commentsBlock.appendChild(t), r.clientHeight > 200) {
		let m = document.createElement("div");
		m.innerHTML = '<span class="mdi mdi-arrow-down">развернуть</span>', m.addEventListener("click", () => {
			r.style.maxHeight = "none", m.style.display = "none"
		}), m.classList.add("more-text"), t.appendChild(m), r.style.maxHeight = "200px", r.style.overflow = "hidden"
	}
}

function editComment(e, t) {
	let n = a(database, `comments/${e}`);
	o(n, {
		text: t,
		edited: new Date().toLocaleString()
	})
}

function displayEditForm(e) {
	let t = document.getElementById(`comment-${e}`),
		n = t.querySelector(".cmt").innerHTML,
		a = document.createElement("form");
	a.innerHTML = `
          <textarea rows="10" name="text" id="editCommentText" style="width: 100%; resize: block; overflow-wrap: break-word; padding: 5px; background: var(--edit-t); border-radius:3px;">${n}</textarea>
        <div class="b-edite">
            <button type="submit">Сохранить</button>
            <button type="button" class="cancelEdit">Отмена</button>
        </div>
    `, t.querySelectorAll(".comment > *").forEach(e => {
		e.style.display = "none"
	}), t.appendChild(a), a.addEventListener("submit", function(n) {
		n.preventDefault();
		let i = a.querySelector("#editCommentText").value;
		editComment(e, i), t.querySelector(".cmt").innerText = i, a.remove(), t.querySelectorAll(".comment > *").forEach(e => {
			e.style.display = ""
		})
	}), a.querySelector(".cancelEdit").addEventListener("click", function() {
		a.remove(), t.querySelectorAll(".comment > *").forEach(e => {
			e.style.display = ""
		})
	})
}

function displayComments() {
	commentsBlock.innerHTML = "", comments.slice(0, commentLimit).reverse().forEach(displayComment), commentLimit >= comments.length ? loadMoreButton.style.display = "none" : loadMoreButton.style.display = "inline"
}

function parseCommentText(e) {
	e = (e = e.replace(/\[span=([^\]]+)\]([\s\S]*?)\[\/span\]/g, '<span class="$1">$2</span>')).replace(/\[div=([^\]]+)\]([\s\S]*?)\[\/div\]/g, '<div class="$1">$2</div>');
	let t = [];
	return e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/\[code=([a-zA-Z0-9\+\-\#]+)]([\s\S]*?)\[\/code]/g, function(e, n, a) {
		return n = n.replace("c++", "cpp"), a = (a = a.replace(/\[code=([a-zA-Z0-9\+\-\#]+)]([\s\S]*?)\[\/code]/g, function(e, t, n) {
			return "[code=" + t + "]" + n + "[/code]"
		})).replace(/</g, "&lt;").replace(/>/g, "&gt;"), t.push({
			lang: n,
			code: a
		}), "\x01" + (t.length - 1) + "\x01"
	})).replace(/\[hr\]/g, "<hr>")).replace(/\[right\]([\s\S]*?)\[\/right\]/g, '<div class="right">$1</div>')).replace(/\[center\]([\s\S]*?)\[\/center\]/g, '<div class="center">$1</div>')).replace(/\[img=([^\s]+)(?:\s+w=(\d+))?(?:\s+h=(\d+))?\]/g, function(e, t, n, a) {
		return n && a ? '<img src="' + t + '" alt="img" style="width: ' + n + "px; height: " + a + 'px;">' : '<img src="' + t + '" alt="img">'
	})).replace(/\[_list([\s\S]*?)\]/g, function(e, t) {
		var n = t.trim().split("\n"),
			a = '<ul class="list">';
		return n.forEach(function(e) {
			a += "<li>" + e.trim() + "</li>"
		}), a += "</ul>"
	})).replace(/\[spoiler=(.*?)\]([\s\S]*?)\[\/spoiler\]/g, function(e, t, n) {
		return '<div class="spoil"><div class="title">' + t + '</div><div class="content">' + n + "</div></div>"
	})).replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/g, '<a href="$1" target="_blank">$2</a>')).replace(/\[video\]([^\[]+)\[\/video\]/g, function(e, t) {
		var n = t.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)[1];
		return '<div class="video-container"><img src="https://img.youtube.com/vi/' + n + '/maxresdefault.jpg" class="preview-img" /><iframe src="https://www.youtube.com/embed/' + n + '" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="display:none;"></iframe></div>'
	}), document.addEventListener("click", function(e) {
		var t = e.target;
		t.classList.contains("video-container") && (t.querySelector(".preview-img").style.display = "none", t.querySelector("iframe").style.display = "block", t.classList.add("off"))
	}), document.querySelector(".comments") && document.getElementById("preview").addEventListener("click", function(e) {
		var t = e.target;
		t.classList.contains("video-container") && (t.querySelector(".preview-img").style.display = "none", t.querySelector("iframe").style.display = "block", t.classList.add("off"))
	}), e = (e = e.replace(/\n/g, "<br>")).replace(/\x01(\d+)\x01/g, function(e, n) {
		let a = t[n];
		return '<pre  id="code"class="this-code flex column"><div class="code-itm"><span class="lang">' + a.lang + '</span></div> <code class="kod language-' + a.lang + '">' + a.code.trim() + "</code></pre>"
	})
}
document.addEventListener("click", function(e) {
	var t = e.target,
		n = t.closest(".title"),
		a = t.closest("#preview");
	n && !a && n.classList.toggle("jez")
}), document.getElementById("preview").addEventListener("click", function(e) {
	var t = e.target.closest(".title");
	t && t.classList.toggle("jez")
});
let isPreviewVisible = !1;

function deleteComment(e) {
	let t = a(database, `comments/${e}`);
	s(t)
}

function formatTimeDifference(e) {
	let t = Math.floor((new Date - new Date(e)) / 1e3),
		n = Math.floor(t / 60),
		a = Math.floor(n / 60),
		i = Math.floor(a / 24),
		l = Math.floor(i / 7),
		s = Math.floor(i / 30),
		o = Math.floor(i / 365);
	return o > 0 ? 1 === o ? "год назад" : `${o} ${o%10==2||o%10==3||o%10==4?"года":"лет"} назад` : s > 0 ? 1 === s ? "месяц назад" : `${s} ${s%10==1?"месяц":"месяца"} назад` : l > 0 ? 1 === l ? "неделю назад" : `${l} ${l%10==1?"неделю":"недели"} назад` : i > 0 ? 1 === i ? "вчера" : `${i} ${i%10==1?"день":"дня"} назад` : a > 0 ? 1 === a ? "час назад" : `${a} ${a%10==1?"час":"часа"} назад` : n > 0 ? 1 === n ? "минуту назад" : `${n} ${n%10==1?"минуту":"минуты"} назад` : t > 0 ? 1 === t ? "секунду назад" : `${t} ${t%10==1?"секунду":"секунды"} назад` : "только что"
}

function sendComment(e) {
	if ("" !== e.text.trim()) {
		a(database, "comments");
		let t = {
				text: e.text,
				date: new Date().toISOString()
			},
			n = a(database, `comments/${Date.now().toString()}`);
		o(n, t)
	}
}
document.getElementById("b-preview").addEventListener("click", function() {
	let e = document.getElementById("commentInput"),
		t = document.getElementById("preview");
	if (isPreviewVisible) e.style.display = "block", t.style.display = "none", isPreviewVisible = !1;
	else {
		let n = parseCommentText(e.value);
		t.innerHTML = n, e.style.display = "none", t.style.display = "block", isPreviewVisible = !0
	}
}), loadMoreButton.addEventListener("click", () => {
	commentLimit += 10, displayComments()
});
let notificationSound = new Audio("notification.mp3"),
	userInteracted = !1;

function handleUserInteraction() {
	userInteracted = !0, document.removeEventListener("click", handleUserInteraction), document.removeEventListener("keydown", handleUserInteraction)
}
document.addEventListener("click", handleUserInteraction), document.addEventListener("keydown", handleUserInteraction), l(a(database, "comments"), e => {
	let t = [];
	e.forEach(e => {
		let n = new Date(e.val().date),
			a = {
				key: e.key,
				text: e.val().text,
				date: n,
				edited: e.val().edited
			};
		t.push(a)
	}), t.reverse(), t.length > comments.length && userInteracted && notificationSound.play().catch(e => {
		console.error("Ошибка воспроизведения звука:", e)
	}), comments = t, displayComments()
}), commentForm.addEventListener("submit", e => {
	e.preventDefault();
	let t = commentInput.value.trim();
	if ("" !== t) sendComment({
		text: t
	}), commentInput.value = "";
	else {
		let n = document.createElement("span");
		n.className = "error", n.textContent = "текст не может быть пустым", commentForm.appendChild(n), setTimeout(() => {
			n.remove()
		}, 3e3)
	}
});
let searchInput = document.getElementById("searchInput");

function displayFilteredComments(e) {
	let t = comments.filter(t => {
		let n = RegExp(e, "i");
		return n.test(t.text.toLowerCase()) || n.test(t.key)
	});
	commentsBlock.innerHTML = "", t.slice(0, commentLimit).forEach(displayComment), commentLimit >= t.length ? loadMoreButton.style.display = "none" : loadMoreButton.style.display = "inline"
}
searchInput.addEventListener("input", function() {
	let e = searchInput.value.toLowerCase();
	"" === e ? displayComments() : displayFilteredComments(e)
});
