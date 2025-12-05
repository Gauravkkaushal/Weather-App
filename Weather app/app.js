// const API_KEY = 'a9c8bbab47d7a752c0963453fab539ca';
// const CITY = 'Delhi';

// async function fetchForecast() {
//   const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`);
//   const data = await res.json();
//   displayHourly(data.list.slice(0, 5));
//   displayDaily(data.list);
// }

// function displayHourly(hourlyData) {
//   const container = document.getElementById('hourly');
//   container.innerHTML = '';
//   hourlyData.forEach(hour => {
//     const date = new Date(hour.dt * 1000);
//     const item = document.createElement('div');
//     item.className = 'forecast-item';
//     item.innerHTML = `
//       <div>${date.getHours()}:00</div>
//       <img src="https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png" alt="">
//       <div>${Math.round(hour.main.temp)}°C</div>
//     `;
//     container.appendChild(item);
//   });
// }

// function displayDaily(dataList) {
//   const container = document.getElementById('daily');
//   container.innerHTML = '';

//   const dailyMap = new Map();

//   for (const entry of dataList) {
//     const date = new Date(entry.dt * 1000).toISOString().split('T')[0];
//     if (!dailyMap.has(date)) {
//       dailyMap.set(date, entry);
//     }
//   }

//   const dailyEntries = Array.from(dailyMap.values()).slice(0, 5);

//   dailyEntries.forEach(day => {
//     const date = new Date(day.dt * 1000);
//     const item = document.createElement('div');
//     item.className = 'forecast-item';
//     item.innerHTML = `
//       <div>${date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</div>
//       <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="">
//       <div>${Math.round(day.main.temp)}°C</div>
//     `;
//     container.appendChild(item);
//   });
// }

// fetchForecast();


const API_KEY = 'a9c8bbab47d7a752c0963453fab539ca';

// Trigger search on button click
document.getElementById('search').addEventListener('click', function (e) {
  e.preventDefault();
  const city = document.getElementById('input').value.trim();
  if (city) {
    fetchForecast(city);
  } else {
    alert("Please enter a city name");
  }
});

// Main function to fetch weather
async function fetchForecast(city) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
    const data = await res.json();

    if (data.cod !== "200") {
      alert("City not found!");
      return;
    }

    displayMain(data.list[0], city);         // display main info
    // console.log(data.list);
    displayHourly(data.list.slice(0, 5));    // next few hours
    displayDaily(data.list);                // next 5 days
  } catch (err) {
    console.error("Error fetching forecast:", err);
  }
}

// MAIN TEMPERATURE & DETAILS DISPLAY
function displayMain(todayData, city) {
  document.getElementById('temp').textContent = `${Math.round(todayData.main.temp)}°C`;
  document.querySelector('.temperature-one h3').textContent = todayData.weather[0].main;
  document.querySelector('.temperature-one p').textContent = `Today in ${city}, expect ${todayData.weather[0].description}.`;

  // Fill other boxes
  document.querySelector('.feel-like h2').textContent = `${Math.round(todayData.main.feels_like)}°`;
  document.querySelector('.humidity h2').textContent = `${todayData.main.humidity}%`;
  document.querySelector('.precipitation h2').textContent = `${todayData.pop * 100}%`; // probability of precipitation
  document.querySelector('.visibility h2').textContent = `${todayData.visibility / 1000} km`;

  // Wind speed
  document.querySelector('.wind-one .value').textContent = todayData.wind.speed;

  // UV Index not in forecast API, you'd need OneCall API or skip
  document.querySelector('.uv-one .value').textContent = "N/A";
  document.querySelector('.uv-one .note').textContent = "Unavailable";
}

// HOURLY
function displayHourly(hourlyData) {
  const container = document.getElementById('hourly');
  container.innerHTML = '';
  hourlyData.forEach(hour => {
    const date = new Date(hour.dt * 1000);
    const item = document.createElement('div');
    item.className = 'forecast-item';
    item.innerHTML = `
      <div>${date.getHours()}:00</div>
      <img src="https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png" alt="">
      <div>${Math.round(hour.main.temp)}°C</div>
    `;
    container.appendChild(item);
  });
}

// DAILY
function displayDaily(dataList) {
  const container = document.getElementById('daily');
  container.innerHTML = '';
  const dailyMap = new Map();

  for (const entry of dataList) {
    const date = new Date(entry.dt * 1000).toISOString().split('T')[0];
    if (!dailyMap.has(date)) {
      dailyMap.set(date, entry);
    }
  }

  const dailyEntries = Array.from(dailyMap.values()).slice(0, 5);

  dailyEntries.forEach(day => {
    const date = new Date(day.dt * 1000);
    const item = document.createElement('div');
    item.className = 'forecast-item';
    item.innerHTML = `
      <div>${date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</div>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="">
      <div>${Math.round(day.main.temp)}°C</div>
    `;
    container.appendChild(item);
  });
}

// Optionally load default city (like Delhi) on first load
fetchForecast("Delhi");




function createRainEffect() {
  const rainWrapper = document.querySelector('.rain-wrapper');
  const dropCount = 100; // Number of drops

  for (let i = 0; i < dropCount; i++) {
    const drop = document.createElement('div');
    drop.className = 'drop';

    // Random horizontal position
    drop.style.left = `${Math.random() * 100}vw`;

    // Random animation duration & delay
    drop.style.animationDuration = `${0.5 + Math.random()}s`;
    drop.style.animationDelay = `${Math.random() * 2}s`;

    // Random height
    drop.style.height = `${20 + Math.random() * 60}px`;

    rainWrapper.appendChild(drop);
  }
}

createRainEffect();
