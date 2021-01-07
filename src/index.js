
 import{loadDoc} from './function.js';

export function success(tableauCamera) {
  tableauCamera.forEach(element => {

    //href avec id qui permet de passer l'element avec son id
    var a = document.createElement("a"); 
    a.setAttribute('href', 'produit.html?id='+element['_id']);

    var articles = document.getElementById('articles');
    articles.appendChild(a);

    var object = document.createElement("div");
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
    name.innerText = element.name;
    object.appendChild(name);

    var price = document.createElement('div');
    price.setAttribute('class', 'price');
    price.innerText = element.price/100 + ',00 €'
    object.appendChild(price);

    
          
    });
}
loadDoc(success, "http://localhost:3000/api/cameras");


  