const hamButton = document.querySelector('#hamButton');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('responsive');
});



//======= Weather =======//

// Set your API key and locationName
const apiKey = '9f3292324049b798caa4a57c365df48d';
const locationName = 'Carlsbad, US'; // Desired location

// Get references to the DOM elements
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const humidityElement = document.querySelector('.humidity');
const dayElements = document.querySelectorAll('.day');
const tempElements = document.querySelectorAll('.temp');
const weatherCard = document.querySelector(".weather");

// Fetch the weather data from the OpenWeather API
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=imperial&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Update the DOM elements with the fetched data
    temperatureElement.textContent = `${data.main.temp}°F`;
    descriptionElement.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
  });

// Fetch the 3-day weather forecast from the OpenWeather API
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&units=imperial&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Update the DOM elements with the fetched data
    for (let i = 0; i < 3; i++) {
      const dayData = data.list[i*8]; // Get the data for the corresponding day (every 8th element)
      dayElements[i].textContent = new Date(dayData.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
      tempElements[i].textContent = `${dayData.main.temp}°F`;

      // Set the weather image
      const iconUrl = `https://openweathermap.org/img/w/${dayData.weather[0].icon}.png`;
      const weatherImage = document.createElement('img');
      weatherImage.src = iconUrl;
      weatherImage.alt = dayData.weather[0].description;
      const forecastDiv = dayElements[i].parentNode;
      forecastDiv.insertBefore(weatherImage,forecastDiv.children[1]);
    }
  });

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=imperial&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Update the DOM elements with the fetched data
    temperatureElement.textContent = `${data.main.temp}°F`;
    descriptionElement.textContent = data.weather[0].description;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;

    // Set the weather image
    const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const weatherImage = document.createElement('img');
    weatherImage.src = iconUrl;
    weatherImage.alt = data.weather[0].description;
    weatherCard.insertBefore(weatherImage,weatherCard.children[1]);
  });

// ======= Drinks =======//
    const numDrinksDisplay = document.getElementById("drink-count");

    let numDrinks = localStorage.numDrinks

    if (numDrinks != undefined) {
        numDrinksDisplay.innerText = numDrinks;

    } else {
        numDrinksDisplay.innerText = 0;
        localStorage.numDrinks = 0;
    }

// ======== Fruit Data =======//
const url = "https://github.com/avril-eg/Bountiful-Foods/blob/main/fruit-data.json"

// Fetch data from API
fetch(url)
.then(response => response.json())
.then(data => {
    const fruits = data;

        const fruitSelect1 = document.getElementById("fruit1");
        const fruitSelect2 = document.getElementById("fruit2");
        const fruitSelect3 = document.getElementById("fruit3");

        // loop through the fruit names array and create an option element for each fruit
        fruits.forEach((fruit) => {

            let option = document.createElement("option");
            option.value = fruit.name;
            option.text = fruit.name;

            fruitSelect1.appendChild(option.cloneNode(true));
            fruitSelect2.appendChild(option.cloneNode(true));
            fruitSelect3.appendChild(option.cloneNode(true));
        });
})
.catch(error => console.log(error));




const form = document.getElementById("order-content");
const orderInfo = document.getElementById("order-info");

const orderForm = document.getElementById('order-form');
const orderCount = localStorage.getItem('orderCount') || 0;


form.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent form submission from refreshing the page

  // get form input values
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const fruit1 = document.getElementById("fruit1").value;
  const fruit2 = document.getElementById("fruit2").value;
  const fruit3 = document.getElementById("fruit3").value;
  const beverage = document.querySelector('input[name="beverage"]:checked').value;
  const ice = document.querySelector('input[name="ice"]:checked').value;
  const instructions = document.getElementsByName("message")[0].value;


  document.getElementById('user-order').style.display = 'flex';

  // update order-info div with user's information
  orderInfo.innerHTML = `
    <h2>Order Information</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Fruit 1:</strong> ${fruit1}</p>
    <p><strong>Fruit 2:</strong> ${fruit2}</p>
    <p><strong>Fruit 3:</strong> ${fruit3}</p>
    <p><strong>Smoothie Base:</strong> ${beverage}</p>
    <p><strong>Ice:</strong> ${ice}</p>
    <p><strong>Instructions:</strong> ${instructions}</p>
  `;

  

  var calories = 0;
  var carbs = 0;
  var protein = 0;
  var fat = 0;
  var sugar = 0;

  if (beverage == 'milk') {
    calories += 120;
    carbs += 30;
    protein += 20;
    fat += 4;
    sugar += 1.5;
  } 


    // Fetch data from API
    fetch("https://github.com/avril-eg/Bountiful-Foods/blob/main/fruit-data.json")
    .then(response => response.json())
    .then(data => {
        const fruits = data;


        fruits.forEach((fruit) => {
            if (fruit.name == fruit1)
            {
                
                calories += fruit["nutritions"]["calories"];
                carbs += fruit["nutritions"]["carbohydrates"];
                protein += fruit["nutritions"]["protein"];
                fat += fruit["nutritions"]["fat"];
                sugar += fruit["nutritions"]["sugar"];                
            }

            if (fruit.name == fruit2)
            {
                calories += fruit["nutritions"]["calories"];
                carbs += fruit["nutritions"]["carbohydrates"];
                protein += fruit["nutritions"]["protein"];
                fat += fruit["nutritions"]["fat"];
                sugar += fruit["nutritions"]["sugar"]; 
            }

            if (fruit.name == fruit3)
            {
                calories += fruit["nutritions"]["calories"];
                carbs += fruit["nutritions"]["carbohydrates"];
                protein += fruit["nutritions"]["protein"];
                fat += fruit["nutritions"]["fat"];
                sugar += fruit["nutritions"]["sugar"]; 
            }

        });

        document.getElementById('calories').innerHTML = (calories * 2).toFixed(1);
        document.getElementById('protein').innerHTML = (protein * 2).toFixed(1);
        document.getElementById('carbs').innerHTML = (carbs * 2).toFixed(1);
        document.getElementById('fat').innerHTML = (fat * 2).toFixed(1);
        document.getElementById('sugar').innerHTML = (sugar * 2).toFixed(1);

    })
    .catch(error => console.log(error));

    event.preventDefault();
    localStorage.setItem('drink-count', Number(orderCount) + 1);
    alert(` You've created' ${Number(orderCount) + 1} custom drinks.`);


});
