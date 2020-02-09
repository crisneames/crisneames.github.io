//console.log('It works!')

$('#enterZip').on("click", (event)=>{
  event.preventDefault();
  let zipCode = $('#zip').val();
  //console.log('Click event is running');

  $.when(
          // current weather
          $.ajax({
              url: `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=552f303f659425cbc193137deb0f8bbc&units=imperial`,
              success: (data) => {
                  alert('current weather complete')
                  // current weather
                 getCurrentWeather(data)
                 $("#zip").val('');
              }
          }),
          // 5 day forcast
          $.ajax({
              url: `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=552f303f659425cbc193137deb0f8bbc&units=imperial`,
              success: (data) => {
                  alert('5 day forcast complete')
                  getForcastedWeather(data)
                  $("#zip").val('');
              }
          })
      ).then( function(){
          alert('all complete');

  });



});
const getCurrentWeather = (data) => {
  //console.log(`Weather: ${data.weather[0].description}`)
  // Dispay weather description
  $('#description').html(data.weather[0].description);
  // Display temperature
  $('#temperature').html(Math.round(data.main.temp));
  // Display city
  $('#city').html(data.name);
}


const getForcastedWeather = (data) => {




  for (let i = 0; i < 5; i++) {


    // Put date in a variable
    // const date = (data.list[i].dt)
    // dateConverter(date)
  // Display temperature
    const $div = $('<div>').addClass("forcastWeather")
    $('body').append($div)

    const list = $('<div>').addClass("list-container")
              $($div).append(list)

     const $temp = $(`<div id="${data[i]}-temperature">${data.list[i].main.temp}</div>`);
     $div.append($temp)

     const $desc = $(`<div id="${data[i]}-desc">${data.list[i].weather[0].description}</div>`);
     $div.append($desc)



  // temp = $('#temp').html(data.list[i].main.temp)
  // // Display weather description
  // desc =$('#desc').html(data.list[i].weather[0].description)
  // // weather icon
  // $('#icon').html(data.list[i].weather[0].icon)

  console.log(temp);
  console.log(desc)
}

//console.log($temp) // $description $icon);
console.log(date);
}

const dateConverter = (dateInHex) => {
  // array of months
  const months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Convert timestamp to milliseconds
 let date = new Date(dateInHex*1000);

 // Year
 let year = date.getFullYear();

 // Month
 let month = months_arr[date.getMonth()];

 // Day
 let day = date.getDate();

 // Hours
 let hours = date.getHours();

 // Minutes
 let minutes = "0" + date.getMinutes();

 // Seconds
 let seconds = "0" + date.getSeconds();

 // Display date time in MM-dd-yyyy h:m:s format
 let convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

 //Display to screen
 $('#date').html(convdataTime)



}
