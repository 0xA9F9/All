const textarea = document.getElementById('commentInput');
    const maxHeight = 410; 

    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        if (textarea.scrollHeight <= maxHeight) {
            textarea.style.height = textarea.scrollHeight + 'px';
        } else {
            textarea.style.height = maxHeight + 'px';
        }
    });

//-----------------------------------------------------------------------------------------// 

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

// Функция для вставки изображения с использованием BB-кода
function insertImageBBCode(urlInput, widthInput, heightInput) {
    let textarea = document.getElementById("commentInput");
    let imgBBCode = `[img=${urlInput}`;
    // Проверяем, есть ли указанные ширина и высота
    if (widthInput && heightInput) {
        imgBBCode += ` w=${widthInput} h=${heightInput}`;
    }
    imgBBCode += `]`;
    replaceSelectedTextWithBBCode(imgBBCode);
}

// Добавляем обработчик события для кнопки put-img
document.getElementById("put-img").addEventListener("click", function(e) {
    e.preventDefault();
    let urlInput = document.getElementById("image-url-input").value.trim();
    let widthInput = document.getElementById("image-width-input").value.trim();
    let heightInput = document.getElementById("image-height-input").value.trim();
    // Проверяем, была ли указана ссылка на изображение
    if (urlInput) {
        // Если ссылка есть, вставляем изображение с указанными параметрами или без них
        insertImageBBCode(urlInput, widthInput, heightInput);
    } else {
        // Добавляем красную тень, если ссылка на изображение не была указана
        document.getElementById("image-url-input").style.boxShadow = "red 0px 0px 0px 2px";
        // Устанавливаем таймер для удаления стилей через 5 секунд
        setTimeout(function() {
            document.getElementById("image-url-input").style.boxShadow = "";
        }, 5000);
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
        // Проверяем, является ли ссылка полной (начинается с http:// или https://)
        if (!/^https?:\/\//i.test(linkInput)) {
            // Если ссылка относительная, добавляем префикс для перехода на другую страницу
            linkInput = "http://" + linkInput;
        }
        let linkBBCode = `[url=${linkInput}]${nameInput}[/url]`;
        replaceSelectedTextWithBBCode(linkBBCode);
    } else {
        // Удаляем тень с обоих полей, если они не заполнены
        document.getElementById("put-link").style.boxShadow = linkInput ? "" : "red 0px 0px 0px 2px";
        document.getElementById("link-name").style.boxShadow = nameInput ? "" : "red 0px 0px 0px 2px";

        // Устанавливаем таймер для удаления стилей через 5 секунд
        setTimeout(function() {
            document.getElementById("put-link").style.boxShadow = "";
            document.getElementById("link-name").style.boxShadow = "";
        }, 5000);
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




document.getElementById('imageInput').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            const encodedData = reader.result;
            const imageType = file.type;
            insertImage(encodedData, imageType);
        }
    }
});

function insertImage(encodedData, imageType) {
    const textarea = document.getElementById('commentInput');
    const imgBBCode = `[img=data:${imageType};base64,${encodedData}]`;
    insertTextAtCursor(textarea, imgBBCode);
}

function insertTextAtCursor(textarea, text) {
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const textBefore = textarea.value.substring(0, startPos);
    const textAfter = textarea.value.substring(endPos, textarea.value.length);
    textarea.value = textBefore + text + textAfter;
    textarea.selectionStart = startPos + text.length;
    textarea.selectionEnd = startPos + text.length;
    textarea.focus();
}


