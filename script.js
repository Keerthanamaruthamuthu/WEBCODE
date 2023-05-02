const bodyContainer = document.createElement("div");
bodyContainer.className = "container";
document.body.appendChild(bodyContainer);

const webInstructions = document.createElement("p");
webInstructions.className = "web-instructions";
webInstructions.innerText = `Click the 'Fetch Data' button to access all the breweries
                        Click on the 'Submit' button after typing search term for searching specific breweries.`
bodyContainer.appendChild(webInstructions);


const fetchDataBtn = document.createElement("button");
fetchDataBtn.innerText   = "Fetch data";
fetchDataBtn.className = "fetchDataBtn";
bodyContainer.appendChild(fetchDataBtn);

const searchArea = document.createElement("div");
searchArea.className = "searchArea";
bodyContainer.appendChild(searchArea);

const searchInput = document.createElement("input");
searchInput.className = "searchInput";
searchInput.placeholder = "Search...";
searchArea.appendChild(searchInput);

const searchBtn = document.createElement("button");
searchBtn.className = "submitBtn";
searchBtn.innerText = "Submit";
searchArea.appendChild(searchBtn);


const result = document.createElement("div");
result.className = "result";
bodyContainer.appendChild(result);



fetchDataBtn.addEventListener('click', async() => {
    try{
        const response = await fetch("https://api.openbrewerydb.org/breweries?page=1&per_page=50");
        const jsonData = await response.json();
        console.log(jsonData);

        
        for(let i = 0; i < jsonData.length; i++) {
            let brewData = document.createElement("div"); 
            brewData.innerHTML = `
            <div class = "card">
                <div class = "card-body">
                    <h3 class = "card-title">${jsonData[i].name}</h5>
                    <h6 class = "card-text">Brewery Type: ${jsonData[i].brewery_type}<br><br>
                    Phone: ${jsonData[i].phone}<br><br>
                    Addres:${jsonData[i].street}, ${jsonData[i].city}, ${jsonData[i].state}, ${jsonData[i].country}<br><br>
                    Postal Code:${jsonData[i].postal_code} </h6>
                    <a href = "${jsonData[i].website_url}" target = "_blank" class = "breweryWebsite">${jsonData[i].website_url}</a>
            `
            result.appendChild(brewData);
            
        }
        
    }
    catch(error){
        result.innerHTML = error;
    }
});



searchBtn.addEventListener("click", async() => {
    let searchTerm = document.querySelector(".searchInput").value;
    
    
    const response = await fetch("https://api.openbrewerydb.org/breweries?page=1&per_page=50");
    const jsonData = await response.json();
    

    
    let filtered_arr = [];
    

    for(let i = 0; i < jsonData.length; i++){
        if((jsonData[i].name.toLowerCase()).includes(searchTerm.toLowerCase())){
            filtered_arr.push(jsonData[i]);
        }
    }
    

    const emptyResult = document.querySelector(".result");
    emptyResult.innerHTML = "";
    

    
    for(let i = 0; i < filtered_arr.length; i++) {
        let brewData = document.createElement("div"); 
        brewData.innerHTML = `
        <div class = "card">
            <div class = "card-body">
                <h3 class = "card-title">${filtered_arr[i].name}</h5>
                <h6 class = "card-text">Brewery Type: ${filtered_arr[i].brewery_type}<br><br>
                Phone: ${filtered_arr[i].phone}<br><br>
                Addres:${filtered_arr[i].street}, ${filtered_arr[i].city}, ${filtered_arr[i].state}, ${filtered_arr[i].country}<br><br>
                Postal Code:${filtered_arr[i].postal_code} </h6>
                <a href = "${filtered_arr[i].website_url}" target = "_blank" class = "breweryWebsite">${filtered_arr[i].website_url}</a>
        `
        result.appendChild(brewData);
        
    }
    
    
   
});