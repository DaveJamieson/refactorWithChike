// Refactoring the code to meet best industry standards involves improving readability, maintainability, and extensibility. Here's a refactored version of the code with detailed comments explaining the improvements:

// Data structure for the invoice which contains customer and performance details
const invoice = {
  customer: "BigCo",
  performances: [
    { playID: "hamlet", audience: 55 },
    { playID: "as-like", audience: 35 },
    { playID: "othello", audience: 40 }
  ]
};

// Data structure for the plays which contains details of each play
const plays = {
  "hamlet": { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  "othello": { name: "Othello", type: "tragedy" }
};

// Function to calculate the amount for a performance based on play type
function calculatePerformanceAmount(perf, play) {
  let thisAmount = 0;
  
  switch (play.type) {
    case "tragedy":
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy":
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 1000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  
  return thisAmount;
}

// Function to calculate volume credits for a performance
function calculateVolumeCredits(perf, play) {
  let volumeCredits = 0;
  
  volumeCredits += Math.max(perf.audience - 30, 0);
  if (play.type === "comedy") {
    volumeCredits += Math.floor(perf.audience / 5);
  }
  
  return volumeCredits;
}

// Function to format the number as currency
function formatAsUSD(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(amount / 100);
}

// Main function to generate the statement
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    const thisAmount = calculatePerformanceAmount(perf, play);
    
    volumeCredits += calculateVolumeCredits(perf, play);
    
    result += `${play.name}: ${formatAsUSD(thisAmount)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }

  result += `Amount owed is ${formatAsUSD(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

// Print the statement to the console
console.log(statement(invoice, plays));
