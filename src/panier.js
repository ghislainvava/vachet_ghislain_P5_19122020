import{loadDoc} from './function.js';


    var somme = 0;//var utiliser pour le total de commande
    //parsage du panier dans localStorage
    let paniers = JSON.parse(localStorage.getItem('panierStorage'));
    let presentationArticleInPanier = document.getElementById('presentationArticleInPanier');
    let arrayProduct = [];
    
function afficherPanier(){
    //condition pour vérifier si le panier est vide 
    if (paniers == null){  
        let h1panier = document.getElementById('h1Panier');
        h1panier.textContent = "Votre panier est vide";
    }else{
        var compteur = 0;
        // foreach pour utiser les elements du tableau paniers
         paniers.forEach(function(element, index) {
        
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

                        var number = compteur;
                        //fonction pour supprimer un élément du panier
                        removeIcon.addEventListener("click",function (){
                            paniers.splice(index, 1);
                            localStorage.clear();
                            localStorage.setItem('panierStorage', JSON.stringify(paniers));
                            document.location.reload();    
                        });
                            //création de l'affichage et du calcul de total
                            var total = document.getElementById('total');
                            somme += price;
                            total.innerText = 'Total de votre commande  :  '+somme/100 + ',00 €';
                            localStorage.setItem('total', somme/100 + ',00 €');
                    },idServeur);
                    compteur++;
    });
  }
}   


// effacer tout le panier
let clear = document.getElementById('clear');
clear.addEventListener("click", function(){
   localStorage.clear();
   document.location.reload();
});

//appel de la function pour afficher le pannier
afficherPanier();

//bouton commander pour afficher formulaire
let btn = document.getElementById("btnCommander");
btn.onclick = function(){
    var affichage = document.getElementById("formular");
    affichage.style.display = "block";
}

// CONFIRMATION DE COMMANDE

let btn2 = document.getElementById('validerFormulaire');
var firstName = document.getElementById("firstName")
var lastName = document.getElementById("lastName")
var address = document.getElementById("adress")
var city =  document.getElementById("city")
var email = document.getElementById("mail")
var message = document.getElementById("message");

//fonction pour contrôler le contenu du formulaire
function validation(){
    let regexName = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/;
    let regexEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
    if (firstName.value=="" || lastName.value=="" || address.value=="" || city.value == "" || email.value == "" ){  
        return 1
    } else if (regexName.test(firstName.value)== false || regexName.test(lastName.value)== false) {
        return 2
    } else if(regexEmail.test(email.value) == false ){
        return 3
    } else {
        return 4
    }
}

// function pour remplir products
function remplirProducts() {
    arrayProduct.length = 0;
        paniers.forEach(element => {
        let idProduct = element[0];
        arrayProduct.push(idProduct);      
            });
}

// function fetch avec parametre order pour envoyer en assynchrone le post
function fetchOrder(order){
    fetch("http://localhost:3000/api/cameras/order",{
    method: "POST",
    headers : {
        "Content-Type": "application/json"
    },
    body : JSON.stringify(order)
})
  .then(function(response){
    return response.json();
  })
  .then(function(response){ 
     localStorage.setItem('NumberCommande',JSON.stringify(response.orderId));
     setTimeout(function() {location = 'confirmation.html'; }, 1000);
  });
}

//évenement qui declanche le formulaire et fetch
btn2.addEventListener("click",function (event){
   switch (validation()){
        case 1 :
            message.textContent = "Un champs n'est pas correctement rentré"
            break;
        case 2 : 
             message.textContent = "Votre Nom ou Prénom n'est pas valide"
            break;

        case 3 :
            message.textContent = "il y a un probléme dans votre adresse email"   
            break
        case 4 :    
                remplirProducts();       
                let order = {
                contact: {
                    firstName : firstName,
                        lastName : lastName,
                        address : address,
                        city : city,
                        email : email
                },
                products: arrayProduct
                }
                fetchOrder(order)
            break;
        default:
            break;  
    }
});










