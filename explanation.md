Explanation:


Data Structures:

*invoice: Contains information about the customer and a list of performances they attended.

*plays: Contains information about different plays, including their names and types (tragedy or comedy).


Statement Function:

*Initializes totalAmount and volumeCredits to zero.

*Sets up a formatter for currency.

*Loops through each performance in the invoice.performances.

*For each performance, retrieves the corresponding play information.

*Calculates the amount based on the type of play:
**For tragedies, there's a base amount plus an additional charge for audiences over 30.
**For comedies, there's a base amount, an additional charge for audiences over 20, plus an extra amount per audience member.

*Accumulates volume credits:
**Credits for audience members over 30.
**Additional credits for every 5 comedy attendees.

*Adds a line for each performance to the result string, formatted in USD.
*Adds the total amount owed and total volume credits to the result string.


Output:

*Prints the generated statement to the console.