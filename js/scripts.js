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

const dadosWeatherElement = document.querySelector("#dados-weather");
const divNaoEncontradaElement = document.querySelector("#naoEncontrada")

//Funcoes

const buscarDadosWeather = async(city)=> {
    const apiEatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

    const res = await fetch(apiEatherURL);
    const data = await res.json();

    return data;
};

const mostraDadosWeather = async (city) =>{
    const data = await buscarDadosWeather(city);
    
    this.verificarDados(data)
} 

//Event

buscaBtn.addEventListener("click", (e) => {
    e.preventDefault(); 

    const city = cityInput.value;

    mostraDadosWeather(city);
});

function atualizarDados(data) {
    dadosWeatherElement.classList.remove('hide')
    divNaoEncontradaElement.classList.add('hide')
    
    cityElement.innerHTML = data.name;
    tempElement.innerHTML = parseInt(data.main.temp);
    descripElement.innerHTML = data.weather[0].description;
    weathericonElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    paisdIconElement.setAttribute("src", apiCountryURL + data.sys.country);
    windElement.innerHTML = `${data.wind.speed}Km/h`;
    umidadeElement.innerHTML = `${data.main.humidity}%`;

    cityInput.value = "";
    
}

function verificarDados(dados){

    if (dados.cod == 404 || dados.cod == 400) {
        divNaoEncontradaElement.classList.remove("hide")
        dadosWeatherElement.classList.add('hide')
        
    }else{

        this.atualizarDados(dados)
    }
    

}

cityInput.addEventListener("keyup", (e)=> {
    if(e.code === "Enter"){
        const city = e.target.value;

        mostraDadosWeather(city)
    }
})
