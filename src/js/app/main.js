var navMobile = document.querySelector('.nav__mobile__group');
var navOpenBtn = document.querySelector('#navOpenBtn');
var navCloseBtn = document.querySelector("#navCloseBtn")

// Add active class
navOpenBtn.addEventListener('click', function () {
    navMobile.classList.add('active');
})


// Remove active class
navCloseBtn.addEventListener('click', function () {
    navMobile.classList.remove('active');
})