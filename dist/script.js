$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});


const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  })
})


let slider = document.querySelector('.slider');
let innerSlider = document.querySelector('.slider-inner');


let pressed = false;
let startX;
let x;

slider.addEventListener('mousedown', (e) => {
    pressed = true;
    startx = e.offsetX - innerSlider.offsetLeft;
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

    innerSlider.style.left = `${x - startx}px`;

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

//typeing animation script

var typed = new Typed(".typing", {
  strings:["Front-end, Back-end", "Full-stack Developer" ],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true
});



//reCaptcha 
