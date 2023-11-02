document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const coins = document.querySelector('#coin-array').value.split(',').map(Number);
    const amount = parseInt(document.querySelector('#amount').value);
  
    const coinArrayElement = document.createElement('p');
    coinArrayElement.textContent = `Coin array: ${coins}`;
  
    const amountElement = document.createElement('p');
    amountElement.textContent = `Amount: ${amount}`;
  
    const resultElement = document.createElement('p');
    resultElement.textContent = `Result: `;
  
    const container = document.querySelector('body');
    container.appendChild(coinArrayElement);
    container.appendChild(amountElement);
    container.appendChild(resultElement);
  
    // Call the function to solve the coin change problem with the input values
  });
  
  // Get the buttons
  const greedyButton = document.querySelector('#greedy-button');
  const dynamicButton = document.querySelector('#dynamic-button');
  const bruteForceButton = document.querySelector('#bruteforce-button');



  // Add event listeners to the greedy buttons
  greedyButton.addEventListener('click', () => {
   // Retrieve input values
   const coinsInput = document.getElementById("coin-array").value;
   const amountInput = document.getElementById("amount").value;
 
   // Convert input to array of integers
   const coins = coinsInput.split(",").map(coin => parseInt(coin.trim()));
   const amount = parseInt(amountInput);
 
   // Calculate result using coinChangeGreedy()
   const { result, amount: amountLeft, selectedCoins, executionTime } = coinChangeGreedy(coins, amount);
   if(amountLeft==0){
          
          const greedyAlertContainer = document.getElementById("greedy-alert-container");
          greedyAlertContainer.innerHTML = '<div class="alert">Greedy Algorithm: Minimum number of coins: ' + result + '<br>Execution Time: ' + executionTime + ' milliseconds<br>Selected coins: ' + selectedCoins.join(' ,') + '</div>';
          alert(`Greedy Algorithm:\nMinimum number of coins: ${result}\nExecution Time: ${executionTime} milliseconds \nSelected coins: ${selectedCoins.join(', ')}`);

    }else{

          // Display result
          const greedyAlertContainer = document.getElementById("greedy-alert-container");
          greedyAlertContainer.innerHTML = '<div class="alert">Greedy Algorithm: Minimum number of coins: ' + result + '<br>Execution Time: ' + executionTime + ' milliseconds<br>Selected coins: ' + selectedCoins.join(' ,') + '</div>';
          alert(`Greedy Algorithm:\nUsing greedy algorithm, this amount is not TOTALLY changeable for these coin.`);

    }
  });




  // Add event listeners to the dynamic buttons

 dynamicButton.addEventListener('click', () => {
   // Retrieve input values
   const coinsInput = document.getElementById("coin-array").value;
   const amountInput = document.getElementById("amount").value;
 
   // Convert input to array of integers
   const coins = coinsInput.split(",").map(coin => parseInt(coin.trim()));
   const amount = parseInt(amountInput);
 
   // Calculate result using coinChangeDynamic()
   const { result, selectedCoins, executionTime } = coinChangeDynamic(coins, amount);

   // Display result
   const dynamicAlertContainer = document.getElementById("dynamic-alert-container");
   dynamicAlertContainer.innerHTML = '<div class="alert">Dynamic Algorithm: Minimum number of coins: ' + result + '<br>Execution Time: ' + executionTime + ' milliseconds<br>Selected coins: ' + selectedCoins.join(', ') + '</div>';

   alert(`Dynamic Algorithm:\nMinimum number of coins: ${result}\nExecution Time: ${executionTime} milliseconds\nSelected coins: ${selectedCoins.join(', ')}`);
  });



   
   // Add event listeners to the brute force buttons

   bruteForceButton.addEventListener('click', () => {
   // Retrieve input values
   const coinsInput = document.getElementById("coin-array").value;
   const amountInput = document.getElementById("amount").value;
 
   // Convert input to array of integers
   const coins = coinsInput.split(",").map(coin => parseInt(coin.trim()));
   const amount = parseInt(amountInput);
 
// Calculate result using coinChangeBruteForce()
const { result, selectedCoins, executionTime } = coinChangeBruteForce(coins, amount);

// Display result
const bruteForceAlertContainer = document.getElementById("bruteforce-alert-container");
bruteForceAlertContainer.innerHTML = '<div class="alert">Brute Force Algorithm: Minimum number of coins: ' + result + '<br>Execution Time: ' + executionTime + ' milliseconds<br>Selected coins: ' + selectedCoins.join(', ') + '</div>';
alert(`Brute Force Algorithm:\nMinimum number of coins: ${result}\nExecution Time: ${executionTime} milliseconds\nSelected coins: ${selectedCoins.join(', ')}`);
});

 
// Greedy algorithm

 function coinChangeGreedy(coins, amount) {
  const startTime = performance.now();
  let result = 0;
  const selectedCoins = []; // Array to store the selected coins

  for (let i = coins.length - 1; i >= 0; i--) {
    while (amount >= coins[i]) {
      amount -= coins[i];
      result++;
      selectedCoins.push(coins[i]); // Store the selected coin
    }
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;

  return { result: result, amount: amount, selectedCoins: selectedCoins, executionTime: executionTime };
}

  

// Dynamic programming algorithm
function coinChangeDynamic(coins, amount) {
  const startTime = performance.now(); // Get the start time in milliseconds
  const dp = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER); // Create an array to store the minimum number of coins needed for each amount
  const selectedCoins = new Array(amount + 1).fill(0); // Create an array to track the selected coin for each amount
  dp[0] = 0; // Base case: 0 coins needed to make amount 0

  for (let i = 1; i <= amount; i++) { // Iterate through each amount from 1 to the target amount
    for (let j = 0; j < coins.length; j++) { // Iterate through each coin
      if (coins[j] <= i && dp[i - coins[j]] + 1 < dp[i]) { // Check if the coin value is less than or equal to the current amount and results in a smaller number of coins needed
        dp[i] = dp[i - coins[j]] + 1; // Update the minimum number of coins needed for the current amount
        selectedCoins[i] = coins[j]; // Update the selected coin for the current amount
      }
    }
  }

  const selectedCoinsList = []; // Array to store the selected coins
  let remainingAmount = amount;
  while (remainingAmount > 0) {
    selectedCoinsList.push(selectedCoins[remainingAmount]); // Store the selected coin
    remainingAmount -= selectedCoins[remainingAmount]; // Update the remaining amount
  }

  const endTime = performance.now(); // Get the end time in milliseconds
  const executionTime = endTime - startTime; // Calculate the execution time in milliseconds

  return { result: dp[amount], selectedCoins: selectedCoinsList, executionTime: executionTime };
}






// Brute force algorithm
function coinChangeBruteForce(coins, amount) {
  const startTime = performance.now(); // Get the start time in milliseconds

  function helper(coins, amount, index) {
    if (amount === 0) {
      return { result: 0, selectedCoins: [] }; // Base case: If amount becomes zero, no more coins needed
    }
    if (index === coins.length) {
      return { result: Number.MAX_SAFE_INTEGER, selectedCoins: [] }; // Base case: If no more coins available, return a large value
    }
    let minCoins = Number.MAX_SAFE_INTEGER;
    let selectedCoins = [];
    for (let i = 0; coins[index] * i <= amount; i++) {
      // Try using different multiples of the current coin and find the minimum result
      const { result, selectedCoins: subSelectedCoins } = helper(coins, amount - coins[index] * i, index + 1);
      if (result + i < minCoins) {
        minCoins = result + i;
        selectedCoins = [...subSelectedCoins, ...Array(i).fill(coins[index])];
      }
    }
    return { result: minCoins, selectedCoins: selectedCoins }; // Return the minimum number of coins needed and the selected coins
  }

  const { result, selectedCoins } = helper(coins, amount, 0); // Call the helper function to compute the result and selected coins

  const endTime = performance.now(); // Get the end time in milliseconds
  const executionTime = endTime - startTime; // Calculate the execution time in milliseconds

  return { result: result, selectedCoins: selectedCoins, executionTime: executionTime }; // Return the result, selected coins, and execution time
}
