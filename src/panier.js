import{loadDoc} from './function.js';


    var somme = 0;//var utiliser pour le total de commande
    //parsage du panier dans localStorage
    let paniers = JSON.parse(localStorage.getItem('panierStorage'));
    let presentationArticleInPanier = document.getElementById('presentationArticleInPanier');
    
function afficherPanier(){

        // foreach pour utiser les elements du tableau paniers
         paniers.forEach(element => {
        
            //creation du container pour chaque element du panier
            let objectDuPanier = document.createElement("div");
            objectDuPanier.setAttribute('class', 'objectDuPanier');
            presentationArticleInPanier.appendChild(objectDuPanier);
            
            let idServeur = "http://localhost:3000/api/cameras/" +element[0];

                loadDoc(function(cameraSelect2){

                    //nomination des attributs de la camera sélectionnée
                    let name = cameraSelect2.name;
                    let srcImage = cameraSelect2.imageUrl; 
                    let price = cameraSelect2.price;

                    
                    //création de l'image avec un lien vers l'objet avec Description dans objectDuPanier
                    let a = document.createElement("a"); 
                    a.setAttribute('href', 'produit.html?id='+element[0]);
                    objectDuPanier.appendChild(a);
                    let imageArticlePanier = document.createElement('img');
                    imageArticlePanier.setAttribute('id', 'imageArticlePanier');
                    imageArticlePanier.setAttribute('src', srcImage)
                    a.appendChild(imageArticlePanier);

                    //création du texte name
                    let nameArticlePanier = document.createElement('div');
                    nameArticlePanier.setAttribute('id', 'nameArticlePanier');
                    nameArticlePanier.textContent = name;
                    objectDuPanier.appendChild(nameArticlePanier);

                    //création du texte lentille
                    let lentilleChoisiPanier = document.createElement('div');
                    lentilleChoisiPanier.setAttribute('id', 'lentilleChoisiPanier');
                    lentilleChoisiPanier.textContent = element[1];
                    objectDuPanier.appendChild(lentilleChoisiPanier);
            
                    //création de l'affichage du prix
                    let priceArticlePanier = document.createElement('div');
                    priceArticlePanier.setAttribute('id', 'priceArticlePanier');
                    priceArticlePanier.textContent = price/100 +',00 €'; 
                    objectDuPanier.appendChild(priceArticlePanier);

                    //création de l'icone poubelle
                    let removeIcon = document.createElement('div');
                    removeIcon.setAttribute('class','fas fa-trash-alt removeLine');
                    objectDuPanier.appendChild(removeIcon);

                    //fonction pour supprimer un élément du panier
                    removeIcon.addEventListener("click",function (event){
                        let removeLigne = event.target
                        paniers.splice(removeLigne, 1)
                        localStorage.clear();
                        localStorage.setItem('panierStorage', JSON.stringify(paniers));
                        document.location.reload();
                    });
                
            //création de l'affichage et du calcul de total
            var total = document.getElementById('total');
            somme += price;
            total.innerText = 'Total de votre commande  :  '+somme/100 + ',00 €';
           

        },idServeur);
    });
}
// effacer tout le panier
let clear = document.getElementById('clear');
clear.addEventListener("click", function(){
   localStorage.clear();
   document.location.reload();
});


afficherPanier();
let btn = document.getElementById("btnCommander");

btn.onclick = function(){
    var affichage = document.getElementById("formular");
    if(affichage.style.display === "block") {
        affichage.style.display = "none";
    } else {
        affichage.style.display = "block";
    }
}

let btn2 = document.getElementById('validerFormulaire');
btn2.onclick = function (){

    let arrayProduct = [];


    function remplirArrayProduct() {
           
        arrayProduct.length = 0;
        paniers.forEach(element => {
        let idProduct = element[0];
        arrayProduct.push(idProduct);
        return arrayProduct
    });





    let order = {
        Contact : {
            firstName : document.getElementById("firstName").value.trim(),
            lastName : document.getElementById("lastName").value.trim(),
            adress : document.getElementById("adress").value.trim(),
            city : document.getElementById("adress").value.trim(),
            email :document.getElementById("mail").value.trim(),
        }

        
        
    }
       
        } 

    function remplirContact(){
        var firstName = document.getElementById("firstName");
        var lastName = document.getElementById("lastName");
        var adress = document.getElementById("adress");
        var city = document.getElementById("adress");
        var email = document.getElementById("mail");
        
        var objectContactFull = new contact(firstName, lastName, adress, city, email);
    
    }
    
    

    var total = document.getElementById('total');
    localStorage.setItem('total', total)

}




// function sendData(data) {
//     var XHR = new XMLHttpRequest();
//     var urlEncodedata = "";
//     var urlEncodedDataPairs = [];
//     var name;

//     for(name in data) {
//         urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
//     }

//     urlEncodedata = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

//     XHR.addEventListener('load', function(event){
//         alert('Donées envoyées et réponse chargée.');
//     });

//     XHR.addEventListener('error', function(event){
//         alert('Oups! probléme de chargement')

//     });

//     XHR.open('POST', 'http://127.0.0.1:5502/panier.html')
// }





// submit.addEventListener('click', validation);

function validation(event){
    var prenom = document.getElementById('firstName');
    var missPrenom = document.getElementById('missPrenom');
    var prenomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/;

    if (prenom.validity.valueMissing){
        event.preventDefault();
        missPrenom.textcontent ='Prénom manquant';
        missPrenomcolor = 'red';

    } else if(prenomValid.test(prenom.value) == false){
        event.preventDefault();
        missPrenom.textContent ='Format incorrect';
        missPrenom.style.color = 'orange';

    }else {
        missPrenom.textContent ='';
    }

}







