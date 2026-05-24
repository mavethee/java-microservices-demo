async function fetchData() {
    const containerEl = document.getElementById('container-id');
    
    try {
        const response = await fetch('/api/info');
        const data = await response.json();
        
        // Aktualizacja ID Kontenera
        containerEl.innerText = data.containerId;
        
        // Obliczenia procentowe dla paska pamięci
        const percent = Math.round((data.usedMemory / data.maxMemory) * 100);
        
        // Aktualizacja interfejsu trackera
        document.getElementById('used-memory').innerText = data.usedMemory + ' MB';
        document.getElementById('memory-text').innerText = `Max Limit: ${data.maxMemory} MB`;
        document.getElementById('memory-percent').innerText = percent + '%';
        
        // Zabezpieczenie przed wyjściem paska poza 100%
        const safePercent = percent > 100 ? 100 : percent;
        const barEl = document.getElementById('memory-bar');
        barEl.style.width = safePercent + '%';
        
        // Dynamiczna zmiana koloru paska, jeśli pamięć dobija do limitu (powyżej 85%)
        if (safePercent > 85) {
            barEl.classList.remove('bg-blue-600');
            barEl.classList.add('bg-red-500');
        } else {
            barEl.classList.remove('bg-red-500');
            barEl.classList.add('bg-blue-600');
        }

    } catch (error) {
        containerEl.innerText = 'Błąd połączenia';
        document.getElementById('used-memory').innerText = '---';
    }
}

// Pierwsze pobranie danych po wejściu na stronę
fetchData();

// Live Tracker: Uruchamiamy odświeżanie co 1000 milisekund (1 sekunda)
setInterval(fetchData, 1000);
