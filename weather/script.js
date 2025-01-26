const submitButton = document.getElementById("submitButton");
const cityInput = document.getElementById("cityInput");
const card = document.getElementById("card");
const apiKey = "16d55fff3b09e922e142dd8dbf37506b";

const states = [
  "Not in US",
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];
const stateSelect = document.getElementById("stateSelect");
states.forEach(state => {
  const option = document.createElement("option");
  option.value = state;
  option.textContent = state;
  stateSelect.appendChild(option);
});

let selectedState;

stateSelect.addEventListener("change", (event) => {
  selectedState = event.target.value;
  if(selectedState === "Not in US"){
    selectedState = undefined;
  }
});

cityInput.addEventListener("click", ()=>{
  stateSelect.selectedIndex=0;
});

submitButton.addEventListener("click", async () => {
  const city = cityInput.value;

  if(city){
    try{
      const weatherData = await getWeatherData(city, selectedState);
      displayWeatherInfo(weatherData);
    }
    catch(error){
      console.error(error);
      displayError(error);
    }
  }
  else{
    displayError("Please enter a city");
  }
});

async function getWeatherData(city, state){
  let apiUrl;
  if(state){
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},US&appid=${apiKey}`;
  }
  else{
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  }

  const response = await fetch(apiUrl);

  if(!response.ok){
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
} 

function displayWeatherInfo(data){
  console.log(data);
  const {name: city, main: {temp, humidity}, wind: {speed}, weather: [{description, id}]} = data;
  
  const paragraphs = card.querySelectorAll('p');
  paragraphs.forEach(p => p.remove());
  
  const cityDisplay = document.createElement("p");
  const tempDisplay = document.createElement("p");
  const humidityWindDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${((temp-273.15)*9/5 + 32).toFixed(0)}°F`;
  humidityWindDisplay.textContent = `Humidity: ${humidity}% | Wind: ${(speed*3600/1609.344).toFixed(0)} mph`
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityWindDisplay.classList.add("humidityWindDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityWindDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
  switch(true){
    case (weatherId >= 200 && weatherId < 300):
      return "⛈️";
    case (weatherId >= 300 && weatherId < 400):
      return "🌧️";
    case (weatherId >= 500 && weatherId < 600):
      return "🌧️";
    case (weatherId >= 600 && weatherId < 700):
      return "❄️";
    case (weatherId >= 700 && weatherId <= 761):
        return "🌫️";
    case(weatherId === 762):
      return"🌋";
    case(weatherId === 771):
      return "💨";
    case(weatherId === 781):
      return "🌪️";
    case (weatherId === 800):
      return "☀️";
    case (weatherId >= 801 && weatherId < 810):
      return "☁️";
    default:
      return "❓";
  }
}

function displayError(message){
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  const paragraphs = card.querySelectorAll('p');
  paragraphs.forEach(p => p.remove());
  stateSelect.selectedIndex=0;

  card.appendChild(errorDisplay);
}
