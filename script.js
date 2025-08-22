// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Add loading screen
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);

    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }, 2000);

    // Initialize animations
    initializeAnimations();
    
    // Initialize music player
    initializeMusicPlayer();
    
    // Add scroll effects
    addScrollEffects();
    
    // Add floating hearts dynamically
    createFloatingHearts();
});

// Initialize all animations
function initializeAnimations() {
    // Animate promise items on scroll
    const promiseItems = document.querySelectorAll('.promise-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    });

    promiseItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });

    // Animate reason items
    const reasonItems = document.querySelectorAll('.reason-item');
    reasonItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

// Initialize music player
function initializeMusicPlayer() {
    const musicBtn = document.getElementById('playMusic');
    let isPlaying = false;
    let audio = null;

    // Create audio element
    function createAudio() {
        audio = new Audio();
        // Option 1: Local file (put your song in the same folder)
        audio.src = 'romantic-song.mp3'; // Your song file
        
        // Option 2: Online URL (uncomment and replace with your song URL)
        // audio.src = 'https://example.com/your-romantic-song.mp3';
        audio.loop = true;
        audio.volume = 0.3;
    }

    musicBtn.addEventListener('click', function() {
        if (!audio) {
            createAudio();
        }

        if (isPlaying) {
            audio.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i><span>Play Our Song</span>';
            musicBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
        } else {
            audio.play().catch(e => {
                console.log('Audio play failed:', e);
                // Show a message to user
                showNotification('Please add your own song file to make it work!');
            });
            musicBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pause</span>';
            musicBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        }
        isPlaying = !isPlaying;
    });
}

// Add scroll effects
function addScrollEffects() {
    const sections = document.querySelectorAll('.message-container, .reasons-container, .promises-container, .final-message');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
}

// Create floating hearts dynamically
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const hearts = ['❤️', '💔', '💕', '💖', '💗', '💘', '💙', '💚', '💛', '💜'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }, 2000);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b6b, #ee5a24);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add click effects to social links
document.addEventListener('click', function(e) {
    if (e.target.closest('.social-link')) {
        e.preventDefault();
        const link = e.target.closest('.social-link');
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = link.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
        
        link.style.position = 'relative';
        link.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
        
        showNotification('Contact me through this platform!');
    }
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add parallax effect to floating hearts
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hearts = document.querySelectorAll('.floating-hearts .heart');
    
    hearts.forEach((heart, index) => {
        const speed = 0.5 + (index * 0.1);
        heart.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add typing effect to the title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after page loads
setTimeout(() => {
    const title = document.querySelector('.title');
    const originalText = title.textContent;
    typeWriter(title, originalText, 150);
}, 2500);

// Add heart beat effect to the main heart
function addHeartbeatEffect() {
    const pulseHeart = document.querySelector('.pulse-heart');
    if (pulseHeart) {
        setInterval(() => {
            pulseHeart.style.transform = 'scale(1.3)';
            setTimeout(() => {
                pulseHeart.style.transform = 'scale(1)';
            }, 200);
        }, 2000);
    }
}

// Initialize heartbeat effect
setTimeout(addHeartbeatEffect, 3000);

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add confetti effect when clicking the final message
document.querySelector('.final-message').addEventListener('click', function() {
    createConfetti();
});

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            z-index: 1000;
            pointer-events: none;
            animation: confetti-fall 3s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 3000);
    }
}

// Add confetti animation CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);
