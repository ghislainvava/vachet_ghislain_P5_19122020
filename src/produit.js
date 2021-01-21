import{loadDoc} from './function.js';


const params = new URLSearchParams(document.location.search); //pour rechercher l'URL
const id = params.get("id"); //prend le parametre ID

//const article = document.getElementById('article');

function productHtml(cameraSelect, url){

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


document.getElementById("addToCart").onclick = function(){
   
    let lentille = document.getElementById('selection').value;

    
    let name = document.getElementById('nameH1').innerText;
    // pour recuperer urlimage utiliser getAttribute;
    let srcImage = document.getElementById('imageA').getAttribute('src'); 
    let price = document.querySelector('.price').innerText;
    let descPanier = document.getElementById('descPanier')
    
    let panier = [[id,lentille]];

    console.log(name);
      if (lentille === "Veuillez choisir votre lentille") {
            alert("Vous n'avez pas sélectionné la lentille");
            return;
         }
     if(localStorage.panierStorage == null) {
        localStorage.setItem('panierStorage',JSON.stringify(panier));
        descPanier.textContent ="Vous avez ajouter l'appareil photo: "+ name +" avec la lentille "+ lentille +' dans votre panier';
      } else {
        let cart = JSON.parse(localStorage.getItem('panierStorage'));
        panier = panier.concat(cart);
        localStorage.setItem('panierStorage', JSON.stringify(panier));
        descPanier.textContent = "Vous avez ajouter l'appareil photo: "+ name +" avec la lentille "+ lentille +' dans votre panier';
      }
};

  

 