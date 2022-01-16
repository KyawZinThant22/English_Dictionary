const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
synonyms = wrapper.querySelector(".synonyms .list"),
infoText = wrapper.querySelector(".info-text"),
volumeIcon = wrapper.querySelector(".word i");

let audio;


//data function 
function data(result,word){
    if(result.title){
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please try to search for another word`;
    }else{
        console.log(result);
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0]
        phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;


        //pass the particular element to the ui
        document.querySelector(".word p").innerText =  result[0].word;
        document.querySelector(".word span").innerText = phontetics;
        document.querySelector(".meaning span").innerText =definitions.definition;
        document.querySelector(".example span").innerText =definitions.example;
        audio = new Audio("https:" + result[0].phonetics[0].audio);


        if(definitions.synonyms[0] == undefined){
            synonyms.parentElement.style.display = 'none';
        }else{

            synonyms.parentElement.style.display = 'block';
            synonyms.innerHTML = '';
            for ( let i = 0 ; i < 5 ; i++){         
                let tag =` <span>${definitions.synonyms[i]},</span>`;
                synonyms.insertAdjacentHTML("beforeend",tag)
            }
        }

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


volumeIcon.addEventListener('click',()=>{
    audio.play();
})



