
const apiKey = '63d14537514af23475ddc6307457502b'; // Replace with your actual OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', getWeatherData);

function getWeatherData() {
  const city = document.getElementById('city-dropdown').value.trim(); // Get selected city from dropdown
  if (!city) {
    alert('Please select a city!');
    return;
  }

  // Encode the city name to handle special characters
  const encodedCity = encodeURIComponent(city);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        updateWeatherInfo(data);
      } else {
        alert('City not found! Please try again.');
        resetWeatherInfo();
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('There was an error fetching the weather data. Please try again later.');
      resetWeatherInfo();
    });
}

function updateWeatherInfo(data) {
  const cityName = data.name;
  const temperature = `${data.main.temp} °C`;
  const weatherCondition = data.weather[0].description;
  const weatherIcon = data.weather[0].icon;
  const currentTime = new Date().toLocaleTimeString();

  document.getElementById('city-name').innerText = cityName;
  document.getElementById('temperature').innerText = temperature;
  document.getElementById('weather-condition').innerText = weatherCondition;
  document.getElementById('weather-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather icon">`;
  document.getElementById('current-time').innerText = `Current time: ${currentTime}`;

  changeBackgroundColor(weatherCondition);

  // Set an interval to update the current time every second
  setInterval(() => {
    document.getElementById('current-time').innerText = `Current time: ${new Date().toLocaleTimeString()}`;
  }, 1000);
}

function resetWeatherInfo() {
  document.getElementById('city-name').innerText = 'City Name';
  document.getElementById('temperature').innerText = 'Temperature';
  document.getElementById('weather-condition').innerText = 'Weather Condition';
  document.getElementById('weather-icon').innerHTML = ''; // Remove icon
  document.getElementById('current-time').innerText = 'Current Time';
}

function changeBackgroundColor(condition) {
  const body = document.body;

  if (condition.includes('clear')) {
    body.style.backgroundColor = '#87CEEB'; // Light blue for sunny
  } else if (condition.includes('cloud')) {
    body.style.backgroundColor = '#B0C4DE'; // Light gray for cloudy
  } else if (condition.includes('rain')) {
    body.style.backgroundColor = '#A9A9A9'; // Dark gray for rainy
  } else if (condition.includes('snow')) {
    body.style.backgroundColor = '#f0f8ff'; // Light white for snowy
  } else {
    body.style.backgroundColor = '#f0f0f0'; // Default light color for other conditions
  }
}
