// création de la fonction loadDoc qui va nous permettre de récupérer un tableau json sur l'api
function loadDoc(success,url){
    var xhttp = new XMLHttpRequest();  //requette Ajax
    xhttp.onreadystatechange = function() { //callback Ajax
      if (this.readyState == 4 && this.status == 200) { //pour verifier que l'on reçoit bien les infos du serveur
      var arrayJSON = JSON.parse(this.responseText);
      success(arrayJSON); //création d'un tableau JSON
      }
    };
    xhttp.open("GET",url, true);//instancie une nouvelle requête
    xhttp.send(); //envoie au serveur la requête
}
// export permet d'utiliser la fonction sur d'autre page js
  export{loadDoc};

