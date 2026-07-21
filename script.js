let countries;


//getting data from API
function renderAllCountries(){
    fetch('https://api.restcountries.com/countries/v5?limit=100&pretty=1',
    { headers: { 'Authorization': 'Bearer rc_live_1e1dd4a0fed240078c7af9d5ed5cdf25' } }
)
    .then( res=> res.json())
    .then( param_countries =>{
        // console.log(param_countries);
        countriesContainer.innerHTML="";
        countries = param_countries.data.objects
        console.log(countries)
        countries.forEach(renderCountryCard)
    })
    .catch(err => {
        // console.log("unable to fetch countries, Error is:",err)
        // document.querySelector(".countries-container").innerHTML = "<p><b>Unable to fetch data. Check your internet connection or restcountries.com, took too long to respond</b></p>";
        countries = data;
        // console.log(countries)
        countriesContainer.innerHTML="";
        countries.forEach(renderCountryCard)
    } )
}

renderAllCountries();


const countriesContainer = document.querySelector(".countries-container")

function renderCountryCard(country){
    // console.log(country)
    // this country doesn't have the flag!!!
    if(country.capitals[0]?.name == "Sukhumi") return; 

    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    // console.log(country.name);
    countryCard.href= `./country.html?name=${country.names.common}`
    countryCard.innerHTML = `
            <img src="${country.flag.url_png}" alt="${country.names.common} flag">
            <div class="card-text">
                <h3 class="card-title">${country.names.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capitals[0]?.name || "{no capital}"}</p>
            </div>`
    countriesContainer.append(countryCard);
}

// ......THIS IS TOO MUCH OF CODE! WE CAN MAKE IT BETTER BY THE ABOVE WAY!
// const countriesContainer = document.querySelector(".countries-container")
// console.log(countriesContainer);
// const countryCard = document.createElement("a");
// countryCard.classList.add("country-card");

// const cardImage = document.createElement("img");
// cardImage.src = "https://flagcdn.com/de.svg"

// countryCard.append(cardImage);

// console.log(countryCard);
// countriesContainer.append(countryCard)


//filter implementation
const filterByRegion = document.querySelector(".filter-by-region");
filterByRegion.addEventListener("change" , (e) =>{
    // console.log(e.target.value);
    // console.dir(filterByRegion.value);

    // if(filterByRegion.value == 'all'){
    //     // renderAllCountries();
    //     countriesContainer.innerHTML="";
    //     countries.forEach(renderCountryCard)
    // }else{
    //     countriesContainer.innerHTML = ""
    // fetch(` 'https://api.restcountries.com/countries/v5?region=${filterByRegion.value}&pretty=1',
    // { headers: { 'Authorization': 'Bearer rc_live_1e1dd4a0fed240078c7af9d5ed5cdf25' } }`)
    // .then(res => res.json())
    // .then(countries => {
    //     countries.forEach(renderCountryCard)
    //     console.log((countries));
    // })
    // }

    let query = filterByRegion.value;
    let resultingCountries = countries.filter( country => country.region.toLowerCase().includes(filterByRegion.value.toLowerCase()) );
    countriesContainer.innerText = ""
    if(resultingCountries.length == 0){
        countriesContainer.innerHTML = `<p id="no-country-found"><b>(No such country found!)</b></p>`;
        // console.log('jhvhbghjbghjbhj');
    }
    resultingCountries.forEach(renderCountryCard);
    
})

//searching implementation: method 1
const inputField = document.querySelector("#input");
// inputField.addEventListener("input", (e)=>{
//     // console.log('input event fired....');
//     let val = inputField.value;
//     let URL = `https://restcountries.com/v3.1/name/${val}`;
//     if(val == "")
//         URL = `https://restcountries.com/v3.1/all`;

//     fetch(URL)
//     .then( res=> res.json())
//     .then(countries => {
//         // console.log("countries: ",countries);
//         // console.log("val: ",val=='');
        
//         countriesContainer.innerText = "";
//         countries.forEach(renderCountryCard);
//     })
//     .catch(err => {
//         if(err instanceof TypeError){
//             countriesContainer.innerHTML = `<p id="no-country-found"><b>(No country found!)</b></p>`;
//         }
//     })
// })


//searching implementation: method 2

inputField.addEventListener("input", ()=>{
    // console.log('input event fired....');
    let resultingCountries = countries.filter( country => country.names.common.toLowerCase().includes(inputField.value.toLowerCase()) );
    countriesContainer.innerText = ""
    if(resultingCountries.length == 0){
        countriesContainer.innerHTML = `<p id="no-country-found"><b>(No such country found!)</b></p>`;
        // console.log('jhvhbghjbghjbhj');
    }
    resultingCountries.forEach(renderCountryCard);
})


//theme toggle
// light theme is default...I've handled dark theme

const themeToggle = document.querySelector(".header-content p")
themeToggle.addEventListener("click",() =>{
        document.body.classList.toggle("dark");
        themeMode = themeMode=="dark" ? "light" : "dark";
        if(themeMode == "dark")
            themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>&nbsp;&nbsp; <span>Light Mode</span>`
        else
            themeToggle.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;<span> Dark Mode</span>`
            
        localStorage.setItem("theme", themeMode);
})

// console.log(localStorage.getItem("theme"));
let themeMode ;
if(! localStorage.getItem("theme")){
    themeMode = "light";
    localStorage.setItem("theme", themeMode);
}else
    themeMode = localStorage.getItem("theme")
// debugger; ⭐⭐⭐⭐⭐ // first know to yourself what & how you are doing, what is your line
if(themeMode == "dark"){
    document.body.classList.add("dark");
    themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>&nbsp;&nbsp; <span>Light Mode</span>`
}


// 
// shimmer effect

for(let i=0;i<10;i++)
{
    renderShimmerCard();
}

function renderShimmerCard(){
    const countryCard = document.createElement("a");
    countryCard.classList.add("shimmer-card");
    // console.log(country.names);
    // countryCard.href= `./Country.html?name`
    countryCard.innerHTML = `
            <div class="card-text">
                <h3 class="card-title"></h3>
                <p></p>
                <p></p>
                <p></p>
            </div>`
    countriesContainer.append(countryCard);
}
