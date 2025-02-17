import re

transaction_types = {
    "Customer Transfer": "Send money",
    "Funds received": "Receive money",
    "Send Money Reversal": "Reversal",
    "Recharge": "Airtime",
    "Airtime Purchase": "Airtime",
    "Customer Bundle Purchase": "Airtime",
    "Buy Bundles": "Airtime",
    "Pay Bill Charge": "Safaricom Charges",
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

def party_account_number(party: str):
    party = party.strip()
    split = party.find("=")
    if split == -1:
        split = party.find(" ")
        if split == -1:
            account_number = party 
            party_dets = party
        else: 
            account_number = party[:split].strip()
            party_dets = party[split:].strip()
    else:
        account_number = party[:split]
        party_dets = party[split:].strip()
    return account_number.strip(), party_dets.strip("-").strip()
  


def words_checker(info: str):
    info = info.lower()

    if re.search(r'\bto\b', info):
        matches = list(re.finditer(r'\bto\b', info))  
        split = matches[0].start() if len(matches) == 1 else matches[1].start()
        return split, split + 2  

    elif re.search(r'\bfrom\b', info):
        matches = list(re.finditer(r'\bfrom\b', info))
        split = matches[0].start() if len(matches) == 1 else matches[1].start()
        return split, split + 4  

    elif re.search(r'\bat\b', info):
        matches = list(re.finditer(r'\bat\b', info))
        split = matches[0].start() if len(matches) == 1 else matches[1].start()
        return split, split + 2 

    # Default case: look for " -"
    else:
        split = info.find(" -")
        return (split, split + 2) if split != -1 else (-1, -1) 



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
        t_acc, t_party_dets = party_account_number(t_party_description)


    elif mid == True:
        splitter_1, splitter_2 = words_checker(description)
        t_type_description = description[:splitter_1].strip().replace("\n", "")            
        t_party_description = description[splitter_2:].strip().replace("\n", "").strip("-")
        t_acc, t_party_dets = party_account_number(t_party_description)
    
    

    if description == "":
        t_type_description = "No description"
        return t_type_description, direction, t_acc, t_party_dets
    

    description_lower = t_type_description.lower()
    
    

    for transaction_type in transaction_types.keys():
        if transaction_type.lower() in description_lower:            
            return transaction_types[transaction_type], direction, t_acc, t_party_dets

    return f"Unidentified: {description}", direction, t_acc, t_party_dets

