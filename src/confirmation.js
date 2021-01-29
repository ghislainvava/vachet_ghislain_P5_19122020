//JS pour remplir la page confirmation à partir de donnés du panier
const numCommande = document.getElementById('NumCommande')
const numStorage = JSON.parse(localStorage.getItem('NumberCommande'));
numCommande.innerHTML = numStorage
const numArticles = document.getElementById('descCommande');
const numbers = JSON.parse(localStorage.getItem('panierStorage'));

//condition qui permet de personnalisé l'affichage 
if (numbers.length > 1) {
    numArticles.innerHTML = 'Vous avez commandez '+ numbers.length +' articles pour un montant de :'
} else {
    numArticles.innerHTML = 'Vous avez commandez '+ numbers.length +' article pour un montant de :'
}
const montantCommande = document.getElementById('montantCommande');
const total = localStorage.getItem('total');
montantCommande.textContent = total;
const accueil = document.getElementById('accueil');
//fonction pour vider le localStorage au retour vers l'acceuil
accueil.addEventListener("click", function() {
    localStorage.clear()});

