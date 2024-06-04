// The 'invoice' object contains details about the customer and the performances they attended.
const invoice = {
  customer: "BigCo", // The name of the customer
  performances: [ // An array of performances attended by the customer
    {
      playID: "hamlet", // ID of the play
      audience: 55 // Number of audience for this performance
    },
    {
      playID: "as-like",
      audience: 35
    },
    {
      playID: "othello",
      audience: 40
    }
  ]
};

// The 'plays' object contains details about each play.
const plays = {
  "hamlet": {"name": "Hamlet", "type": "tragedy"}, // Play with ID 'hamlet' is a tragedy
  "as-like": {"name": "As You Like It", "type": "comedy"}, // Play with ID 'as-like' is a comedy
  "othello": {"name": "Othello", "type": "tragedy"} // Play with ID 'othello' is a tragedy
};

// Function to generate a statement for the given invoice and plays
function statement(invoice, plays) {
  let totalAmount = 0; // Initialize total amount
  let volumeCredits = 0; // Initialize volume credits
  let result = `Statement for ${invoice.customer}\n`; // Start the result string with the customer name
  const format = new Intl.NumberFormat("en-US", { // Formatter for currency
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  // Loop through each performance in the invoice
  for (let perf of invoice.performances) {
    const play = plays[perf.playID]; // Get the play details using playID
    let thisAmount = 0; // Initialize the amount for this performance

    // Calculate the amount based on the type of play
    switch (play.type) {
      case "tragedy":
        thisAmount = 40000; // Base amount for tragedies
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30); // Additional amount for audience over 30
        }
        break;
      case "comedy":
        thisAmount = 30000; // Base amount for comedies
        if (perf.audience > 20) {
          thisAmount += 1000 + 500 * (perf.audience - 20); // Additional amount for audience over 20
        }
        thisAmount += 300 * perf.audience; // Additional amount per audience member
        break;
      default:
        console.log(`unknown type: ${play.type}`); // Log error for unknown play type
        break;
    }

    // Add volume credits for this performance
    volumeCredits += Math.max(perf.audience - 30, 0);
    // Add extra credits for every 10 comedy attendees
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // Add the performance details to the result string
    result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount; // Add this performance's amount to the total
  }

  // Add the total amount and volume credits to the result string
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result; // Return the result string
}

// Print the statement to the console
console.log(statement(invoice, plays));
