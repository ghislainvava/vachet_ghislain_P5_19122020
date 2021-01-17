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

//appel de la function pour afficher le pannier
afficherPanier();

//bouton commander pour afficher formulaire
let btn = document.getElementById("btnCommander");
btn.onclick = function(){
    var affichage = document.getElementById("formular");
    affichage.style.display = "block";
}

function remplirArrayProduct(arrayProduct) {      
    arrayProduct.length = 0;
    paniers.forEach(element => {
    let idProduct = element[0];
    arrayProduct = arrayProduct.concat(["_id",idProduct]);
    
});
return arrayProduct;
}


// CONFIRMATION DE COMMANDE
function confirmCommand() {
    swal("Votre commande a bien été validée, vous allez être redirigé", "", "success");
    setTimeout(function() {window.location = 'confirmation.html'; }, 3000);
  }



let btn2 = document.getElementById('validerFormulaire');

btn2.addEventListener("submit",function (){
 
    let arrayProduct  = [[]];
    

    arrayProduct = remplirArrayProduct(arrayProduct);
    

    let order = {
      contact: {
        firstName: document.querySelector("#firstname").value.trim(),
        lastName: document.querySelector("#lastName").value.trim(),
        address: document.querySelector("#adress").value.trim(),
        city: document.querySelector("#city").value.trim(),
        email: document.querySelector("#mail").value.trim(),
      },
      products: arrayProduct,
    };

  console.log(order)

    const request = new Request( // On crée notre requête POST vers API
      "http://localhost:3000/api/cameras/order",
      {
        method: "POST",
        body: JSON.stringify(order),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        })
      }
    );
  
    fetch(request)
      .then((response) => response.json())
      .then((response) => { //on récupère la réponse de l'API pour obtenir numéro de commande
        let numCommand = response.orderId;
        console.log(numCommand)
        localStorage.setItem("idCommand", JSON.stringify(numCommand)); // on met à jour le localstorage avec numero de commande
        localStorage.setItem("infosOrder",JSON.stringify(order)); // on met à jour le localstorage avec infos de commande
      });

      confirmCommand();
  });


   

  




















// btn2.onclick = function (){

//     let order = {
//         Contact : {
//             firstName : document.getElementById("firstName").value.trim(),
//             lastName : document.getElementById("lastName").value.trim(),
//             adress : document.getElementById("adress").value.trim(),
//             city : document.getElementById("adress").value.trim(),
//             email :document.getElementById("mail").value.trim(),
//         }, products : remplirArrayProduct(),   
//     }

    //     let arrayProduct = [];

    //     function remplirArrayProduct() {
            
    //         arrayProduct.length = 0;
    //         paniers.forEach(element => {
    //         let idProduct = element[0];
    //         arrayProduct.push(idProduct);
    //         return arrayProduct
    //     });
    // } 

//     var myRequest = new Request(arrayProduct(), )
        
//         var total = document.getElementById('total');
//         localStorage.setItem('total', total)

// }



//   function envoieVersServeur(aEnvoyer) {
//     //Envoie de l'objet "aEnvoyer" vers le serveur
//     const promise01 = fetch("http://localhost:3000/api/cameras/order", {
//     method: "POST",
//     body: JSON.stringify(aEnvoyer),
//     headers: {
//     "Content-Type": "application/json",
//     },
//     });

// function validation(event){
//     var prenom = document.getElementById('firstName');
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




