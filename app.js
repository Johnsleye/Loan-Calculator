//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(event){
  //Hide result
  document.getElementById('result').style.display = 'none';

  //show loader
  document.getElementById('loading').style.display = 'block';

  //call calculateResult function after 2 secs
  setTimeout(calculateResult, 2000);

  event.preventDefault();

});

//function to calculate result
function calculateResult() {
  //UI Variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  //compute the monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayment)-principal).toFixed(2);

    //show result
    document.getElementById('result').style.display = 'block';

    //hide loader
    document.getElementById('loading').style.display = 'none';

  }else{
    showError('Please check all your inputs');
  }
}
//Create the show error function
function showError(error) {
  //hide result
  document.getElementById('result').style.display = 'none';

  //hide loader
  document.getElementById('loading').style.display = 'none';
  const errorDiv = document.createElement('div');

  //Get the elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //add a class to the div
  errorDiv.className = 'alert alert-danger';

  //create a text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above the heading
  card.insertBefore(errorDiv, heading);

  //Clear error message after 3 seconds
  setTimeout(clearError, 3000);

}
//function to clear error
function clearError() {
  document.querySelector('.alert').remove();
}