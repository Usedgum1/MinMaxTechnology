let currentPage = 'home';

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') === `showPage('${pageId}')`) link.classList.add('active');
    });
    currentPage = pageId;
    const footer = document.getElementById('footer');
    const activePage = document.getElementById(pageId);
    activePage.appendChild(footer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('footer');
    const homePage = document.getElementById('home');
    homePage.appendChild(footer);

    // Add My Simple TCG! to the top of Past Projects.
    const caseStudies = document.querySelector('#casestudies .content-wrapper');
    if (caseStudies && !document.getElementById('my-simple-tcg-project')) {
        const cards = Array.from(caseStudies.querySelectorAll(':scope > section.service-card'));
        const firstCard = cards[0];
        const tcgCard = document.createElement('section');
        tcgCard.id = 'my-simple-tcg-project';
        tcgCard.className = 'service-card glass';
        tcgCard.style.marginBottom = '2rem';
        tcgCard.innerHTML = `
            <h1>My Simple TCG!</h1>
            <p>A cozy, offline trading card shop and collecting game built for iOS. Players can rip packs, hunt rare cards, build a collection, buy and sell cards, grade and restore finds, grow their shop, and explore a playful simulated card-collecting economy — all without accounts, ads, analytics, or player tracking.</p>
            <h4 style="color:black;font-weight:bold;">Sector: Mobile Gaming</h4>
            <a href="privacy.html" class="cta-button">Privacy Policy</a>
        `;
        if (firstCard) caseStudies.insertBefore(tcgCard, firstCard);
        else caseStudies.appendChild(tcgCard);
    }
});

document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const xPos = (x - 0.5) * speed * 20;
        const yPos = (y - 0.5) * speed * 20;
        shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-shapes');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

document.querySelectorAll('.glass').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.cssText = `position:absolute;width:${size}px;height:${size}px;left:${x}px;top:${y}px;background:rgba(255,255,255,0.3);border-radius:50%;transform:scale(0);animation:ripple 0.6s linear;pointer-events:none;z-index:1000;`;
        this.style.position = 'relative';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

const style = document.createElement('style');
style.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
document.head.appendChild(style);

const fadeStyle = document.createElement('style');
fadeStyle.textContent = `@keyframes fadeIn { from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }`;
document.head.appendChild(fadeStyle);
