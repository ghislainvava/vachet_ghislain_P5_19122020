import{loadDoc} from './function.js';
var somme = 0;
function afficherPanier(){
    let paniers = JSON.parse(localStorage.getItem('panierStorage'));
    
    paniers.forEach(element => {

        let a = document.createElement("a"); 
           a.setAttribute('href', 'produit.html?id='+element[0]);

        let presentationArticleInPanier = document.getElementById('presentationArticleInPanier');
        presentationArticleInPanier.appendChild(a);

        let objectDuPanier = document.createElement("div");
        objectDuPanier.setAttribute('class', 'objectDuPanier');
        a.appendChild(objectDuPanier);
        

        let idServeur = "http://localhost:3000/api/cameras/" +element[0];
        loadDoc(function(cameraSelect2){

            let name = cameraSelect2.name;
            let srcImage = cameraSelect2.imageUrl; 
            let price = cameraSelect2.price;

            let imageArticlePanier = document.createElement('img');
            imageArticlePanier.setAttribute('id', 'imageArticlePanier');
            imageArticlePanier.setAttribute('src', srcImage)
            objectDuPanier.appendChild(imageArticlePanier);

            
            let nameArticlePanier = document.createElement('p');
            nameArticlePanier.setAttribute('id', 'nameArticlePanier');
            nameArticlePanier.textContent = name;
            objectDuPanier.appendChild(nameArticlePanier);

            let lentilleChoisiPanier = document.createElement('p');
            lentilleChoisiPanier.setAttribute('id', 'lentilleChoisiPanier');
            lentilleChoisiPanier.textContent = element[1];
            objectDuPanier.appendChild(lentilleChoisiPanier);
    
            
            let priceArticlePanier = document.createElement('p');
            priceArticlePanier.setAttribute('id', 'priceArticlePanier');
            priceArticlePanier.textContent = price/100 +',00 €'; 
            objectDuPanier.appendChild(priceArticlePanier);

            somme += price;

            var total = document.getElementById('total');
            total.innerText = 'Total de votre commande  :  '+somme/100 + ',00 €';
           

        },idServeur);

    });

}
afficherPanier();







