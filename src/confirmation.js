//JS pour remplir la page confirmation à partir de donnés du panier
let numCommande = document.getElementById('NumCommande')
let numStorage = JSON.parse(localStorage.getItem('NumberCommande'));
numCommande.innerHTML = numStorage
let numArticles = document.getElementById('descCommande');
let numbers = JSON.parse(localStorage.getItem('panierStorage'));

//condition qui permet de personnalisé l'affichage 
if (numbers.length > 1) {
    numArticles.innerHTML = 'Vous avez commandez '+ numbers.length +' articles pour un montant de :'
} else {
    numArticles.innerHTML = 'Vous avez commandez '+ numbers.length +' article pour un montant de :'
}

let montantCommande = document.getElementById('montantCommande');
let total = localStorage.getItem('total');
montantCommande.textContent = total;
let accueil = document.getElementById('accueil');
//fonction pour vider le localStorage au retour vers l'acceuil
accueil.addEventListener("click", function() {
    localStorage.clear()});
 