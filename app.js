import myData from "./data.json" assert {type:'json'};

// pobrać bary
// pobrać "cash"
const chartBars = document.querySelectorAll('.bar');
const total = document.querySelector('.cash');

//stworzyć funkcję sumującą dane do p.cash
function summary() {
  const sum = myData.reduce((acc, value) => {
    return acc + value.amount;
  }, 0);
  total.innerHTML = `$ ${sum}`;
 
}
summary();




// utworzenie słupków na podstawie danych 

// funkcja na hovery na poszczególne bary i wyświetlenie danych nad nimi

// funkcja na kliknięcie słupka (zmiana koloru i wyświetlenie danych)