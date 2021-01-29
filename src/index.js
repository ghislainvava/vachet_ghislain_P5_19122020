
const articles = document.getElementById('articles');
fetch('http://localhost:3000/api/cameras')
  
    // Récupère une réponse au format json
    .then(function(response)  {
        return response.json();
    })
    // Récupère la liste des produits
    .then(function(tableauCamera) {
      success(tableauCamera)
    })
    //gestion erreur 
    .catch((error) => {
      console.log(error)
    });


// fonction qui permet de remplir le 1er parametre de loadDoc
function success(tableauCamera) {
  // boucle qui permet de remplir 'articles' par les différents éléments de l'api
  
   tableauCamera.forEach(element => {

    const object = document.createElement("div");
    // setAttribute ajoute ici une classe à object
    object.setAttribute('class', 'object');
    articles.appendChild(object);

    // createElement permet de creer en html un nouvel élément
    const a = document.createElement("a"); 
    //href avec id qui permet de passer l'element avec son id
    a.setAttribute('href', 'produit.html?id='+element['_id']);
    object.appendChild(a);

    const imgSize = document.createElement('div');
    imgSize.setAttribute('class', 'img-size');
    a.appendChild(imgSize);

    const img = document.createElement('img');
    img.setAttribute('src', element.imageUrl);
    img.setAttribute('alt',"<image appareil sélectionné>");
    imgSize.appendChild(img);

    const name = document.createElement('div');
    name.setAttribute('class','name');
    // innerText permet de definir ce que name doit écrire
    name.innerText = element.name;
    object.appendChild(name);

    const price = document.createElement('div');
    price.setAttribute('class', 'price');
    price.innerText = element.price/100 + ',00 €'
    object.appendChild(price); 
    });
}


  