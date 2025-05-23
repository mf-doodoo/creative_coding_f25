let mouseIsActive = false;

document.addEventListener('click', function(e) {
    // Skip if the click was triggered by our own script
    if (e.__cheeseClickHandled) return;

    // Prevent spamming
    if (mouseIsActive) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();

    mouseIsActive = true;

    const target = e.target;
    const { clientX, clientY } = e;

    // Place the cheese
    const cheese = document.createElement('img');
    cheese.src = chrome.runtime.getURL("cheese.png");
    cheese.style.position = 'fixed';
    cheese.style.left = `${clientX}px`;
    cheese.style.top = `${clientY}px`;
    cheese.style.width = '64px';
    cheese.style.height = '64px';
    cheese.style.pointerEvents = 'none';
    cheese.style.zIndex = 999999;
    document.body.appendChild(cheese);

    // Spawn mouse from a random edge
    const { startX, startY } = getRandomEdgeSpawn();

    const mouse = document.createElement('img');
    mouse.src = chrome.runtime.getURL("cursor.png");
    mouse.style.position = 'fixed';
    mouse.style.left = `${startX}px`;
    mouse.style.top = `${startY}px`;
    mouse.style.width = '32px';
    mouse.style.height = '32px';
    mouse.style.pointerEvents = 'none';
    mouse.style.zIndex = 999999;
    document.body.appendChild(mouse);

    // Animate mouse to cheese
    animateMouseTo(mouse, clientX, clientY, () => {
        cheese.remove();
        mouse.remove();
        mouseIsActive = false;

        // Re-dispatch click — mark it as handled to prevent loop
        const newEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX,
            clientY
        });

        // Custom flag to prevent re-triggering
        Object.defineProperty(newEvent, '__cheeseClickHandled', {
            value: true,
            enumerable: false
        });

        target.dispatchEvent(newEvent);
    });
}, true);

function getRandomEdgeSpawn() {
    const edge = Math.floor(Math.random() * 4);
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    switch (edge) {
        case 0: return { startX: Math.random() * vw, startY: -50 }; // Top
        case 1: return { startX: vw + 50, startY: Math.random() * vh }; // Right
        case 2: return { startX: Math.random() * vw, startY: vh + 50 }; // Bottom
        case 3: return { startX: -50, startY: Math.random() * vh }; // Left
    }
}

function animateMouseTo(element, destX, destY, onComplete) {
    const speed = 2;
    let posX = parseFloat(element.style.left);
    let posY = parseFloat(element.style.top);

    function moveStep() {
        const dx = destX - posX;
        const dy = destY - posY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < speed) {
            element.style.left = `${destX}px`;
            element.style.top = `${destY}px`;
            if (onComplete) onComplete();
            return;
        }

        posX += (dx / distance) * speed;
        posY += (dy / distance) * speed;
        element.style.left = `${posX}px`;
        element.style.top = `${posY}px`;

        requestAnimationFrame(moveStep);
    }

    requestAnimationFrame(moveStep);
}
