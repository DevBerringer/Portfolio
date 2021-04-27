"use strict";
// Navbar recolor 
$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

// hamburger var
const NAVTOGGLE = document.querySelector('.nav-toggle');
const NAVLINKS = document.querySelectorAll('.nav__link')
// hamburger functionality 
NAVTOGGLE.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

NAVLINKS.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  })
})

// coding languages slider
let slider = document.querySelector('.slider');
let innerSlider = document.querySelector('.slider-inner');
let pressed = false;
let startX;
let x;

slider.addEventListener('mousedown', (e) => {
    pressed = true;
    startX = e.offsetX - innerSlider.offsetLeft;
    slider.style.cursor = 'grabbing'
    slider.style.cursor = -webkit-grab

});

slider.addEventListener('mouseenter', () => {
    slider.style.cursor = 'grab'
});

slider.addEventListener('mouseup', () => {
    slider.style.cursor = 'grab'
});

slider.addEventListener('mouseleave', () => {
    pressed = false;
});

window.addEventListener('mouseup', () => {
    pressed = false;
});

slider.addEventListener('mousemove', (e) => {
    if (!pressed) return;
    e.preventDefault();

    x = e.offsetX

    innerSlider.style.left = `${x - startX}px`;

    checkboundary()
});

function checkboundary() {
    let outer = slider.getBoundingClientRect();
    let inner = innerSlider.getBoundingClientRect();

    if (parseInt(innerSlider.style.left) > 0) {
        innerSlider.style.left = '0px'
    } else if (inner.right < outer.right) {
        innerSlider.style.left = `-${inner.width - outer.width}px`
    }
}

//cards overlay
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

//typing animation script
let typed = new Typed(".typing", {
  strings:["Front-end, Back-end", "Full-stack Developer" ],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true
});

