
interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: { description: string }[];
  name: string;
}

interface ErrorResponse {
  cod: string;
  message: string;
}

type ApiResponse = WeatherData | ErrorResponse;

const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const fetchBtn = document.getElementById("fetchBtn") as HTMLButtonElement;
const weatherResult = document.getElementById("weatherResult") as HTMLDivElement;

const API_KEY = "YOUR_API_KEY_HERE";

async function fetchWeather(city: string): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return await response.json();
  } catch {
    return { cod: "network_error", message: "Network error occurred" };
  }
}

function displayWeather(data: ApiResponse): void {
  weatherResult.innerHTML = "";

  if ("main" in data) {
    const weatherData = data as WeatherData;
    weatherResult.innerHTML = `
      <p><strong>City:</strong> ${weatherData.name}</p>
      <p><strong>Temperature:</strong> ${weatherData.main.temp} °C</p>
      <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
      <p><strong>Condition:</strong> ${weatherData.weather[0].description}</p>
    `;
  } else {
    const errorData = data as ErrorResponse;
    weatherResult.innerHTML = `<p class="error">Error: ${errorData.message}</p>`;
  }
}

fetchBtn.addEventListener("click", async (): Promise<void> => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherResult.innerHTML = `<p class="error">Please enter a city name.</p>`;
    return;
  }

  const data = await fetchWeather(city);
  displayWeather(data);
});
