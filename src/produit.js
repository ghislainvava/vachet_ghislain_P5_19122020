// import nous permet d'utiliser la fonction créer sur function.js
import{loadDoc} from './function.js';
const params = new URLSearchParams(document.location.search); //pour rechercher l'URL
const id = params.get("id"); //prend le parametre ID

// productHtml va nous permettre de recuperer comme on le souhaite le tableau json de l'api
function productHtml(cameraSelect){
//  appel de id "nameH1"et remplissage du code html avec la recuperation du nom de l'object recuperé
  document.getElementById("nameH1").innerHTML = cameraSelect.name;

  var image1 = document.getElementsByTagName("img")[1];
  image1.setAttribute('src',cameraSelect.imageUrl);

  document.getElementById("para_id").innerHTML ='Référence produit: '+cameraSelect._id;
  document.getElementById("desc").innerHTML = cameraSelect.description;

  var price = document.querySelector(".price");
  price.innerHTML = cameraSelect.price /100+ ',00 €';

  //affiche l'option par défaut
  var option = document.createElement('option');
  option.innerHTML ="Veuillez choisir votre lentille";
  var selection = document.querySelector("#selection");
  selection.appendChild(option);

  //selection de la lentille
  cameraSelect.lenses.forEach(element => {
    var option = document.createElement('option');
      option.setAttribute('value',element);
      option.innerText = element;
      selection.appendChild(option);
  });
}
loadDoc(productHtml,"http://localhost:3000/api/cameras/"+id)

// action a effectuer lor du click "addToCart"
document.getElementById("addToCart").onclick = function(){
   
    let lentille = document.getElementById('selection').value;
    let name = document.getElementById('nameH1').innerText;
    // pour recuperer urlimage utiliser getAttribute;
    let srcImage = document.getElementById('imageA').getAttribute('src'); 
    let price = document.querySelector('.price').innerText;
    let descPanier = document.getElementById('descPanier')
    let panier = [[id,lentille]];
  // condition pour vérifier que le choix de la lentille a été effectué
      if (lentille === "Veuillez choisir votre lentille") {
            alert("Vous n'avez pas sélectionné la lentille");
            return;
         }
  // condition qui permet de confirmer le remplissage du panier avec description du remplissage 
     if(localStorage.panierStorage == null) {
        localStorage.setItem('panierStorage',JSON.stringify(panier));
        descPanier.textContent ="Vous avez ajouter l'appareil photo: "+ name +" avec la lentille "+ lentille +' dans votre panier';
      } else {
  // condition qui permet de récupérer les éléments de la panier sur localStorage avant l'ajout dunouvel élément      
        let cart = JSON.parse(localStorage.getItem('panierStorage'));
        panier = panier.concat(cart);
        localStorage.setItem('panierStorage', JSON.stringify(panier));
        descPanier.textContent = "Vous avez ajouter l'appareil photo: "+ name +" avec la lentille "+ lentille +' dans votre panier';
      }
};

  

 