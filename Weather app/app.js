const API_KEY = 'a9c8bbab47d7a752c0963453fab539ca';

// Button Search
document.getElementById('search').addEventListener('click', (e) => {
  e.preventDefault();
  const city = document.getElementById('input').value.trim();
  if (city) {
    fetchWeather(city);
  }
});

// MAIN FETCH FUNCTION
async function fetchWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );

    const data = await res.json();

    // ✅ FIXED CITY CHECK
    if (data.cod != 200) {
      alert(data.message || "City not found");
      return;
    }

    updateMain(data.list[0], city);
    showHourly(data.list.slice(0, 5));
    showDaily(data.list);
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong!");
  }
}

// UPDATE MAIN UI
function updateMain(d, city) {
  document.getElementById('temp').textContent = `${Math.round(d.main.temp)}°C`;
  document.querySelector('.temperature-one h3').textContent = d.weather[0].main;
  document.querySelector('.temperature-one p').textContent =
    `Today in ${city}, expect ${d.weather[0].description}.`;

  document.querySelector('.feel-like h2').textContent =
    `${Math.round(d.main.feels_like)}°`;

  document.querySelector('.humidity h2').textContent =
    `${d.main.humidity}%`;

  document.querySelector('.visibility h2').textContent =
    `${(d.visibility / 1000).toFixed(1)} km`;

  document.querySelector('.precipitation h2').textContent =
    `${Math.round(d.pop * 100)}%`;

  document.querySelector('.wind-one .value').textContent =
    `${d.wind.speed} m/s`;
}

// HOURLY FORECAST
function showHourly(data) {
  const box = document.getElementById('hourly');
  box.innerHTML = '';

  data.forEach(h => {
    const time = new Date(h.dt * 1000).getHours();
    box.innerHTML += `
      <div class="forecast-item">
        <div>${time}:00</div>
        <img src="https://openweathermap.org/img/wn/${h.weather[0].icon}@2x.png">
        <div>${Math.round(h.main.temp)}°</div>
      </div>
    `;
  });
}

// DAILY FORECAST
function showDaily(list) {
  const box = document.getElementById('daily');
  box.innerHTML = '';

  const days = new Map();

  list.forEach(d => {
    const date = new Date(d.dt * 1000).toDateString();
    if (!days.has(date)) {
      days.set(date, d);
    }
  });

  [...days.values()].slice(0, 5).forEach(d => {
    box.innerHTML += `
      <div class="forecast-item">
        <div>${new Date(d.dt * 1000).toLocaleDateString('en-GB', {
          weekday: 'short'
        })}</div>
        <img src="https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png">
        <div>${Math.round(d.main.temp)}°</div>
      </div>
    `;
  });
}

// 🌧️ RAIN EFFECT
function createRain() {
  const wrap = document.querySelector('.rain-wrapper');
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = (0.5 + Math.random()) + 's';
    wrap.appendChild(drop);
  }
}

createRain();

// ✅ DEFAULT CITY = DELHI
fetchWeather("Delhi");
