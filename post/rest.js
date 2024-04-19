// Функция для вставки BB-кода списка в текстовое поле
function insertListBBCode() {
    let textarea = document.getElementById("commentInput");
    let listBBCode = '[_list\n\n]';
    // Вставляем BB-код списка в текущую позицию курсора в текстовом поле
    replaceSelectedTextWithBBCode(listBBCode);
}

// Функция для замены выделенного текста на указанный BB-код
function replaceSelectedTextWithBBCode(bbCode) {
    let textarea = document.getElementById("commentInput");
    let selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    let newText = textarea.value.substring(0, textarea.selectionStart) + bbCode + textarea.value.substring(textarea.selectionEnd);
    textarea.value = newText;
}

// Добавляем обработчик события для кнопки put-list
document.getElementById("put-list").addEventListener("click", function() {
    insertListBBCode();
});

// Добавляем обработчик события для кнопки put-img
document.getElementById("put-img").addEventListener("click", function(e) {
    e.preventDefault();
    let urlInput = document.getElementById("image-url-input").value.trim();
    let widthInput = document.getElementById("image-width-input").value.trim();
    let heightInput = document.getElementById("image-height-input").value.trim();
    if (urlInput && widthInput && heightInput) {
        let imgBBCode = `[img=${urlInput} w=${widthInput} h=${heightInput}]`;
        replaceSelectedTextWithBBCode(imgBBCode);
    } else {
        alert("Please fill out all fields.");
    }
});

// Функция для замены выделенного текста на указанный BB-код
function replaceSelectedTextWithTag(tag) {
    let textarea = document.getElementById("commentInput");
    let selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    let newText = textarea.value.substring(0, textarea.selectionStart) + `[${tag}]${selectedText}[/${tag}]` + textarea.value.substring(textarea.selectionEnd);
    textarea.value = newText;
}

// Добавляем обработчики событий для кнопок put-right и put-center
document.getElementById("put-right").addEventListener("click", function() {
    replaceSelectedTextWithTag("right");
});

document.getElementById("put-center").addEventListener("click", function() {
    replaceSelectedTextWithTag("center");
});

// Добавляем обработчик события для кнопки spoiler
document.getElementById("spoiler").addEventListener("click", function() {
    insertSpoilerBBCode();
});

// Функция для вставки BB-кода спойлера в текстовое поле
function insertSpoilerBBCode() {
    let textarea = document.getElementById("commentInput");
    let spoilerText = '[spoiler=спойлер] [/spoiler]';
    replaceSelectedTextWithBBCode(spoilerText);
}



// Добавляем обработчик события для кнопки ok-link
document.querySelector(".ok-link").addEventListener("click", function() {
    insertLinkBBCode();
});

// Функция для вставки BB-кода ссылки в текстовое поле
function insertLinkBBCode() {
    let linkInput = document.getElementById("put-link").value.trim();
    let nameInput = document.getElementById("link-name").value.trim();

    if (linkInput && nameInput) {
        let linkBBCode = `[url=${linkInput}]${nameInput}[/url]`;
        replaceSelectedTextWithBBCode(linkBBCode);
    } else {
        alert("Please fill out all fields.");
    }
}

// Добавляем обработчик события для кнопки put-code
document.getElementById("put-code").addEventListener("click", function() {
    insertCodeBBCode();
});

// Функция для вставки BB-кода code в текстовое поле с выделением текста
function insertCodeBBCode() {
    let textarea = document.getElementById("commentInput");
    let selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    let codeBBCode = '[code=code]' + selectedText + '[/code]';
    replaceSelectedTextWithBBCode(codeBBCode);
}

 document.getElementById('imageFileInput').addEventListener('change', function() {
            const fileInput = this.files[0];
            if (fileInput) {
                const reader = new FileReader();
                reader.readAsDataURL(fileInput);
                reader.onload = function () {
                    const imageUrl = reader.result;
                    document.getElementById('image-url-input').value = imageUrl;
                };
            } else {
                document.getElementById('image-url-input').value = "";
            }
        });

