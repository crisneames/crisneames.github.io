//console.log('It works!')

// hide and show openModal

// Grabbing About button
const $openBtn = $('#openModal');

// Grabbing modal element
const $modal = $('#modal');

// Grabbing close button
const $closeBtn = $('#close');

// Event handler to open the modal
const openModal = () => {
  $modal.css('display', 'block');
}

// Event handler to close the modal
const closeModal = () => {
  $modal.css('display', 'none');
}

//Add event listener to About button
$openBtn.on('click', openModal);

//Add event listener to Close button
$closeBtn.on('click', closeModal);

setTimeout(openModal, 5000);

$('#enterZip').on("click", (event)=>{
  event.preventDefault();
  let zipCode = $('#zip').val();

    $.when(
          // current weather
          $.ajax({
              url: `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=552f303f659425cbc193137deb0f8bbc&units=imperial`,
              success: (data) => {
                  // alert('current weather complete')
                  // current weather
                 getCurrentWeather(data)
                 $("#zip").val('');
              }
          }),
          // 5 day forcast
          $.ajax({
              url: `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=552f303f659425cbc193137deb0f8bbc&units=imperial`,
              success: (data) => {
                //  alert('5 day forcast complete')
                  getForcastedWeather(data)
                  $("#zip").val('');
              }
          })
      ).then( function(){
          //alert('all complete');
  });
});
const getCurrentWeather = (data) => {
  //console.log(`Weather: ${data.weather[0].description}`)

  // Dispay weather description
  $('#description').html(data.weather[0].description);
  // Display temperature
  $('#temperature').html(Math.floor(data.main.temp)) + "°<span>F</span>";


  // Display city
  $('#city').html(data.name);

  // Display icon
  icon = data.weather[0].icon
  let iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
  $("#icon").attr("src", iconurl);
}

const getForcastedWeather = (data) => {

    for (let i = 0; i < 5; i++) {
    // Put date in a variable
    const date = (data.list[i].dt)
    // table for 3 hour forcasted weather
    const $list = $('<table>').addClass("list-container")
          $('.bottom').append($list)
    // row
    const $row = $('<tr>')
     $('.list-container').append($row)
    // table header
    const $thead = $('<th>').addClass('table-header')
    // run date through hex converter and append to
    // header
    $row.text(dateConverter(date))
    $($row).append($thead)
    // row
    const $row2 = $('<tr>')
          $('.list-container').append($row2)
    // image
    const iconurl = (`<img src=http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png />`);
    const $icon = $(`<td> id="wicon"`)
          $("#icon").attr("src", iconurl);
          $($icon).html(iconurl)
          $row2.append($icon)
    const $temp = $(`<td id="${data[i]}-temperature">${Math.floor(data.list[i].main.temp)}</td>`);
    $row2.append($temp)
    const $desc = $(`<td id="${data[i]}-desc">${data.list[i].weather[0].description}</td>`);
     $row2.append($desc)
 }
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

 return convdataTime
}
