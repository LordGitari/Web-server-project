// car detail page js
// i found this code online and modified it a bit
var colors = document.querySelectorAll('.color-option');
for(var i = 0; i < colors.length; i++) {
  colors[i].onclick = function() {
    // remove active from all
    for(var j = 0; j < colors.length; j++) {
      colors[j].classList.remove('active');
    }
      this.classList.add('active');
      var colorName = this.querySelector('.color-name').textContent;
      document.getElementById('selectedColorName').textContent = colorName;
  }
}

function calculatePayment() {
  var price = document.getElementById('vehiclePrice').value;
  var down = document.getElementById('downPayment').value;
  var term = document.getElementById('loanTerm').value;
  var rate = document.getElementById('interestRate').value;
  
  if(!down) down = 0; // if no down payment
  
  var loan = price - down;
  var monthlyRate = (rate/100) / 12;
  
  // this formula was hard to figure out
  var payment = (loan * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
  var interest = (payment * term) - loan;
  var total = parseFloat(price) + interest;
  
  // update the display
  document.getElementById('monthlyPayment').innerHTML = '$' + Math.round(payment);
  document.getElementById('loanAmount').innerHTML = '$' + loan.toLocaleString();
  document.getElementById('totalInterest').innerHTML = '$' + Math.round(interest).toLocaleString();
  document.getElementById('totalCost').innerHTML = '$' + Math.round(total).toLocaleString();
}

// run calculator when page loads
window.onload = function() {
  calculatePayment();
}