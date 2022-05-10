// check https://open-platform.theguardian.com/explore/

const button = document.querySelector('#button');
button.addEventListener('click', getWeather);

// function getWeather() {
//     const main = document.querySelector('.main');
//     // while (main.firstChild) {
//     //     main.removeChild(main.lastChild);
//     // }

//     const searchValue = document.querySelector('#search').value;
//     const urlCity = `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=293571a53ca7d6c64d41523bb89b2cd1`
    

//     let cityObject = {};

//     fetch(urlCity, {mode: 'cors'})
//         .then(response => response.json())
//         .then(data => {

//             console.log(data)
//             console.log(data[0].name)
//             cityObject = {
//                 name: data[0].name, 
//                 country: data[0].country, 
//                 lat: data[0].lat, 
//                 lon: data[0].lon
//             };

//             console.log(cityObject)
//             const urlLatLon = `https://api.openweathermap.org/data/2.5/weather?lat=${cityObject.lat}&lon=${cityObject.lon}&appid=293571a53ca7d6c64d41523bb89b2cd1`;

//             fetch(urlLatLon, {mode: 'cors'})
//                 .then(response => response.json())
//                 .then(data => {

//                     console.log(data)

//                     cityObject.weather = data.weather[0].main 
//                     cityObject.description = data.weather[0].description
//                     cityObject.temperature = Math.round(data.main.temp - 273.15)
                            
//                     console.log(cityObject)

//                     document.querySelector('.city').textContent = `${cityObject.name}, ${cityObject.country}`

//                     const date = document.querySelector('.date');
//                     // date.textContent = cityObject.date

//                     document.querySelector('.temperature').textContent = cityObject.temperature

//                     document.querySelector('.description').textContent = cityObject.description

//                     const imageUrl = `https://api.unsplash.com/search/photos?page=1&query=${cityObject.description}`

//                     fetch(imageUrl, {mode: 'cors'})
//                         .then(response => response.json())
//                         .then(data => {
//                             console.log(data)
//                         })
//                         .catch(err => {
//                             console.log(`error ${err}`)
//                         });

//                 })
//                 .catch(err => {
//                     console.log(`error ${err}`)
//                 });

            
//         })
//         .catch(err => {
//             console.log(`error ${err}`)
//         });

    
// }

function getWeather() {
    const main = document.querySelector('.main');

    const searchValue = document.querySelector('#search').value;
    const urlCity = `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=293571a53ca7d6c64d41523bb89b2cd1`
    

    let cityObject = {};

    fetch(urlCity, {mode: 'cors'})
        .then(response => response.json())
        .then(data => {

            console.log(data)
            console.log(data[0].name)
            return cityObject = {
                name: data[0].name, 
                country: data[0].country, 
                lat: data[0].lat, 
                lon: data[0].lon
            };
        })
        .then(cityObject => fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityObject.lat}&lon=${cityObject.lon}&appid=293571a53ca7d6c64d41523bb89b2cd1`, {mode: 'cors'}))
        .then(response => response.json())
        .then(data => {

            console.log(data)

            cityObject.weather = data.weather[0].main 
            cityObject.description = data.weather[0].description
            cityObject.temperature = Math.round(data.main.temp - 273.15)
                    
            console.log(cityObject)

            document.querySelector('.city').textContent = `${cityObject.name}, ${cityObject.country}`

            const date = document.querySelector('.date');
            // date.textContent = cityObject.date

            document.querySelector('.temperature').textContent = cityObject.temperature

            document.querySelector('.description').textContent = cityObject.description
            
            return cityObject
        })
        .then(cityObject => fetch(`https://api.unsplash.com/search/photos?query=${cityObject.description}&client_id=mpg_uaxcAVamdQmZ9Z3nWoRprMf94S5mLJJ828mZE_U`, {mode: 'cors'}))
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const imageURL = `${data.results[Math.floor((Math.random() * 10))].urls.regular}&h=600`
            console.log(imageURL)
            document.querySelector('img').src = imageURL
            document.querySelector('img').alt = cityObject.description
        })
        .catch(err => {
            console.log(`error ${err}`)
        });    
}