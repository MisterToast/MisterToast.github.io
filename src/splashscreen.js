const MIN_SPLASH_TIME = 1000; // Minimum 1 Sekunde
const startTime = Date.now(); // Zeitpunkt, wann Splashscreen angezeigt wurde

function hideSplash() {
    const splash = document.getElementById("splashscreen");
    if (!splash) return;

    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, MIN_SPLASH_TIME - elapsed);

    setTimeout(() => {
        splash.style.transition = "opacity 0.5s";
        splash.style.opacity = 0;

        setTimeout(() => {
            if (splash.parentNode) splash.parentNode.removeChild(splash);
        }, 500); // Warten, bis fade-out Animation fertig ist
    }, delay);
}

// Wenn das Fenster lädt
window.addEventListener("load", hideSplash);

// Falls die Seite schon geladen ist (z.B. PC mit Cache)
if (document.readyState === "complete") {
    hideSplash();
}
