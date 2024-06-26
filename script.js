const apikey = "ab78ef422b25a7c7d9fe143158c63595";

const weatherDataEl = document.querySelector("#weather-data")

const cityInputEL = document.querySelector("#input-box");

const formEl = document.querySelector("form")

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue = cityInputEL.value;
    getWeatherData(cityValue);
    
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
        
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }

        const data = await response.json();
        console.log(data);

        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [
            `Feels liks: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${Math.round(data.main.humidity)}%`,
            `Wind speed: ${data.wind.speed} m/s`
        ]

        weatherDataEl.querySelector("#icon").innerHTML =`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`;

        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;

        weatherDataEl.querySelector(".description").textContent = `${description}`;

        weatherDataEl.querySelector(".details").innerHTML = details.map((details) => `<div>${details}</div>`).join("");


    } catch (error) {
            weatherDataEl.querySelector("#icon").innerHTML ="";

            weatherDataEl.querySelector(".temperature").textContent = "";

            weatherDataEl.querySelector(".description").textContent = `An error happened, please try again later`;

            weatherDataEl.querySelector(".details").innerHTML = "";        
    }
}
