let $ = document

let inputElm = $.querySelector('input')
let searchElm = $.querySelector('button')
let current = $.querySelector('.curr-weather')
let weekly = $.querySelector('.weekly-temps')


const apiKey = 'df7796eacb1fad01d25ba5667ee5b916'

const createCard = (cityName , WeatherItem , index) => {

    if(index === 0){

        return `
        
        <div class="location">

        <h1 class="city">${cityName}</h1>
        <div class="date">Today (${WeatherItem.dt_txt.split(" ")[0]})</div>

    </div>

    <div class="weather-img">
        <img id="temp-img" src="https://openweathermap.org/img/wn/${WeatherItem.weather[0].icon}@4x.png" alt="">
    </div>

    <div class="temps">
        <div class="low-temp">
            <img src="image/humidity.png" alt="">
            <h5 id="humidity">${WeatherItem.main.humidity}%</h5>
        </div>
        <div class="current-temp">
            <h1 class="current-temp" id="curr-temp">${Math.floor((WeatherItem.main.temp - 273.15).toFixed(2))}°c</h1>
        </div>
        <div class="low-temp">
            <img src="image/wind.png" alt="">
            <h5 id="wind">${WeatherItem.wind.speed} M/S</h5>
        </div>
    </div>


        `

    }else{
        return `
            <div class="daily">
            <img src="https://openweathermap.org/img/wn/${WeatherItem.weather[0].icon}@4x.png" alt="">
            <p class="day">${WeatherItem.dt_txt.split(" ")[0]})</p>
            <p class="temp">${Math.floor((WeatherItem.main.temp - 273.15).toFixed(2))}°C</p>
            </div>

            `
    }


   
}

const getWeatherDetails = (cityName , lat , lon) =>{

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

    fetch(weatherApiUrl)
  .then(res => res.json())
  .then(data => {
    const uniqueForecastDays = [];
    const threeDaysForecast = data.list.filter(forecast => {
      const forecastDate = new Date(forecast.dt_txt).getDate();
      if (!uniqueForecastDays.includes(forecastDate)) {
        uniqueForecastDays.push(forecastDate);
        return true; // Include the forecast in the filtered array
      }
      return false; // Exclude the forecast from the filtered array
    }).slice(0, 4); // Limit the filtered array to only 3 elements

    current.innerHTML = ''
    weekly.innerHTML = ''
    inputElm.value = ''
    
    threeDaysForecast.forEach((WeatherItem , index)=>{

        if(index === 0){
            current.insertAdjacentHTML("beforeend" , createCard(cityName , WeatherItem , index))

        }else{
            
            weekly.insertAdjacentHTML("beforeend" , createCard(cityName , WeatherItem , index))

        }

        
    })
    
  }).catch(()=>{

        alert('error occurred for forecast')
    })
}

    const getCityCoordinates = () => {

    const cityName = inputElm.value.trim()

    if(!cityName) return;
    
    const geoCodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`

    fetch(geoCodingUrl).then(res => res.json()).then(data => {
        if(!data.length) alert(`no information has been found for ${cityName}`)
        const { name , lat , lon } = data[0] 
        getWeatherDetails(name , lat , lon)
    }).catch(()=>{
        alert('error occurred!')
    })

}



searchElm.addEventListener('click' , getCityCoordinates)
inputElm.addEventListener('keypress' , (event)=>{

    if(event.keyCode === 13){

        getCityCoordinates();
    }

})


// inputElm.addEventListener('keypress' , (event)=>{


//     if(event.keyCode === 13){
        
//         
     

//     }
// })









// let apiData = {

//     url : 'https://api.openweathermap.org/data/2.5/weather?q=',
// }







// function showDate(){

        
//     let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
//     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     let now = new Date

//     let day = days[now.getDay()]
//     let month = months[now.getMonth()]
//     let year = now.getFullYear()
//     let date = now.getDate()

//     return `${day} ${date} ${month} ${year}`
    
//     }

// function showData(data){

//     let weatherImgs = ['image/rainy.png' , 'image/cloudys.png' , 'image/sunny.png']

//     let city = $.querySelector('.city')
//     city.innerHTML = `${data.name} , ${data.sys.country}`

//     let timeElm = document.querySelector('.date')
//         timeElm.innerHTML = showDate()

//     let humElm = $.getElementById('humidity')
//     humElm.innerHTML = `${data.main.humidity}%`

//     let windElm = $.getElementById('wind')
//     windElm.innerHTML = `${data.wind.speed}p/hr`

//     let tempElm = $.getElementById('curr-temp')
//     tempElm.innerHTML = `${Math.floor(data.main.temp - 273)}c°`

//     let imgElm = $.getElementById('temp-img')
    
//     if(`${data.weather.main = 'clouds'}`){

//         imgElm.src = weatherImgs[1]
//     }
//     else if(`${data.weather.main = 'sunny'}`){
        
//         imgElm.src = weatherImgs[2]

//     }
//     else if(`${data.weather.main = 'rainy'}`) {
//         imgElm.src = weatherImgs[0]
//     }





//     let cardDay = $.querySelector('.day')
//     let cardTemp = $.querySelector('.temp')

    
    
    

// }



// function fetchData(){

//     let countryVal = inputElm.value

//     fetch(`${apiData.url}${countryVal}&appid=${apiData.key}`)
//     .then(res => res.json())
//     .then(data => {

//         console.log(data);
//         showData(data)

//     })

//     fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${countryVal}&appid=${apiData.key}`)
//     .then(resp => resp.json())
//     .then(data => {

//         console.log(data);
//         showData(data)


//     })
// }



// function renderDailyWeather(daily){


    

//     let dailyTemp = document.querySelector('.weekly-temps')
//     dailyTemp.innerHTML = ''

    // daily.forEach(function(data){

    //     let chaos = htmladjec
        
    // })




// }

// async function forecast(city){
//     let cityVal = inputElm.value
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityVal}&appid=${apiData.key}`);
//     const data = await response.json();
  
//   console.log(data);
// }



// function func(x){

//     x.innerHtml = 'salam'
// }







