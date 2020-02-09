
$.ajax({
  // current forcast
  url:`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=552f303f659425cbc193137deb0f8bbc&units=imperial`,
  // 5 day forcast
  url: `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=552f303f659425cbc193137deb0f8bbc&units=imperial`,
  type: "GET"
}).then(
  (data, data2)=>{
    // current weather
   getCurrentWeather(data)
    // 5 day weather
    getForcastedWeather(data)

    //console.log(data.list[0].main.temp)

    $("#zip").val('');
},
()=>{
    console.log('bad request');
  }

);



//console.log('something');
const getCurrentWeather = (data) => {
//console.log(`Weather: ${data.weather[0].description}`)
$('#description').html(data.weather[0].description);
$('#temperature').html(Math.round(data.main.temp));
$('#city').html(data.name);
}

const getForcastedWeather = (data2) => {
const $temp = data.list[0].dt
console.log($temp);

}

});
