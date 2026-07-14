// ==========================================
// ------- Weather Widget -------
// ==========================================

// Global reference so that the retry button inside the widget can invoke it
let loadWeather;

document.addEventListener('DOMContentLoaded', () => {
  const weatherContent = document.getElementById('weather-content');

  // Maps Open-Meteo codes to readable terms and icons
  function getWeatherCondition(code) {
    const conditions = {
      0: { desc: 'Clear sky', icon: 'ri-sun-line' },
      1: { desc: 'Mainly clear', icon: 'ri-sun-cloudy-line' },
      2: { desc: 'Partly cloudy', icon: 'ri-cloudy-line' },
      3: { desc: 'Overcast', icon: 'ri-cloud-windy-line' },
      45: { desc: 'Foggy', icon: 'ri-mist-line' },
      48: { desc: 'Depositing rime fog', icon: 'ri-mist-line' },
      51: { desc: 'Light drizzle', icon: 'ri-drizzle-line' },
      55: { desc: 'Dense drizzle', icon: 'ri-drizzle-line' },
      61: { desc: 'Slight rain', icon: 'ri-showers-line' },
      63: { desc: 'Moderate rain', icon: 'ri-rainy-line' },
      65: { desc: 'Heavy rain', icon: 'ri-rainy-fill' },
      71: { desc: 'Slight snow', icon: 'ri-snowy-line' },
      73: { desc: 'Moderate snow', icon: 'ri-snowy-line' },
      75: { desc: 'Heavy snow', icon: 'ri-snowy-fill' },
      80: { desc: 'Slight rain showers', icon: 'ri-showers-fill' },
      81: { desc: 'Moderate rain showers', icon: 'ri-showers-fill' },
      82: { desc: 'Violent rain showers', icon: 'ri-showers-fill' },
      95: { desc: 'Thunderstorm', icon: 'ri-thunderstorms-line' },
      96: { desc: 'Thunderstorm with hail', icon: 'ri-thunderstorms-fill' },
      99: { desc: 'Thunderstorm with heavy hail', icon: 'ri-thunderstorms-fill' }
    };
    return conditions[code] || { desc: 'Unspecified', icon: 'ri-temp-cloud-line' };
  }

  // Fetch weather from latitude and longitude coordinates
  function fetchWeather(lat, lon, locationName) {
    if (!weatherContent) return;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Weather API request failed');
        }
        return response.json();
      })
      .then(data => {
        const current = data.current;
        const condition = getWeatherCondition(current.weather_code);
        const temperature = Math.round(current.temperature_2m);
        const windSpeed = current.wind_speed_10m;
        const humidity = current.relative_humidity_2m;

        // Update Weather Widget Card UI
        weatherContent.className = 'weather-content';
        weatherContent.innerHTML = `
          <div class="weather-data-wrap">
            <div class="weather-main">
              <i class="${condition.icon} text-accent" style="font-size: 2.2rem; color: var(--accent-color);"></i>
              <div class="weather-icon-temp">
                <span class="weather-temp-num">${temperature}°C</span>
                <span class="weather-desc-text">${condition.desc}</span>
              </div>
            </div>
            <div class="weather-details-grid">
              <div class="weather-loc-name">
                <i class="ri-map-pin-2-line"></i> ${locationName}
              </div>
              <div class="weather-detail-item">
                <span>Humidity:</span> <strong>${humidity}%</strong>
              </div>
              <div class="weather-detail-item">
                <span>Wind:</span> <strong>${windSpeed} km/h</strong>
              </div>
            </div>
          </div>
        `;
      })
      .catch(error => {
        console.error("Open-Meteo request failed", error);
        showWeatherError(locationName);
      });
  }

  // Render clean Error State in widget
  function showWeatherError(locationName) {
    if (!weatherContent) return;

    weatherContent.className = 'weather-content';
    weatherContent.innerHTML = `
      <div class="weather-error">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <div>
          <span>Failed to load weather</span>
          <button onclick="loadWeather()" style="background: none; border: none; text-decoration: underline; color: var(--accent-color); cursor: pointer; font-size: 0.8rem; display: block; padding-top: 2px;">Retry</button>
        </div>
      </div>
    `;
  }

  // Load Weather triggers Geolocation flow
  loadWeather = function() {
    if (!weatherContent) return;

    // Add initial loading state
    weatherContent.className = 'weather-content loading';
    weatherContent.innerHTML = `
      <div class="weather-loader">
        <i class="fa-solid fa-circle-notch fa-spin"></i> Locating...
      </div>
    `;

    const fallbackLat = 40.7128;  // New York latitude
    const fallbackLon = -74.0060; // New York longitude
    const fallbackName = "New York (Default)";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lon = position.coords.longitude.toFixed(4);
          fetchWeather(lat, lon, "Local Weather");
        },
        (error) => {
          console.warn("Geolocation permission denied/failed. Loading default city.", error);
          fetchWeather(fallbackLat, fallbackLon, fallbackName);
        },
        { timeout: 8000 }
      );
    } else {
      // Geolocation not supported by browser
      fetchWeather(fallbackLat, fallbackLon, fallbackName);
    }
  };

  loadWeather();
});
