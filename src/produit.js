const idProduit = document.getElementById("article");
const params = new URLSearchParams(document.location.search); //pour rechercher l'URL
const id = params.get("id"); //prend le parametre ID


function loadDoc() {
  
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          let cameraSelect = JSON.parse(this.responseText);
         

          idProduit.innerHTML = '<div class="center"><div class="image-presentation"> <img class=img-big src="'
          +cameraSelect.imageUrl +'"> + </div><div>Référence: '+ cameraSelect._id + '<br>' + cameraSelect.description + '<div class="price">' + cameraSelect.price +' €</div><select><Option value="0">' + cameraSelect.lenses[0] +'</Option></select></div></div>';
          
         
        }

    };
    xhttp.open("GET", "http://localhost:3000/api/cameras/"+id, true);
    xhttp.send();
  }

  
  loadDoc();

 
  let nouvel = localStorage.getItem('variable1');
  console.log(nouvel);
  

  /*{"lenses":["35mm 1.4","50mm 1.6"],
  "_id":"5be1ed3f1c9d44000030b061",
  "name":"Zurss 50S",
  "price":49900,
  "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "imageUrl":"http://localhost:3000/images/vcam_1.jpg"}*/