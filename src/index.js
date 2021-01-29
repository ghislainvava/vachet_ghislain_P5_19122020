// import permet d'utiliser la fonction loadDoc() créer sur function.js
 import{loadDoc} from './function.js';

// fonction qui permet de remplir le 1er parametre de loadDoc
function success(tableauCamera) {
  // boucle qui permet de remplir 'articles' par les différents éléments de l'api
  
   tableauCamera.forEach(element => {

    // createElement permet de creer en html un nouvel élément
    var a = document.createElement("a"); 

    //href avec id qui permet de passer l'element avec son id
    a.setAttribute('href', 'produit.html?id='+element['_id']);

    var articles = document.getElementById('articles');
    // appendChild permet de pointer de qui a est l'enfant
    articles.appendChild(a);

    var object = document.createElement("div");
    // setAttribute ajoute ici une classe à object
    object.setAttribute('class', 'object');
    a.appendChild(object);

    var imgSize = document.createElement('div');
    imgSize.setAttribute('class', 'img-size');
    object.appendChild(imgSize);

    var img = document.createElement('img');
    img.setAttribute('src', element.imageUrl);
    img.setAttribute('alt',"<image appareil sélectionné>");
    imgSize.appendChild(img);

    var name = document.createElement('name');
    name.setAttribute('class','name');
    // innerText permet de definir ce que name doit écrire
    name.innerText = element.name;
    object.appendChild(name);

    var price = document.createElement('div');
    price.setAttribute('class', 'price');
    price.innerText = element.price/100 + ',00 €'
    object.appendChild(price); 
    });
}
// loadDoc est apellé en utilisant sucess decrit plus haut et le lien vers l'api
loadDoc(success, "http://localhost:3000/api/cameras");


  