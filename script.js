const apiKey = "1c433d5df6cb4472b31171807232903";
const defaultCity = 'Istanbul';
const cityInput = document.querySelector('.city_input');
const searchButton = document.querySelector('.search_btn');
const cityName = document.querySelector('.city_name');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const errorMsg = document.querySelector('.error-msg');

// Fetch weather data from API
const getWeatherData = async (city) => {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
  const data = await response.json();
  return data;
};

// Update weather information on page
const updateWeatherInfo = (data) => {
  cityName.textContent = data.location.name;
  temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
  humidity.textContent = `Humidity: ${data.current.humidity}%`;
  errorMsg.style.display = 'none';
};

// Handle search button click event
searchButton.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (city === '') return;
  try {
    const data = await getWeatherData(city);
    updateWeatherInfo(data);
  } catch (error) {
    cityName.textContent = '';
    temperature.textContent = '';
    humidity.textContent = '';
    errorMsg.style.display = 'block';
  }
});

// Initialize with default city
(async () => {
  try {
    const data = await getWeatherData(defaultCity);
    updateWeatherInfo(data);
  } catch (error) {
    console.error(error);
  }
})();
