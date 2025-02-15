const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});

var typed = new Typed((".skills"),{
    strings : ["Student", "Programmer", "Content Creator"],
    typeSpeed : 100,
    backSpeed : 100,
    backDelay : 1000,
    loop : true
});

var typed = new Typed((".ab"),{
    strings : ["Steven Huangsen", "Vocational Highschool Student", "16 Years Old", "Sigma Boi O_o", "Single ;)"],
    typeSpeed : 100,
    backSpeed : 50,
    backDelay : 1000,
    loop : true
});

const navLinks = document.querySelectorAll('header nav a');
let sections = document.querySelectorAll('section');
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        const targetId = link.getAttribute('href').substring(1); // Get the ID from href
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Smooth scroll to the target section
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Offset for header height
                behavior: 'smooth',
            });
        }

        // Update active class
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');       
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};

// mix itup port
var mixer = mixitup('.portfolio-gallery', {
    controls: {
        toggleDefault: 'none'
    }
});
