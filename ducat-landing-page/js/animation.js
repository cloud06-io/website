if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScroll);
} else {
    initializeScroll();
}

function initializeScroll() {
    const container = document.getElementById('screenshot-container');
    const previewText = document.getElementById('preview-text');
    
    if (!container || !previewText) {
        console.error('Required elements not found');
        return;
    }
    
    // Initial transform
    container.style.transform = 'perspective(1000px) rotateX(-30deg)';
    
    function updateElements() {
        const windowHeight = window.innerHeight;
        const containerRect = container.getBoundingClientRect();
        const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - windowHeight);
        
        // Start rotation as soon as scrolling begins
        const containerTop = containerRect.top;
        const rotationTriggerPoint = windowHeight * 0.8; // Trigger earlier
        
        // Calculate rotation based on container position relative to viewport
        let rotation = -30;
        if (containerTop < rotationTriggerPoint) {
            const progress = Math.min(1, (rotationTriggerPoint - containerTop) / (windowHeight * 0.5));
            rotation = -30 + (progress * 30);
        }
        
        // Apply the transform to the container
        container.style.transform = `perspective(1000px) rotateX(${rotation}deg)`;
        
        // Update text reveal with similar timing
        const textProgress = Math.min(1, Math.max(0, (rotationTriggerPoint - containerTop) / (windowHeight * 0.4)));
        previewText.style.opacity = textProgress;
        previewText.style.transform = `translateY(${20 - (textProgress * 20)}px)`;
    }
    
    // Update on scroll
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateElements);
    });
    
    // Update on resize
    window.addEventListener('resize', updateElements);
    
    // Initial update
    updateElements();
}
