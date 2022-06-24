import myData from "./data.json"assert {
  type: 'json'
};

const chartBars = document.querySelectorAll('.bar');
const total = document.querySelector('.cash');

//stworzyć funkcję sumującą dane do p.cash
function summary() {
  const sum = myData.reduce((acc, value) => {
    return acc + value.amount;
  }, 0);
  total.innerHTML = `$ ${sum}`;
}

//The current day's bar highlighted in a different colour to the other bars
function setActiveDay() {
  let today = new Date();
  let dayId = today.getDay() - 1; 
  chartBars[dayId].classList.add("today");
}

//Dynamically generated bars based on the data provided in the local JSON file
function calcMaxBarHeight(maxPrice) {
  return (100 * maxPrice) / 80;
}

function setHeightOfBars() {
  const maxValue = calcMaxValue();
  const maxHeight = calcMaxBarHeight(maxValue);

  chartBars.forEach(bar => {
    let obj = myData.find(o => o.day === bar.id);
    let height = Math.round((obj.amount * 100) / maxHeight);
    bar.style.height = `${height}%`;
  });
}

function calcMaxValue() {
  let maxValue = myData[0].amount;

  for (let i = 1; i < myData.length; i++) {
    if (myData[i].amount > maxValue) {
      maxValue = myData[i].amount;
    }
  }
  return maxValue;
}

//function mousover, mouseout and click

function removeActiveClass(){
 chartBars.forEach(el => {
  let label = el.getElementsByClassName('amount');
      if (el.classList.contains('active')) {
        el.classList.remove('active', 'today');
        label[0].style.visibility = 'hidden';
      } else {
        el.classList.remove('active', 'today');
      }
    });
}

chartBars.forEach(bar => {
  bar.addEventListener('mouseover', () => {
    let label = bar.getElementsByClassName('amount');
    let obj = myData.find(o => o.day === bar.id);

    label[0].style.visibility = 'visible';
    label[0].innerHTML = `$${obj.amount}`;
  });

  bar.addEventListener('mouseout', () => {
    if (!bar.classList.contains('active')) {
      let label = bar.getElementsByClassName('amount');
      label[0].style.visibility = 'hidden';
    }
  });
 
  bar.addEventListener('click', () => {
    let label = bar.getElementsByClassName('amount');

    if (bar.classList.contains('active')) {
      removeActiveClass();
      label[0].style.visibility = 'hidden';
    } else {
      removeActiveClass();
      bar.classList.add('active');
      label[0].style.visibility = 'visible';
    }
  });
});

setActiveDay();
summary();
setHeightOfBars();