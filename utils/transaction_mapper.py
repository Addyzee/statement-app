transaction_types = {
    "Customer Transfer": "Send money",
    "Funds received": "Receive money",
    "Send Money Reversal": "Reversal",
    "Recharge": "Airtime",
    "Airtime Purchase":"Airtime",
    "Customer Bundle Purchase": "Airtime",
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
    "Withdrawal Charge": "Safaricom Charges",
    "IMT Send Charge": "Safaricom Charges",
    "Pay Merchant Charge": "Safaricom Charges",
    "": "No description" 
}

def transaction_mapper(description: str):
    if 'to' in description:
        direction = "Out"
    elif "from" in description:
        direction = "In"
    else:
        direction = "Out"
        
    for transaction_type in transaction_types.keys():
        if transaction_type in description:
            t_type = transaction_types[transaction_type]
            break
        else:
            t_type = f"Unidentified: {description}"
    return t_type, direction
        