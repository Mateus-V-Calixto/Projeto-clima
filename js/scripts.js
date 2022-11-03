const apikey = "99da6caa557b0cb7a34296eaef99783a";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#input-cidade");
const buscaBtn = document.querySelector("#busca");


const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperatura span");
const descripElement = document.querySelector("#descricao");
const weathericonElement = document.querySelector("#weather-icon");
const paisdIconElement = document.querySelector("#pais");
const umidadeElement = document.querySelector("#umidade span");
const windElement = document.querySelector("#wind span");
//Funcoes

const buscarDadosWeather = async(city)=> {
    const apiEatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

    const res = await fetch(apiEatherURL);
    const data = await res.json();

    return data;
};

const mostraDadosWeather = async (city) =>{
    const data = await buscarDadosWeather(city);
    
    this.atualizarDados(data)
} 

//Event

buscaBtn.addEventListener("click", (e) => {
    e.preventDefault(); 

    const city = cityInput.value;

    mostraDadosWeather(city);
});

function atualizarDados(data) {
    
    cityElement.innerHTML = data.name;
    tempElement.innerHTML = parseInt(data.main.temp);
    descripElement.innerHTML = data.weather[0].description;
    weathericonElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    paisdIconElement.setAttribute("src", apiCountryURL + data.sys.country);
    windElement.innerHTML = `${data.wind.speed}Km/h`;
    umidadeElement.innerHTML = `${data.main.humidity}%`;

    cityInput.value = "";
    
}
