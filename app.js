


// show pic when site loads
 $("#icon").attr("src", `http://openweathermap.org/img/w/10d.png`);

//Modal

// modal element
const $modal = $('#modal');
// close button
const $closeBtn = $('#close');

// Event handler to open the modal
const openModal = (event) => {
 $modal.css('display', 'block');
}
// Event handler to close the modal
const closeModal = () => {
  $modal.css('display', 'none');
}
// Event listener to Close button
$closeBtn.on('click', closeModal);

// Timeout so modal will show after 5 Seconds
setTimeout(openModal, 5000);

// Weather App
// on click event
$('#enterZip').on("click", (event)=>{
  event.preventDefault();

  let zipCode = $('#zip').val();

  if (zipCode === '') {
    alert('Not a valid zip code')
  }

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
          // 3 hour forecast
          $.ajax({
              url: `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=552f303f659425cbc193137deb0f8bbc&units=imperial`,
              success: (data) => {
                //  alert('3 hour forcast complete')
                  getForcastedWeather(data)
                  $("#zip").val('');
              }
          })
      ).then( function(){
          //alert('all complete');
  });
});
// get current weather
const getCurrentWeather = (data) => {
    // Dispay weather description
  $('#description').html(data.weather[0].description);
  // Display temperature
  $('#temperature').html(Math.floor(data.main.temp)) + "°<span>F</span>";
  // Display city
  $('#city').html(data.name);
  // Display icon
    $("#icon").attr("src", `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
}
// get 3 hour forecast
const getForcastedWeather = (data) => {
$('.bottom').empty();


    for (let i = 0; i < 5; i++) {

    // Put date in a variable
    const date = (data.list[i].dt)
    // create table for 3 hour forcasted weather
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
    // icons
    const iconurl = (`<img src=http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png />`);
    const $icon = $(`<td> id="wicon"`)
          $("#icon").attr("src", iconurl);
          $($icon).html(iconurl)
          $row2.append($icon)
    // temperature
    const $temp = $(`<td id="temperature">${Math.floor(data.list[i].main.temp)}</td>`);
    //description
    $row2.append($temp)
    const $desc = $(`<td id="desc">${data.list[i].weather[0].description}</td>`);
     $row2.append($desc)
 }
}
// converts hex into date
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
 // returns date with hours and minutes
 return convdataTime
}
