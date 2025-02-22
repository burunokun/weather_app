const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const weatherDescription = document.getElementById("weather-description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");

const apiUrl = "https://wttr.in"

async function fetchWeather(city) {
    loading.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    try {
        const response = await fetch(`${apiUrl}/${city}?format=j2`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const cityLocation = data.nearest_area[0]["areaName"][0]["value"];
        const cityCountry = data.nearest_area[0]["country"][0]["value"];
        cityName.textContent = `${cityLocation}, ${cityCountry}`;

        const currentWeather = data.current_condition[0];
        const weatherText = `Currently: ${currentWeather["weatherDesc"][0]["value"]}`;
        weatherDescription.textContent = weatherText;

        const temperatureText = `Temperature: ${currentWeather["FeelsLikeC"]}°C`;
        temperature.textContent = temperatureText;

        const humidityText = `Humidity: ${currentWeather["humidity"]}%`;
        humidity.textContent = humidityText;

        loading.classList.add("hidden");

    } catch (err) {
        loading.classList.add("hidden");
        errorMessage.classList.remove("hidden");
        errorMessage.textContent = err.message;
    }
}

searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});
