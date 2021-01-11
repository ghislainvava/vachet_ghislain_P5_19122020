import{loadDoc} from './function.js';
    var somme = 0;
    let paniers = JSON.parse(localStorage.getItem('panierStorage'));
    

function afficherPanier(){
    
    let clearPanier = document.getElementById('clear');


         paniers.forEach(element => {
        
        let presentationArticleInPanier = document.getElementById('presentationArticleInPanier');
        //presentationArticleInPanier.appendChild(a);

        let objectDuPanier = document.createElement("div");
        objectDuPanier.setAttribute('class', 'objectDuPanier');
        presentationArticleInPanier.appendChild(objectDuPanier);
        

        let idServeur = "http://localhost:3000/api/cameras/" +element[0];
        loadDoc(function(cameraSelect2){

         

            let name = cameraSelect2.name;
            let srcImage = cameraSelect2.imageUrl; 
            let price = cameraSelect2.price;
            
            let a = document.createElement("a"); 
            a.setAttribute('href', 'produit.html?id='+element[0]);
            objectDuPanier.appendChild(a);


            let imageArticlePanier = document.createElement('img');
            imageArticlePanier.setAttribute('id', 'imageArticlePanier');
            imageArticlePanier.setAttribute('src', srcImage)
            a.appendChild(imageArticlePanier);

            
            let nameArticlePanier = document.createElement('div');
            nameArticlePanier.setAttribute('id', 'nameArticlePanier');
            nameArticlePanier.textContent = name;
            objectDuPanier.appendChild(nameArticlePanier);

            let lentilleChoisiPanier = document.createElement('div');
            lentilleChoisiPanier.setAttribute('id', 'lentilleChoisiPanier');
            lentilleChoisiPanier.textContent = element[1];
            objectDuPanier.appendChild(lentilleChoisiPanier);
    
            
            let priceArticlePanier = document.createElement('div');
            priceArticlePanier.setAttribute('id', 'priceArticlePanier');
            priceArticlePanier.textContent = price/100 +',00 €'; 
            objectDuPanier.appendChild(priceArticlePanier);

            let removeIcon = document.createElement('div');
            removeIcon.setAttribute('class','fas fa-trash-alt removeLine');
            objectDuPanier.appendChild(removeIcon);

            
            removeIcon.addEventListener("click",function (event){
                let removeLigne = event.target
                paniers.splice(removeLigne, 1)
                localStorage.clear();
                localStorage.setItem('panierStorage', JSON.stringify(paniers));
                document.location.reload();
               
            });
            console.log(paniers)
            somme += price;

            var total = document.getElementById('total');
            total.innerText = 'Total de votre commande  :  '+somme/100 + ',00 €';
           

        },idServeur);

    });

}
afficherPanier();



function sendData(data) {
    var XHR = new XMLHttpRequest();
    var urlEncodedata = "";
    var urlEncodedDataPairs = [];
    var name;

    for(name in data) {
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }

    urlEncodedata = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    XHR.addEventListener('load', function(event){
        alert('Donées envoyées et réponse chargée.');
    });

    XHR.addEventListener('error', function(event){
        alert('Oups! probléme de chargment')

    });

    XHR.open('POST', '')
}




function montrer() {
    var affichage = document.getElementById("affichage");
    if(affichage.style.display === "none") {
        affichage.style.display = "block";
    } else {
        affichage.style.display = "none";
    }
  };

 



// var submit = document.getElementById('validerFormulaire');

// submit.addEventListener('click', validation);

// function validation(event){
//     var prenom = document.getElementById('prenom');
//     var missPrenom = document.getElementById('missPrenom');
//     var prenomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/;

//     if (prenom.validity.valueMissing){
//         event.preventDefault();
//         missPrenom.textcontent ='Prénom manquant';
//         missPrenomcolor = 'red';

//     } else if(prenomValid.test(prenom.value) == false){
//         event.preventDefault();
//         missPrenom.textContent ='Format incorrect';
//         missPrenom.style.color = 'orange';

//     }else {
//         missPrenom.textContent ='';
//     }

// }







