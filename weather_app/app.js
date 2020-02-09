//console.log('It works!')

$('#enterZip').on("click", (event)=>{
  event.preventDefault();
  let zipCode = $('#zip').val();
  //console.log('Click event is running');


  $.ajax({
    url:`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=552f303f659425cbc193137deb0f8bbc&units=imperial`,
    type: "GET"
  }).then(
    (data)=>{
      // const list = $('<div class="list-container"</div>')
      // $('body').append(list)
      const $weather = data.weather[0].description
      const $town = data.name
      const $temp = data.main.temp
      const $feelsLike = data.main.feels_like
      console.log(data);
      console.log($weather)
      console.log($town)
      console.log($temp)
      console.log($feelsLike)
      getWeather(data);
      $("#zip").val('');
  },
  ()=>{
      console.log('bad request');
    }
  );
})

//console.log('something');
const getWeather = (data) => {
  console.log(`Weather: ${data.weather[0].description}`)
}
