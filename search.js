document.addEventListener("DOMContentLoaded", function() {
    var inputElement = document.querySelector(".i-s input");
    var parentElement = inputElement.parentNode;

    inputElement.addEventListener("click", function(event) {
        if (!parentElement.classList.contains("active")) {
            parentElement.classList.add("active");
        }
        event.stopPropagation(); 
    });

    document.addEventListener("click", function(event) {
        if (!parentElement.contains(event.target)) {
            parentElement.classList.remove("active");
        }
    });

    function toggleClearButtonVisibility() {
        const searchInput = document.getElementById('search');
        const clearButton = document.getElementById('clear-button');

        if (searchInput.value.trim() !== '') {
            clearButton.style.display = 'inline-block';
        } else {
            clearButton.style.display = 'none';
        }
    }

    function clearSearchAndSubmit() {
        const searchInput = document.getElementById('search');
        searchInput.value = ''; 

        const event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        searchInput.dispatchEvent(event);
    }

    const clearButton = document.createElement('button');
    clearButton.id = 'clear-button';
    clearButton.className = 'clear-button';
    clearButton.textContent = '×';
    clearButton.style.display = 'none'; 

    clearButton.addEventListener('click', clearSearchAndSubmit);

    const searchInput = document.getElementById('search');
    searchInput.parentNode.insertBefore(clearButton, searchInput.nextSibling);

    searchInput.addEventListener('input', toggleClearButtonVisibility);

    toggleClearButtonVisibility();
});
