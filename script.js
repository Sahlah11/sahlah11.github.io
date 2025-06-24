// Custom cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

// Background color changer
document.getElementById('colorBtn').addEventListener('click', function() {
    const colors = [
        '#f5f6fa', // light
        '#e3f2fd', // blue
        '#f3e5f5', // purple
        '#e8f5e9', // green
        '#fff3e0', // orange
        '#fce4ec', // pink
        '#e0f7fa', // cyan
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
    
    // Change primary color based on background
    const root = document.documentElement;
    if (randomColor === '#f5f6fa') {
        root.style.setProperty('--primary-color', '#6c5ce7');
        root.style.setProperty('--secondary-color', '#a29bfe');
    } else {
        // Darker version of background color
        const darkerColor = shadeColor(randomColor, -20);
        root.style.setProperty('--primary-color', darkerColor);
        root.style.setProperty('--secondary-color', randomColor);
    }
});

// Helper function to shade colors
function shadeColor(color, percent) {
    let R = parseInt(color.substring(1,3), 16);
    let G = parseInt(color.substring(3,5), 16);
    let B = parseInt(color.substring(5,7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);

    const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section, .skill-category, .timeline-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.section, .skill-category, .timeline-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);