

function loadpk(){
    
    let pkText1 = document.querySelector('#pk-text').value
    let pkText = pkText1.toLowerCase()
    
    if(pkText == ''){ 
        
        alert('Digite nome do pokemon!!!')
    }
    
    else{

        let url = `https://pokeapi.co/api/v2/pokemon/${pkText}/`    
    

        fetch(url)
        .then((response) => {

            return response.json()
        })
        .then((data) => {

            
              
            document.querySelector('.pk-name').innerHTML = data['name']
            let imgPk = data['sprites']['front_default']
            document.querySelector('.pk-img').setAttribute('src', imgPk)
            document.querySelector('#pk-id').innerHTML = 'ID = '+ data['id']

        })
        .catch((erro) => {

            console.log("Erro:" + erro)

            console.clear()
            
            
         
            
        })
    }
    
    
    
}

let pkBtn2 = document.querySelector('#pk-btn')
pkBtn2.addEventListener('click', function(e){
    e.preventDefault()
    loadpk()
    
})

function loadList(){
    let urlList = id => `https://pokeapi.co/api/v2/pokemon/${id}/`

    let arrayPk = []

    for(let i = 1; i <= 150; i++){
        arrayPk.push(fetch(urlList(i)).then(response => response.json()))        
    }

    Promise.all(arrayPk)
        .then(pokemons =>{
        let lisPk = pokemons.reduce((accumulator, pokemons) =>{
            let types = pokemons.types.map(typeInfo => typeInfo.type.name)
            let img = pokemons['sprites']['front_default']
            accumulator += `
            <li class="card ${types[0]}">
                <img class = "card-image" alt="${pokemons.name}" src = "${img}">
                <h3 class ="card-title">${pokemons.id} ${pokemons.name}<h3>
                <p class ="card-subtitle">${types.join( ' | ')}<p>
            </li>
            `
            return accumulator
        },'')

        let ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML = lisPk
        
    })

        
}
loadList()

