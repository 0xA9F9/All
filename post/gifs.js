    (function() {
  'use strict';

  let offset = 0;
  const limit = 28;
  const apiKey = 'LIVDSRZULELA';

  function addCustomElements() {
    const pushMeStyle = document.createElement('style');
    pushMeStyle.textContent = '';

    document.head.appendChild(pushMeStyle);

    const newBlock = document.createElement('div');
    newBlock.className = 'new_block';
    newBlock.style.display = 'none';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'srch'
    searchInput.placeholder = 'Что ищешь?';

     const searchButton = document.createElement('button');
    searchButton.textContent = 'Найти';
    searchButton.className = 'search-it';
    searchButton.setAttribute('type', 'button');
    searchButton.addEventListener('click', function() {
      const searchTerm = searchInput.value;
      searchTenor(searchTerm);
    });

    newBlock.appendChild(searchInput);
    newBlock.appendChild(searchButton);
    

const pushMeButton = document.createElement('button');
pushMeButton.className = 'pushme mdi mdi-emoticon titled';
pushMeButton.setAttribute('type', 'button');
pushMeButton.setAttribute('title', 'Гиф');


    const popularImagesContainer = document.createElement('div');
    popularImagesContainer.className = 'popular-img';

    newBlock.appendChild(popularImagesContainer);

const resultsContainer = document.createElement('div');
resultsContainer.className = 'results';
newBlock.appendChild(resultsContainer);


    const allContainer = document.createElement('div');
    allContainer.className = 'all';

    allContainer.appendChild(pushMeButton);
    allContainer.appendChild(newBlock);

const btBbElement = document.querySelector('.bt-bb');
btBbElement.insertAdjacentElement('afterend', allContainer);


    pushMeButton.addEventListener('click', function() {
      const displayValue = window.getComputedStyle(newBlock).getPropertyValue('display');
      newBlock.style.display = displayValue === 'none' ? 'block' : 'none';
      pushMeButton.classList.toggle('clickme');
    });

    const loadMoreButton = document.createElement('button');
    loadMoreButton.textContent = 'Загрузить ещё';
    loadMoreButton.className = 'load_more';
    loadMoreButton.setAttribute('type', 'button');
    loadMoreButton.addEventListener('click', function() {
      const searchTerm = document.querySelector('.new_block input').value;
      searchTenor(searchTerm, true);
    });

    newBlock.appendChild(loadMoreButton);

    popularImagesContainer.addEventListener('click', function(event) {
      const clickedImg = event.target;
      if (clickedImg.tagName === 'IMG') {
        const editorAreas = document.querySelectorAll('.this-place');
        editorAreas.forEach(textarea => {
          const cursorPos = textarea.selectionStart;
          const textBeforeCursor = textarea.value.substring(0, cursorPos);
          const textAfterCursor = textarea.value.substring(cursorPos);
          const imageUrl = clickedImg.src;
          const imageTag = `[img=${imageUrl} w=40 h=40]`;
          textarea.value = textBeforeCursor + imageTag + textAfterCursor;

          textarea.setSelectionRange(cursorPos + imageTag.length, cursorPos + imageTag.length);
        });


        const clickCount = parseInt(clickedImg.dataset.clickCount) || 0;
        if (clickCount < 2) {
  clickedImg.dataset.clickCount = clickCount + 1;
} else {
  clickedImg.parentNode.removeChild(clickedImg);
  savePopularImages();
}
      }
    });
  }


  

  document.addEventListener('DOMContentLoaded', function() {
    addCustomElements();
    restorePopularImages();
  });

  function restorePopularImages() {
    const popularImagesContainer = document.querySelector('.popular-img');
    popularImagesContainer.innerHTML = '';

    const popularImages = JSON.parse(localStorage.getItem('popularImages'));
    if (popularImages && popularImages.length > 0) {
        popularImages.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            popularImagesContainer.appendChild(img);
        });
    }
  }

  function searchTenor(searchTerm, loadMore = false) {
    const resultsContainer = document.querySelector('.new_block .results');
  const popularImagesContainer = document.querySelector('.popular-img');
  if (!loadMore) {
    resultsContainer.innerHTML = '';
    offset = 0;
  }

    const url = `https://api.tenor.com/v1/search?key=${apiKey}&q=${searchTerm}&limit=${limit}&pos=${offset}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const gifs = data.results;
        gifs.forEach(gif => {
          const img = document.createElement('img');
          img.src = gif.media[0].gif.url;
          img.alt = gif.title;
          img.addEventListener('click', () => {
            const editorAreas = document.querySelectorAll('.this-place');
            editorAreas.forEach(textarea => {
              const cursorPos = textarea.selectionStart;
              const textBeforeCursor = textarea.value.substring(0, cursorPos);
              const textAfterCursor = textarea.value.substring(cursorPos);
              const imageUrl = img.src;
              const imageTag = `[img=${imageUrl} w=40 h=40]`;
              textarea.value = textBeforeCursor + imageTag + textAfterCursor;

              textarea.setSelectionRange(cursorPos + imageTag.length, cursorPos + imageTag.length);
            });

            const existingImages = document.querySelectorAll('.popular-img img');
            let isAlreadyAdded = false;
            existingImages.forEach(existingImg => {
              if (existingImg.src === img.src) {
                isAlreadyAdded = true;
              }
            });

            if (!isAlreadyAdded) {
              const imgCopy = img.cloneNode(true);
              imgCopy.addEventListener('click', () => {
                const editorAreas = document.querySelectorAll('.this-place');
                editorAreas.forEach(textarea => {
                  const cursorPos = textarea.selectionStart;
                  const textBeforeCursor = textarea.value.substring(0, cursorPos);
                  const textAfterCursor = textarea.value.substring(cursorPos);
                  const imageUrl = imgCopy.src;
                  const imageTag = `[img=${imageUrl} w=40 h=40]`;
                  textarea.value = textBeforeCursor + imageTag + textAfterCursor;

                  textarea.setSelectionRange(cursorPos + imageTag.length, cursorPos + imageTag.length);
                });
              });

              if (existingImages.length >= 49) {
                existingImages[0].remove();
              }

              popularImagesContainer.appendChild(imgCopy);
              savePopularImages();
            }
          });

          resultsContainer.appendChild(img);
        });

        offset += limit;

        const loadMoreButton = document.querySelector('.load_more');
        if (loadMoreButton) {
          loadMoreButton.style.display = gifs.length > 0 ? 'inline-block' : 'none';
        }

        if (resultsContainer.querySelectorAll('img').length > 0) {
          popularImagesContainer.style.display = 'none';
        } else {
          popularImagesContainer.style.display = 'grid';
        }
      })
      .catch(error => console.error('Ошибка:', error));
  }

  function savePopularImages() {
    const popularImages = Array.from(document.querySelectorAll('.popular-img img')).map(img => img.src);
    localStorage.setItem('popularImages', JSON.stringify(popularImages));
  }
})();