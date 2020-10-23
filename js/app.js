const container = document.querySelector('.container');
const result = document.querySelector('#resultado');
const form = document.querySelector('#formulario');

window.addEventListener('load', () => {
    form.addEventListener('submit', searchWeather);
});

function searchWeather(e) {
    e.preventDefault();

    // Validate
    const city = document.querySelector('#ciudad').value;
    const country = document.querySelector('#pais').value;

    if(city === '' || country === ''){
        showError('Ambos campos son obligatorios');
        return;
    }
    
    // Consult API
    consultAPI(city, country);
}

function showError(message){
    const alert = document.querySelector('.alerta');

    if(!alert) {

        const alert = document.createElement('div');
        alert.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center','alerta');
        alert.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${message}</span>
        `;
        container.appendChild(alert);

        setTimeout(()=>{
            alert.remove();
        },5000);
    }
}

function consultAPI(city, country){
    const appId = '..your..API..here..';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

    spinner();
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data);

            cleanHTML();

            if(data.cod === '404'){
                showError('Ciudad no encontrada');
                return;
            }

            // Print result in HTML
            showWeather(data);
        })
        .catch(error => console.log(error))
}

function showWeather(data) {

    const { name, main: {temp, temp_max, temp_min} } = data;

    const nameCity = document.createElement('p');
    nameCity.textContent = `Clima en ${name}`;
    nameCity.classList.add('font-bold','text-2xl');

    const celcius = kelvinToCelcius(temp);
    const max = kelvinToCelcius(temp_max);
    const min = kelvinToCelcius(temp_min);

    const actualTemp = document.createElement('p');
    actualTemp.innerHTML = `${celcius} &#8451`;
    actualTemp.classList.add('font-bold','text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451`;
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451`;
    tempMin.classList.add('text-xl');

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('text-center', 'text-white');
    resultDiv.appendChild(nameCity);
    resultDiv.appendChild(actualTemp);
    resultDiv.appendChild(tempMax);
    resultDiv.appendChild(tempMin);

    result.appendChild(resultDiv);


}

const kelvinToCelcius = degrees => parseInt(degrees - 273.15);


function cleanHTML() {
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
}

function spinner() {

    cleanHTML();

    const divSpinner = document.createElement('div');

    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `;

    result.appendChild(divSpinner);

}
