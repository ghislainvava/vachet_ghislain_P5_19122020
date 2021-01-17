let numCommande = document.getElementById('NumCommande')
let numStorage = JSON.parse(localStorage.getItem('NumberCommande'));
numCommande.innerHTML = numStorage

let numArticles = document.getElementById('descCommande');
let numbers = JSON.parse(localStorage.getItem('panierStorage'));
// let numberslength = numbres.lenght;
// console.log(numbers);
if (numbers.length > 1) {
    numArticles.innerHTML = 'Vous avez commandez '+ numbers.length +' articles pour un montant de :'
} else {
    numArticles.innerHTML = 'Vous avez commandez '+ numbers.length +' article pour un montant de :'
}

let montantCommande = document.getElementById('montantCommande');
let total = localStorage.getItem('total');
console.log(total)
montantCommande.textContent = total;

localStorage.clear();