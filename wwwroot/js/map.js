window.getDragPosition = (event, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return null;
    
    const rect = container.getBoundingClientRect();
    const map = container.querySelector('.map');
    const scale = parseFloat(map.getAttribute('data-scale') || '1');
    
    // Adjust coordinates based on scale and scroll position
    const x = (event.clientX - rect.left + container.scrollLeft) / scale;
    const y = (event.clientY - rect.top + container.scrollTop) / scale;
    
    return {
        x: Math.max(0, Math.min(x, container.scrollWidth / scale)),
        y: Math.max(0, Math.min(y, container.scrollHeight / scale))
    };
};

// Initialize draggable functionality
window.initializeDraggable = () => {
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
};

window.initializeZoom = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const map = container.querySelector('.map');
    let scale = 1;
    const maxScale = 3;
    const minScale = 0.5;

    // Store initial dimensions
    const initialWidth = map.offsetWidth;
    const initialHeight = map.offsetHeight;

    window.setMapZoom = (newScale) => {
        scale = Math.min(maxScale, Math.max(minScale, newScale));
        map.style.transform = `scale(${scale})`;
        map.setAttribute('data-scale', scale.toString());
        
        // Update container scroll dimensions
        const newWidth = initialWidth * scale;
        const newHeight = initialHeight * scale;
        
        // Center the map after zoom
        if (newWidth > container.offsetWidth) {
            container.scrollLeft = (newWidth - container.offsetWidth) / 2;
        }
        if (newHeight > container.offsetHeight) {
            container.scrollTop = (newHeight - container.offsetHeight) / 2;
        }

        // Update player markers scale to maintain size
        const markers = document.querySelectorAll('.player-marker, .shop-marker');
        markers.forEach(marker => {
            marker.style.transform = `translate(-50%, -50%) scale(${1/scale})`;
        });

        return scale;
    };
};