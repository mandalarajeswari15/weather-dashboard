const cityInput = document.getElementById("cityInput");

const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");

const temperature = document.getElementById("temperature");

const humidity = document.getElementById("humidity");

const wind = document.getElementById("wind");

const message = document.getElementById("message");


async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {

        message.textContent =
            "Please enter a city name.";

        return;
    }


    try {

        // 1. Find city coordinates

        const geoURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;


        const geoResponse =
            await fetch(geoURL);


        const geoData =
            await geoResponse.json();


        if (!geoData.results) {

            message.textContent =
                "City not found.";

            return;
        }


        // 2. Get location

        const location =
            geoData.results[0];


        const latitude =
            location.latitude;


        const longitude =
            location.longitude;


        // 3. Weather API

        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh`;


        // 4. Fetch weather

        const weatherResponse =
            await fetch(weatherURL);


        // 5. Convert to JSON

        const weatherData =
            await weatherResponse.json();


        // 6. Get current weather

        const current =
            weatherData.current;


        // 7. Display data

        cityName.textContent =
            location.name;


        temperature.textContent =
            current.temperature_2m + " °C";


        humidity.textContent =
            current.relative_humidity_2m + " %";


        wind.textContent =
            current.wind_speed_10m + " km/h";


        message.textContent = "";

    }


    catch (error) {

        message.textContent =
            "Unable to fetch weather data.";

        console.error(error);

    }

}


// Search button

searchBtn.addEventListener(
    "click",
    getWeather
);


// Enter key

cityInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            getWeather();

        }

    }
);