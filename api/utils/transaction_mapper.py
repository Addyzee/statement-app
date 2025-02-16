transaction_types = {
    "Customer Transfer": "Send money",
    "Funds received": "Receive money",
    "Send Money Reversal": "Reversal",
    "Recharge": "Airtime",
    "Airtime Purchase": "Airtime",
    "Customer Bundle Purchase": "Airtime",
    "Buy Bundles": "Airtime",
    "Pay Bill": "Paybill",
    "Customer Payment to Small": "Pochi la Biashara",
    "Merchant Payment": "Buy Goods",
    "Business Payment": "Receive money from bank/org",
    "Receive funds": "Receive money from bank/org",
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
    "": "No description",
}



def find_2nd(string, substring):
   return string.find(substring, string.find(substring) + 1)


def words_checker(info: str):
    info = info.lower()
    if " to" in info:
        count = info.count(" to")
        split = info.find(" to") if count == 1 else find_2nd(info, " to")
        return split, split + 3
    elif "from" in info:
        count = info.count("from")
        split = info.find("from") if count == 1 else find_2nd(info, "from")
        return split, split + 5
    elif " at" in info:
        count = info.count(" at")
        split = info.find(" at") if count == 1 else find_2nd(info, " at")
        return split, split + 3
    else:
        split = info.find(" -")
        return split, split + 2


def transaction_mapper(description: str, amount: int, mid: bool = False):
    if amount < 0:
        direction = "Out"
    else:
        direction = "In"

    if (
        mid == False
    ):  # mid represents a hyphen. Safaricom transactions don't have a hyphen
        t_type_description = description
        t_party_description = "Safaricom"

    elif mid == True:
        splitter_1, splitter_2 = words_checker(description)
        t_type_description = description[:splitter_1].strip().replace("\n", "")            
        t_party_description = description[splitter_2:].strip().replace("\n", "").strip("-")
    
    

    if description == "":
        t_type_description = "No description"
        return t_type_description, direction, t_party_description
    


    description_lower = t_type_description.lower()
    
    

    for transaction_type in transaction_types.keys():
        if transaction_type.lower() in description_lower:            
            return transaction_types[transaction_type], direction, t_party_description

    return f"Unidentified: {description}", direction, t_party_description

