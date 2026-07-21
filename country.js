let conuntryName = new URLSearchParams(window.location.search).get("name")
console.log("s;ldkfjs;aldkfj")
fetch( `https://api.restcountries.com/countries/v5/names.common/${conuntryName}`,
  { headers: { 'Authorization': 'Bearer rc_live_1e1dd4a0fed240078c7af9d5ed5cdf25' } }
)
.then( res => res.json())
.then(({data}) =>{    ///use destructuring here instead of doing process in next two lines
    countryObj = data.objects[0];
    const countryDetail = document.querySelector("#country-detail");
    let nativeName;
    if(countryObj.names.nativeName)
        nativeName = Object.values(countryObj.names.nativeName)[0].common;

    countryDetail.innerHTML = 
    `<img src=${countryObj.flag.url_png} alt="flag" id="flag">
    <div class="detail-text-container">
        <h2>${countryObj.names.common}</h2>
        <div class="detail-text">
            <p><b>Native Name: </b>${nativeName ? nativeName : countryObj.names.common}</p>
            <p><b>Population: </b>${countryObj.population.toLocaleString("en-IN")}</p>
            <p><b>Region: </b>${countryObj.region}</p>
            <p><b>Sub Region: </b>${countryObj?.subregion || "(No Subregion)"}</p>
            <p><b>Capital: </b>${countryObj?.capitals.map( capDetailsObj => capDetailsObj.name).join(", ") || "(No Capital)"}</p>
            <p><b>Top Level Domain: </b>${countryObj.tlds.join(", ")}</p> 
            <p><b>Currencies: </b>${countryObj.currencies.map(({name})=> name).join(", ") || "(No Currency)" }</p>
            <p><b>Languages: </b>${countryObj.languages.map(({name})=>name).join(", ")}</p>
        </div>
        <p id="border-countries"><b>Border Countries: &nbsp;</b>  </p>
    </div>`
{/* <p><b>Currencies: </b>${Object.keys(countryObj.currencies).map(cur => countryObj.currencies[cur].name).join(", ")}</p> */}

    
    const borderCountries = document.querySelector("#border-countries");
    if(countryObj.borders)
        countryObj.borders.forEach( borderCountryCode => {
            fetch(`https://api.restcountries.com/countries/v5/code?q=${borderCountryCode}&pretty=1`,
                { headers: { 'Authorization': 'Bearer rc_live_1e1dd4a0fed240078c7af9d5ed5cdf25' } })
            .then(res => res.json())
            .then(({data}) =>{
                borderCountryObj = data.objects[0];
                console.log(borderCountryObj)
                const anchor = document.createElement("a");
                anchor.href = `./country.html?name=${borderCountryObj.names.common}`;
                anchor.innerText = borderCountryObj.names.common;
                borderCountries.append(anchor);
            })
            
        });
    else{
        borderCountries.innerHTML= "<b>Border Countries: &nbsp;</b>(No Border Country)"
    }})
.catch(err => console.error("ERRROR OCCURED:\n",err))

const backBtn = document.querySelector("#backBtn");
console.dir(backBtn);
backBtn.addEventListener("click", ()=>{
    history.go(-1);
});

//toggle theme
const themeToggle = document.querySelector(".header-content p")
themeToggle.addEventListener("click",() =>{
        document.body.classList.toggle("dark");
        themeMode = themeMode=="dark" ? "light" : "dark";
        if(themeMode == "dark")
            themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>&nbsp;&nbsp; Light Mode`
        else
            themeToggle.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;&nbsp; Dark Mode`
        localStorage.setItem("theme", themeMode);
})

let themeMode= "light"
if(localStorage.getItem("theme") == "dark"){
    themeMode = "dark"
    document.body.classList.add("dark");
    themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>&nbsp;&nbsp; Light Mode`
}
