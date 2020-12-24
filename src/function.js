function loadDoc(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          let tableauCamera = JSON.parse(this.responseText);
       tableauCamera.forEach(element => {
           
        document.getElementById("articles").innerHTML += '<a href="produit.html?id='
                                    +element['_id']+'"><div class="object"><div class="img-size"> <img src="'
                                    + element["imageUrl"] +'"> </div> <div class="name">'
                                    + element["name"] + '</div> <div class="price"> '
                                    + element["price"] + ' €</div></div></a>';
  
            //href avec id qui permet de passer l'element avec son id
      });
       
       
       document.getElementById("img_presentation").innerHTML = '<img src="http://localhost:3000/images/vcam_5.jpg">';
      }
    };
    xhttp.open("GET", "http://localhost:3000/api/cameras", true);
    xhttp.send();
}

function parseJson {
    
}
 
  export{loadDoc};