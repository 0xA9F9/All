function translateToElvish() {
    const inputText = document.getElementById('inputText').value;
    const outputText = document.getElementById('outputText');
    outputText.innerHTML = translateBlock(inputText);
    addCopyButton();
}

function translateToRussian() {
    const inputText = document.getElementById('inputText').value;
    const outputText = document.getElementById('outputText');
    outputText.innerHTML = translateBlockToRussian(inputText);
    addCopyButton();
}

function translateBlock(text) {
    const translationMap = {
        'а': 'ꗎ', 'б': 'ꗏ', 'в': 'ꗐ', 'г': 'ꗑ', 'д': 'ꗒ', 'е': 'ꗓ', 'ё': 'ꗔ', 'ж': 'ꗕ', 'з': 'ꗖ', 'и': 'ꗗ',
        'й': 'ꗘ', 'к': 'ꗙ', 'л': 'ꗚ', 'м': 'ꗛ', 'н': 'ꗜ', 'о': 'ꗝ', 'п': 'ꗞ', 'р': 'ꗟ', 'с': 'ꗠ', 'т': 'ꗡ',
        'у': 'ꗢ', 'ф': 'ꗣ', 'х': 'ꗤ', 'ц': 'ꗥ', 'ч': 'ꗦ', 'ш': 'ꗧ', 'щ': 'ꗨ', 'ъ': 'ꗩ', 'ы': 'ꗪ', 'ь': 'ꗫ',
        'э': 'ꗬ', 'ю': 'ꗭ', 'я': 'ꗮ'
    };

    let translatedText = '';
    for (let i = 0; i < text.length; i++) {
        const currentChar = text[i];
        if (currentChar === ' ') {
            translatedText += '&nbsp;'; 
        } else {
            const translatedChar = translationMap[currentChar.toLowerCase()];
            if (translatedChar) {
                translatedText += (currentChar === currentChar.toLowerCase()) ? translatedChar : '⌔' + translatedChar.toUpperCase();
            } else {
                translatedText += currentChar;
            }
        }
    }

    return translatedText;
}

function translateBlockToRussian(text) {
    const translationMap = {
        'ꗎ': 'а', 'ꗏ': 'б', 'ꗐ': 'в', 'ꗑ': 'г', 'ꗒ': 'д', 'ꗓ': 'е', 'ꗔ': 'ё', 'ꗕ': 'ж', 'ꗖ': 'з', 'ꗗ': 'и',
        'ꗘ': 'й', 'ꗙ': 'к', 'ꗚ': 'л', 'ꗛ': 'м', 'ꗜ': 'н', 'ꗝ': 'о', 'ꗞ': 'п', 'ꗟ': 'р', 'ꗠ': 'с', 'ꗡ': 'т',
        'ꗢ': 'у', 'ꗣ': 'ф', 'ꗤ': 'х', 'ꗥ': 'ц', 'ꗦ': 'ч', 'ꗧ': 'ш', 'ꗨ': 'щ', 'ꗩ': 'ъ', 'ꗪ': 'ы', 'ꗫ': 'ь',
        'ꗬ': 'э', 'ꗭ': 'ю', 'ꗮ': 'я'
    };

    let translatedText = '';
    let skipNext = false; 
    for (let i = 0; i < text.length; i++) {
        const currentChar = text[i];
        if (currentChar === '⌔') {
            skipNext = true; 
        } else {
            const translatedChar = translationMap[currentChar.toLowerCase()];
            if (skipNext) {
                if (translatedChar && currentChar === currentChar.toUpperCase()) {
                    translatedText += translatedChar.toUpperCase();
                } else {
                    translatedText += currentChar;
                }
                skipNext = false; 
            } else if (translatedChar) {
                translatedText += translatedChar;
            } else {
                translatedText += currentChar;
            }
        }
    }

    return translatedText;
}

function addCopyButton() {
    const btns = document.getElementById('btns');
    const outputText = document.getElementById('outputText');
    
    if (outputText.textContent.trim() !== '') {
        if (!document.getElementById('copybutton')) {
            const copyButton = document.createElement('button');
            copyButton.id = 'copybutton';
            copyButton.textContent = 'Копировать перевод';
            copyButton.onclick = function() {
                copyTranslation();
            };
            btns.appendChild(copyButton);
        }
    } else {
        const copyButton = document.getElementById('copybutton');
        if (copyButton) {
            copyButton.parentNode.removeChild(copyButton);
        }
    }
}

function copyTranslation() {
    const outputText = document.getElementById('outputText');
    const range = document.createRange();
    range.selectNode(outputText);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    const copyButton = document.getElementById('copybutton');
    copyButton.textContent = 'Перевод скопирован!';
    setTimeout(() => {
        copyButton.textContent = 'Копировать перевод';
    }, 1500);
}
