
document.addEventListener('DOMContentLoaded', function() {
  const backgroundLayer = document.querySelector('.background-layer');
  const slider = document.getElementById('gradientSlider');
  let raveInterval;
//---------------------Background color changer---------------------------------
  function updateGradient() {
    const value = slider.value / 100;
    const lightBlue = [135, 206, 250];  // RGB values for light blue
    const darkBlue = [0, 0, 102];      // RGB values for dark blue
    const white =[250, 250, 250];
    const black =[0, 0, 0];
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
    // Add your voice logic here
    let temp = document.querySelector('h1').innerText
    let city = document.querySelector('h2').innerText;
    let weather = document.querySelector('h3').innerText;
    let textToSpeak = `${city} is experiencing ${weather}, it's currently ${temp}.`;

    // Filter available voices to find a female voice
    let femaleVoice = speechSynthesis.getVoices().find(voice => voice.name === 'Google UK English Female');

    if (femaleVoice) {
        let utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.voice = femaleVoice;
        utterance.rate = 0.8;

        window.speechSynthesis.speak(utterance);
        console.log('Voice button clicked!');
    } else {
        console.error('Female voice not found.');
    }
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

  function playYay() {
      // Create an Audio element
      const audio = new Audio('assets/sound/yay.ogg');
      const audio2 = new Audio('assets/soudnd/yay2.mp3');
      // Play the audio
      audio.play();
      audio2.play();
    }
//------------weather API URL calls and assignments-----------------------------

 // API and API URL
 const apiKey = "80c73df9bb32efa840373adfb21d4728";
 const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
 // get our input field button and main weather image
 const searchBox = document.querySelector(".search input");
 const searchBtn = document.querySelector(".search button");
 const weatherIcon = document.querySelector(".weather-icon");
 let textToSpeechMessage = ""

 // get weather data
 async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  
  // Get the error and weather elements
  const errorElement = document.querySelector(".error");
  const weatherElement = document.querySelector(".weather");

  // check city input is valid, if not, show an error
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
         //display data to console
         console.log(data);
        
          const textToSpeechMessage = `The weather in ${city} is ${data.weather[0].description}. The temperature is ${Math.round(data.main.temp)} degrees Celsius.`;
          // Now you can use textToSpeechMessage for your purpose, such as passing it to a text-to-speech API or displaying it in your application
          console.log(textToSpeechMessage);
         //use the data to decide which image should be shown
         if (data.weather[0].main == "Clouds") {
             weatherIcon.src = "assets/images/clouds.png";
         } else if (data.weather[0].main == "Clear") {
             weatherIcon.src = "assets/images/clear.png";
         } else if (data.weather[0].main == "Rain") {
             weatherIcon.src = "assets/images/rain.png";
         } else if (data.weather[0].main == "Drizzle") {
             weatherIcon.src = "assets/images/drizzle.png";
         } else if (data.weather[0].main == "Fog") {
             weatherIcon.src = "assets/images/mist.png";
         } else {
             weatherIcon.src = "assets/images/snow.png";
         }
         //Weather div is hidden by default, if city is valid display the weather content div
         document.querySelector(".weather").style.display = "block";
         document.querySelector(".error").style.display = "none";
     }
 }
 // add listener to the search button
 searchBtn.addEventListener("click", () => {
     //run function check weather passing it the value in our text input field
     checkWeather(searchBox.value);
 })


 const complimentsForChildren = [
  "You're so smart!",
  "You're a great listener.",
  "You have a wonderful imagination.",
  "You're a fantastic friend.",
  "You're really good at sharing.",
  "You have a heart of gold.",
  "You're so brave!",
  "You're a fantastic helper.",
  "You're so creative!",
  "You have a great sense of humor.",
  "You're a superstar!",
  "You're so kind to others.",
  "You're really good at trying new things.",
  "You're so caring and thoughtful.",
  "You're a great problem solver.",
  "You're a ray of sunshine!",
  "You make everyone around you happier.",
  "You're a great team player.",
  "You're so full of energy!",
  "You have the best ideas.",
  "You're so good at being you!",
  "You're a wonderful artist.",
  "You're so curious and eager to learn.",
  "You're a champion!",
  "You're a shining star.",
  "You're so good at making friends.",
  "You're a little explorer!",
  "You're a wonderful bundle of joy.",
  "You're so good at being kind.",
  "You have a heart as big as the ocean.",
  "You're a treasure!",
  "You're a joy to be around.",
  "You're so loved.",
  "You're a true delight.",
  "You're a rainbow in someone's cloud.",
  "You're so good at being helpful.",
  "You're a great adventurer!",
  "You have the best hugs.",
  "You're so good at taking turns.",
  "You're so full of wonder.",
  "You're a true superhero!",
  "You have a magical smile.",
  "You're so good at listening to your heart.",
  "You're a little miracle!",
  "You're so good at making the world brighter.",
  "You're a little star!",
  "You're so good at being you!",
  "You're a fantastic dreamer.",
  "You're a little ball of sunshine.",
  "You're so good at spreading happiness.",
  "You're a champion of kindness.",
  "You're a little blessing.",
  "You're so good at being brave.",
  "You're a little miracle-worker!",
  "You're so good at being thoughtful.",
  "You're a little genius!",
  "You're so good at being silly.",
  "You're a little spark of magic.",
  "You're so good at being caring.",
  "You're a little dream come true!",
  "You're so good at making wishes.",
  "You're a little piece of heaven."
];

function getRandomComplimentForChildren() {
  const randomIndex = Math.floor(Math.random() * complimentsForChildren.length);
  return complimentsForChildren[randomIndex];
}

function readCompliment() {
  const compliment = getRandomComplimentForChildren();
  const speech = new SpeechSynthesisUtterance(compliment);
  // Find the female UK voice
  const femaleUKVoice = speechSynthesis.getVoices().find(voice => voice.name === 'Google UK English Female');
  if (femaleUKVoice) {
      speech.voice = femaleUKVoice;
      speech.rate = 1;
      window.speechSynthesis.speak(speech);
  } else {
      console.error('Female UK voice not found.');
  }
}

const button = document.getElementById("complimentButton");
button.addEventListener("click", readCompliment);