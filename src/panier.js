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
            localStorage.setItem('total', somme/100 + ',00 €');

        },idServeur);
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

btn2.addEventListener("click",function (event){
    
    event.preventDefault();
    var form = document.getElementsByTagName('form')[0];
    var firstName = document.getElementById("firstName")
    var lastName = document.getElementById("lastName")
    var address = document.getElementById("adress")
    var city =  document.getElementById("city")
    var email = document.getElementById("mail")

    // email.addEventListener("input", function(event){
    //     if(email.validity.valid){
    //         mail.innerText = "";
    //         mail.className = "error";
    //     }
    // }, false);
    // form.addEventListener("submit", function (event){
    //     if (!email.validity.valid) {
    //         mail.innerHTML = "Veuillez entrer une adresse e-mail correct";
    //         mail.className = "error active";
    //         event.preventDefault();
    //     }
    // }, false);
    
    
    
        arrayProduct.length = 0;

        paniers.forEach(element => {
        let idProduct = element[0];
        arrayProduct.push(idProduct);
        
            });
        
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
         //delete localStorage['panierStorage']; 
         localStorage.setItem('NumberCommande',JSON.stringify(response.orderId));
         setTimeout(function() {location = 'confirmation.html'; }, 1000);

      });
});






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




