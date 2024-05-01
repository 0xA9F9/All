document.querySelectorAll('.r-r').forEach(element => {
    element.addEventListener('click', function (e) {
        const existingRipples = element.querySelectorAll('.ripple');
        existingRipples.forEach(ripple => ripple.remove());
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = element.getBoundingClientRect();
        const rippleSize = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${rippleSize}px`;
        ripple.style.left = `${e.clientX - rect.left - rippleSize / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - rippleSize / 2}px`;

        element.appendChild(ripple);

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});
