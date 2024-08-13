var inputval = document.querySelector('#cityinput')
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')
var hum = document.querySelector('#humi');
var press = document.querySelector("#pressure");
var feelslike = document.querySelector("#feelslike");
const date = new Date();
let x = date.getDate();
let y = date.getMonth();
let z = date.getYear();
let chrono = `${x}/${y+1}/${z-100}`;
apik = "3045dd712ffe6e702e3245525ac7fa38"
function convertion(val){
    return (val - 273).toFixed(2)
}
btn.addEventListener('click', function(){
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&appid='+apik)
  .then(res => res.json())
  .then(data => 
  {
    var nameval = data['name']
    var descrip = data['weather']['0']['description']
    var tempature = data['main']['temp']
    var wndspd = data['wind']['speed']
    var humidity = data['main']['humidity']
    var pressure = data['main']['pressure']
    var feels = data['main']['feels_like']
    city.innerHTML=`<i class='fa fa-map-marker'id='minicon'></i>${nameval}, (${chrono})`
    temp.innerHTML = `<span>${ convertion(tempature)} °C</span>`
    description.innerHTML = `Sky Conditions: ${descrip}`
    wind.innerHTML = `<i class='fa fa-leaf'></i>Wind Speed: <span>${wndspd} km/h</span>`
    hum.innerHTML = `<i class='fa fa-tint'></i>Humidity: <span>${humidity} %</span>`
    press.innerHTML = `<i class='fa fa-globe'></i>Pressure: <span>${pressure} mb</span>`
    feelslike.innerHTML = `<i class="fa fa-thermometer"></i>Feels temp: <span>${convertion(feels)}°C</span>`
    var iconcode = data['weather'][0]['icon'];
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    document.querySelector("#icon").innerHTML = `<img id='wicon' src='${iconurl}' alt='icon'>`;
    let tempa = convertion(tempature);
    graphic(tempa);
    tabledata(data,chrono);
  })
  .catch(err => alert('You entered Wrong city name'))
})
var v = 1;
let boxa = document.getElementById("navelement");
function statup(){
    let slider = document.getElementById("ststimg");
    setTimeout(function of(){
        slider.innerHTML = "<img src='./fav-icon/effect002.jpg'class='abja'>";
    },10000);
    setTimeout(function of(){
        slider.innerHTML = "<img src='./fav-icon/effect0025.jpg'class='abja'>";
    },30000);
    setTimeout(function of(){
        slider.innerHTML = "<img src='./fav-icon/effect0035.jpg'class='abja'>";
    },50000);
    setTimeout(function of(){
        slider.innerHTML = "<img src='./fav-icon/effect003.jpg'class='abja'>";
    },80000);
    setTimeout(function of(){
        slider.innerHTML = "<img src='./fav-icon/effect001.jpg'class='abja'>";
    },120000);
}
function naveffect(){
    if(v == 1){
        boxa.style.opacity = "1";
        boxa.style.zIndex = "99";
        v = 0;
    }else{
        boxa.style.opacity = "-2";
        boxa.style.zIndex = "-5";
        v = 1;
    }
}
function tabledata(data,chrono){
	document.getElementById("m1").innerHTML =`${convertion(data['main']['temp'])}°C`;
	document.getElementById("m2").innerHTML =`${data['weather']['0']['description']}`;
	document.getElementById("m3").innerHTML =`${data['name']}`;
	document.getElementById("m4").innerHTML =`${chrono}`;
	document.getElementById("m5").innerHTML =`${data['main']['pressure']}mb`;
	document.getElementById("m6").innerHTML =`${data['wind']['speed']}km/h`;
	document.getElementById("m7").innerHTML =`${data['wind']['deg']}°`;
	document.getElementById("m8").innerHTML =`${data['main']['humidity']}%`;
	document.getElementById("m9").innerHTML =`${convertion(data['main']['feels_like'])}°C`;
	document.getElementById("m10").innerHTML =`${convertion(data['main']['temp_min'])}°C`;
	document.getElementById("m11").innerHTML =`${convertion(data['main']['temp_max'])}°C`;
	document.getElementById("m12").innerHTML =`${data['main']['sea_level']}m`;
	document.getElementById("m13").innerHTML =`${data['main']['grnd_level']}m`;
	document.getElementById("m14").innerHTML =`${data['coord']['lon']}°`;
	document.getElementById("m15").innerHTML =`${data['coord']['lat']}°`;
	console.log(data);
}
function graphic(temp){
const date = new Date();
let x = date.getDate();
var xValues = [x,x+1,x+2,x+3,x+4,x+5];
temp=Math.floor(temp);
let v = Math.floor((Math.random()*(3-(-1))+(-1)));
let v1 = (Math.round(temp+v))-1;
let v2 = (Math.round(v1-(2*v)))+1;
let v3 = Math.floor((temp+v2)-v1);
let v4 = ((((v+temp)-v3)*v1)/v2)+v1;
var yValues = [temp,temp+2,v1,v2,v3,v4];
new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "#0C8FF0",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: -30, max:50}}],
    }
  }
});
}
