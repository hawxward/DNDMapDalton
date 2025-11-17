window.getDragPosition = (event, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const scrollArea = container.querySelector('.map-scroll-area');
    const map = container.querySelector('.map');
    const wrapper = container.querySelector('.map-wrapper');
    if (!scrollArea || !map || !wrapper) return null;

    const wrapperRect = wrapper.getBoundingClientRect();
    const scale = parseFloat(map.getAttribute('data-scale') || '1');

    // Calculate position relative to the wrapper (which contains the rotated map)
    const relativeX = event.clientX - wrapperRect.left;
    const relativeY = event.clientY - wrapperRect.top;

    // Account for rotation: swap X and Y coordinates and adjust
    // Since map is rotated 90deg clockwise, x becomes y and y becomes (width - x)
    const mapHeight = 1200; // Original height before rotation
    const x = relativeY / scale;
    const y = (wrapperRect.width - relativeX) / scale;

    return {
        x: Math.max(0, Math.min(x, mapHeight / scale)),
        y: Math.max(0, Math.min(y, 900 / scale))
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

    const scrollArea = container.querySelector('.map-scroll-area');
    const map = container.querySelector('.map');
    const wrapper = container.querySelector('.map-wrapper');
    if (!scrollArea || !map || !wrapper) return;

    let scale = 1;
    const maxScale = 3;
    const minScale = 0.5;

    // Store initial dimensions of the wrapper (post-rotation dimensions)
    const initialWidth = 1200;
    const initialHeight = 900;

    window.setMapZoom = (newScale) => {
        scale = Math.min(maxScale, Math.max(minScale, newScale));
        map.style.transform = `rotate(90deg) scale(${scale})`;
        map.setAttribute('data-scale', scale.toString());

        // Update wrapper dimensions to scale with zoom
        wrapper.style.width = `${initialWidth * scale}px`;
        wrapper.style.height = `${initialHeight * scale}px`;

        // Update container scroll dimensions
        const newWidth = initialWidth * scale;
        const newHeight = initialHeight * scale;

        // Center the map after zoom
        if (newWidth > scrollArea.offsetWidth) {
            scrollArea.scrollLeft = (newWidth - scrollArea.offsetWidth) / 2;
        }
        if (newHeight > scrollArea.offsetHeight) {
            scrollArea.scrollTop = (newHeight - scrollArea.offsetHeight) / 2;
        }

        // Update player markers scale to maintain size
        const markers = document.querySelectorAll('.player-marker, .shop-marker');
        markers.forEach(marker => {
            marker.style.transform = `translate(-50%, -50%) scale(${1/scale})`;
        });

        return scale;
    };
};

window.toggleFullscreen = async (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return false;

    try {
        if (!document.fullscreenElement &&
            !document.webkitFullscreenElement &&
            !document.mozFullScreenElement &&
            !document.msFullscreenElement) {
            // Enter fullscreen
            if (container.requestFullscreen) {
                await container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) {
                await container.webkitRequestFullscreen();
            } else if (container.mozRequestFullScreen) {
                await container.mozRequestFullScreen();
            } else if (container.msRequestFullscreen) {
                await container.msRequestFullscreen();
            }
            return true;
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                await document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                await document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                await document.msExitFullscreen();
            }
            return false;
        }
    } catch (error) {
        console.error('Error toggling fullscreen:', error);
        return document.fullscreenElement != null;
    }
};