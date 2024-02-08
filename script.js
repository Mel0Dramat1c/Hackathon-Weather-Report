document.addEventListener('DOMContentLoaded', function () {
  const backgroundLayer = document.querySelector('.background-layer');
  const slider = document.getElementById('gradientSlider');
  let raveInterval;
  let raveAudio;

  //---------------------Background color changer---------------------------------
  function updateGradient() {
    const value = slider.value / 100;
    const lightBlue = [135, 206, 250];  // RGB values for light blue
    const darkBlue = [0, 0, 102];      // RGB values for dark blue
    const white = [250, 250, 250];
    const black = [0, 0, 0];
    const blendedColor = blendColors(lightBlue, darkBlue, value);
    const blendedColor2 = blendColors2(white, black, value);
    backgroundLayer.style.transition = 'background 0.5s ease-in-out';
    backgroundLayer.style.background = `linear-gradient(to bottom, rgb(${blendedColor.join(',')}), rgb(${blendedColor2.join(',')})`;
  }

  window.updateGradient = updateGradient; // Make updateGradient globally accessible

  // Function to blend two colors
  function blendColors(color1, color2, ratio) {
    const blendedColor = color1.map((channel, index) =>
      Math.round(channel * (1 - ratio) + color2[index] * ratio)
    );
    return blendedColor;
  }

  function blendColors2(color1, color2, ratio) {
    const blendedColor2 = color1.map((channel, index) =>
      Math.round(channel * (1 - ratio) + color2[index] * ratio)
    );
    return blendedColor2;
  }

  //----------------speech to text FUNCTIONS-----------------------
  function voice() {
    const city = document.querySelector(".city").innerHTML;
    const description = document.querySelector(".description").innerHTML;
    const temperature = document.querySelector(".temp").innerHTML.replace("°c", "");

    // Speak the weather information
    speakWeatherInfo(city, description, temperature);
  }

  //----------------RAVE FUNCTIONS-----------------------
  function rave() {
    // Toggle rave effect
    if (raveInterval) {
      // If raveInterval is defined, clear the interval to stop rave mode
      clearInterval(raveInterval);
      raveInterval = undefined;

      // Stop the rave audio if it's playing
      if (raveAudio) {
        raveAudio.pause();
        raveAudio.currentTime = 0;
      }
    } else {
      // Start rave mode: Rapidly change background color through hue rotation
      let hue = 0;
      raveInterval = setInterval(() => {
        hue = (hue + 10) % 360;
        backgroundLayer.style.transition = 'background 0.1s ease-in-out';
        backgroundLayer.style.background = `linear-gradient(to bottom, hsl(${hue}, 100%, 80%), hsl(${(hue + 180) % 360}, 100%, 80%))`;
      }, 100);

      // Start playing the rave audio in a loop
      raveAudio = new Audio('music.mp3'); //  audio file
      raveAudio.loop = true;
      raveAudio.play();
    }
  }

  window.updateGradient = updateGradient;
  window.voice = voice;
  window.rave = rave;
});
// Function to speak the weather information

//* to be removed once Tadhg completes speech JS
function speakWeatherInfo(city, description, temperature) {
  const textToSpeechMessage = `The weather in ${city} is ${description}. The temperature is ${Math.round(temperature)} degrees Celsius. The local time is ${new Date().toLocaleTimeString()}`;
  console.log(textToSpeechMessage);

  // Use the SpeechSynthesis API to speak the text
  const utterance = new SpeechSynthesisUtterance(textToSpeechMessage);
  window.speechSynthesis.speak(utterance);
}
function playYay() {
  // Create an Audio element
  const audio = new Audio('yay.ogg');
  const audio2 = new Audio('yay2.mp3');
  // Play the audio
  audio.play();
  audio2.play();
}

//------------weather API URL calls and assignments-----------------------------
// API and API URL
const apiKey = "80c73df9bb32efa840373adfb21d4728";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to get local time offset in hours for the given city
async function getTimezoneOffset(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod && data.cod === "404") {
      throw new Error('City not found');
    }

    if (data.timezone) {
      // Convert timezone offset from seconds to hours
      return data.timezone / 3600;
    } else {
      throw new Error('Timezone information not available');
    }
  } catch (error) {
    console.error('Error fetching timezone offset:', error.message);
    throw error;
  }
}

// Function to update gradient based on local time
async function updateGradientBasedOnTime(city) {
  try {
    const timezoneOffset = await getTimezoneOffset(city);

    // Calculate current time in the given timezone
    const currentTime = new Date();
    const localTime = new Date(currentTime.getTime() + timezoneOffset * 60 * 60 * 1000);
    const hours = localTime.getHours();

    // Adjust the slider position based on local time
    const slider = document.getElementById('gradientSlider');
    slider.value = calculateSliderPosition(hours);

    // Update the gradient
    updateGradient();

    // Log the city local time to the console
    console.log(`Local time for ${city}: ${localTime.toLocaleTimeString()}`);

    // Speak the weather information with the city's local time
    const description = document.querySelector(".description").innerHTML;
    const temperature = document.querySelector(".temp").innerHTML.replace("°c", "");
    speakWeatherInfo(city, description, temperature, localTime.toLocaleTimeString());
  } catch (error) {
    // Handle the error (e.g., display an error message)
    console.error('Error updating gradient based on time:', error.message);
  }
}


// Call this function when fetching weather data
async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const errorElement = document.querySelector(".error");
    const weatherElement = document.querySelector(".weather");

    if (response.status == 404) {
      errorElement.style.display = "block";
      weatherElement.style.display = "none";
    } else {
      let data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
      document.querySelector(".description").innerHTML = data.weather[0].description;

      // Update the weather icon
      const weatherCode = data.weather[0].id;
      const iconSrc = getWeatherIcon(weatherCode);
      weatherIcon.src = iconSrc;

      // Speak the weather information
      //speakWeatherInfo(data.name, data.weather[0].description, data.main.temp);

      // Show the weather element
      weatherElement.style.display = "block";
      errorElement.style.display = "none";

      // Update gradient based on local time
      await updateGradientBasedOnTime(city);
    }
  } catch (error) {
    console.error('Error checking weather:', error.message);
  }
}

// Function to calculate slider position based on hours
function calculateSliderPosition(hours) {
  return (hours / 24) * 100;
}

// Function to blend two colors
function blendColors(color1, color2, ratio) {
  const blendedColor = color1.map((channel, index) =>
    Math.round(channel * (1 - ratio) + color2[index] * ratio)
  );
  return blendedColor;
}

// Function to update gradient
function updateGradient() {
  const slider = document.getElementById('gradientSlider');
  const value = slider.value / 100;
  const lightBlue = [135, 206, 250]; // RGB values for light blue
  const darkBlue = [0, 0, 102]; // RGB values for dark blue
  const blendedColor = blendColors(lightBlue, darkBlue, value);

  document.body.style.transition = 'background 0.5s ease-in-out';
  document.body.style.background = `linear-gradient(to bottom, rgb(${blendedColor.join(',')}), rgb(${blendedColor.join(',')}))`;
}

// Function to get weather icon based on weather code
function getWeatherIcon(code) {
  if (code >= 200 && code < 300) {
    return "/images/thunderstorm.png";
  } else if (code >= 300 && code < 400) {
    return "/images/drizzle.png";
  } else if (code >= 500 && code < 600) {
    return "/images/rain.png";
  } else if (code >= 600 && code < 700) {
    return "/images/snow.png";
  } else if (code >= 700 && code < 800) {
    return "/images/mist.png";
  } else if (code === 800) {
    return "/images/clear.png";
  } else if (code > 800 && code < 900) {
    return "/images/clouds.png";
  } else {
    return "images/unknown.png";
  }
}

// Function to speak the weather information
function speakWeatherInfo(city, description, temperature, localTime) {
  const textToSpeechMessage = `The weather in ${city} is ${description}. The temperature is ${Math.round(temperature)} degrees Celsius. The local time is ${localTime}`;
  console.log(textToSpeechMessage);

  // Use the SpeechSynthesis API to speak the text
  const utterance = new SpeechSynthesisUtterance(textToSpeechMessage);
  window.speechSynthesis.speak(utterance);
}


// Add listener to the search button
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});