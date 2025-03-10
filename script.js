// Particle Animation
function createParticles() {
    const container = document.getElementById('weatherContainer');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 10}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${5 + Math.random() * 5}s`;
        container.appendChild(particle);
    }
}

// Weather Data Fetch
const API_KEY = 'fbfebb64e1c7969f52534c989f9d9126';
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const tempValue = document.getElementById('tempValue');
const humidityValue = document.getElementById('humidityValue');
const windValue = document.getElementById('windValue');
const errorDiv = document.getElementById('error');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeatherData(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) fetchWeatherData(city);
    }
});

async function fetchWeatherData(city) {
    try {
        errorDiv.textContent = '';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        
        // Update weather values with animations
        tempValue.style.opacity = 0;
        setTimeout(() => {
            tempValue.textContent = `${Math.round(data.main.temp)}°C`;
            tempValue.style.opacity = 1;
        }, 300);
        
        humidityValue.textContent = `${data.main.humidity}%`;
        windValue.textContent = `${Math.round(data.wind.speed)} km/h`;
    } catch (error) {
        errorDiv.textContent = error.message;
        // Reset values on error
        tempValue.textContent = '-';
        humidityValue.textContent = '-';
        windValue.textContent = '-';
    }
}

// Initialize particles on load
createParticles(); 