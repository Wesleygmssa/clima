document.querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if (input !== '') {
    clearInfo();
    showWarning('Carregando...');
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=9312cb560b86d3f677577f259d4cc01a&units=metric&lang=pt_br`;

    let result = await fetch(url);
    let data = await result.json();

    if (data.cod === 200) {
      showInfo({
        name: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        tempIcon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        windAngle: data.wind.deg
      });


    } else {
      clearInfo()
      showWarning('Não foi possível encontrar a cidade informada.');
    }
  }
});

function showInfo(data) {
  showWarning('');
  document.querySelector('.titulo').innerHTML = `${data.name}, ${data.country}`;
  document.querySelector('.tempInfo').innerHTML = `${data.temp}, <sup>ºC</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${data.windSpeed} <span>km/h</span>`;

  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${data.tempIcon}@2x.png`)
  document.querySelector('.ventoPonto').style.transform = `rotate(${data.windAngle}deg)`;

  document.querySelector('.resultado').style.display = 'block';

}
function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
  document.querySelector('.resultado').style.display = 'none';
  document.querySelector('.titulo').innerHTML = '';
  document.querySelector('.tempInfo').innerHTML = '';
  document.querySelector('.ventoInfo').innerHTML = '';
  document.querySelector('.temp img').setAttribute('src', '')
  document.querySelector('.ventoPonto').style.transform = '';
}