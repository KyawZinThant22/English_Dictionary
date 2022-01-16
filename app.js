const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input");
infoText = wrapper.querySelector(".info-text");


//data function 
function data(result,word){
    if(result.title){
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please try to search for another word`;
    }else{
        console.log(result);
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0]


        //pass the particular element to the ui
        document.querySelector(".word p").innerText =  result[0].word;
        document.querySelector(".meaning span").innerText =definitions.definition;


    }
}


//call fetch api function
function fetchApi(word){
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => data(result,word));
    
}

searchInput.addEventListener("keyup",(e) =>{
    if(e.key === "Enter" && e.target.value){
        fetchApi(e.target.value);
    }
});


