transaction_types = {
    "Customer Transfer": "Send money",
    "Funds received": "Receive money",
    "Send Money Reversal": "Reversal",
    "Recharge": "Airtime",
    "Airtime Purchase":"Airtime",
    "Customer Bundle Purchase": "Airtime",
    "Buy Bundles":"Airtime",
    "Pay Bill": "Paybill",
    "Customer Payment to SmallBusiness": "Pochi la Biashara",
    "Merchant Payment": "Buy Goods",
    "Business Payment": "Receive money from bank/org",
    "Receive funds from": "Receive money from bank/org",
    "Transfer from Bank": "Receive money from bank/org",
    "IMTReceive": "International Money Transfer Receipt",
    "Receive International": "International Money Transfer Receipt",
    "Send Money Abroad": "International Money Transfer Sent",
    "Customer Withdrawal": "Withdraw Money",
    "Deposit": "Deposit Cash",
    "M-Shwari Loan": "M-Shwari Loan",
    "Withdrawal Charge": "Withdrawal Charges",
    "IMT Send Charge": "Safaricom Charges",
    "Pay Merchant Charge": "Safaricom Charges",
    "": "No description" 
}

def transaction_mapper(description: str, amount: int):
    if amount < 0:
        direction = "Out"
    else:
        direction = "In"

    if description == "":
        return "No description", direction

    description_lower = description.lower()
    
    for transaction_type in transaction_types.keys():
        if transaction_type.lower() in description_lower:
            return transaction_types[transaction_type], direction

    return f"Unidentified: {description}", direction

        