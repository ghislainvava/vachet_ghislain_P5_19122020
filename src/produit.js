import{loadDoc} from './function.js';


const params = new URLSearchParams(document.location.search); //pour rechercher l'URL
const id = params.get("id"); //prend le parametre ID

function productHtml(cameraSelect, url){

  document.getElementById("nameH1").innerHTML = cameraSelect.name;

  var image1 = document.getElementsByTagName("img")[1];
  image1.setAttribute('src',cameraSelect.imageUrl);

  document.getElementById("para_id").innerHTML ='Référence produit: '+cameraSelect._id;
  document.getElementById("desc").innerHTML = cameraSelect.description;

  var price = document.querySelector(".price");
  price.innerHTML = cameraSelect.price + '€';

  
 
  //affiche l'option par défaut
  var option = document.createElement('option');
  option.innerHTML ="Veuillez choisir votre lentille";
  var selection = document.querySelector("#selection");
  selection.appendChild(option);

  //boucle pour l'option lenses
  for(var i = 0;i<cameraSelect.lenses.length;i++){

      var option = document.createElement('option');
      option.setAttribute('value',cameraSelect.lenses[i]);
      option.innerText = cameraSelect.lenses[i];
      selection.appendChild(option);
  }

  
  
}
loadDoc(productHtml,"http://localhost:3000/api/cameras/"+id)


  
  

  let nouvel = localStorage.getItem('variable1');
  console.log(nouvel);
  

  /*{"lenses":["35mm 1.4","50mm 1.6"],
  "_id":"5be1ed3f1c9d44000030b061",
  "name":"Zurss 50S",
  "price":49900,
  "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "imageUrl":"http://localhost:3000/images/vcam_1.jpg"}*/