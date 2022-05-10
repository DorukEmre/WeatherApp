const button = document.querySelector('#button');
button.addEventListener('click', getWeather);

function getWeather() {
    const main = document.querySelector('.main');

    const searchValue = document.querySelector('#search').value;
    const urlCity = `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${config.KEY_OWM}`    

    let cityObject = {};

    fetch(urlCity, {mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            // console.log(data[0].name)

            return cityObject = {
                name: data[0].name, 
                country: data[0].country, 
                lat: data[0].lat, 
                lon: data[0].lon
            };
        })
        .then(cityObject => fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityObject.lat}&lon=${cityObject.lon}&appid=${config.KEY_OWM}`, {mode: 'cors'}))
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            cityObject.weather = data.weather[0].main 
            cityObject.description = data.weather[0].description
            cityObject.temperature = Math.round(data.main.temp - 273.15)
            // console.log(cityObject)

            document.querySelector('.city').textContent = `${cityObject.name}, ${cityObject.country}`

            document.querySelector('.temperature').textContent = cityObject.temperature

            document.querySelector('.description').textContent = cityObject.description
            
            // const date = document.querySelector('.date');
            // date.textContent = cityObject.date
            
            return cityObject
        })
        .then(cityObject => fetch(`https://api.unsplash.com/search/photos?query=${cityObject.name}-${cityObject.description}&client_id=${config.KEY_US}`, {mode: 'cors'}))
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            const imageURL = `${data.results[Math.floor((Math.random() * 10))].urls.regular}&h=600`
            // console.log(imageURL)
            document.querySelector('img').src = imageURL
            document.querySelector('img').alt = cityObject.description
        })
        .catch(err => {
            console.log(`error ${err}`)
        });    
}