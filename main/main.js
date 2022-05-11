const IP = document.querySelector("#ip")
const lugar = document.querySelector("#location")
const timezone = document.querySelector("#timezone")
const proveedor = document.querySelector("#isp")
const boton = document.querySelector("#boton")
const input = document.querySelector("#input")


boton.addEventListener("click", buscar)




function buscar(e){
    document.getElementById('weathermap').innerHTML = "<div id='map' class='mapa''></div>";
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_j9Qihs8BGTfevi7KgxsYp0WwOyUaV&ipAddress=${input.value}&domain=${input.value}`
    try {
        fetch(url)
    .then(response => {
        return response.json()
    })
    .then(data =>{
        const {ip, as, isp, location} = data
        console.log(data)
        return resultado(ip, as, isp, location)
    })
    } catch (error) {
        console.log(error)
    }
}

function resultado(ip, as,  isp, res){
    console.log(res)
    const {lat, lng} = res

    //muestra resultados
    IP.innerHTML = ip
    lugar.innerHTML = `${res.city}, ${res.country}`
    timezone.innerHTML = res.timezone
    proveedor.innerHTML = isp
    
    //renderiza el mapa
    var map = L.map('map').setView([lat, lng], 13);
    var marker = L.marker([lat, lng]).addTo(map);
    var popup = L.popup()
    .setLatLng([lat, lng])
    .setContent(`Name: ${as.name} <br> Domain: ${as.domain} <br> Postal Code: ${res.postalCode} <br> Region: ${res.region}`)
    .openOn(map);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
}
