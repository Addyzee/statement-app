from .utils import from_to_at_checker
from .transaction_types import transaction_types

def extract_account_id_account_name(account_details: str):
    '''
    
    '''
    account_details = account_details.strip()
    split = account_details.find("-")
    if split == -1:
        split = account_details.find(" ")
        if split == -1:
            account_number = account_details 
            account_name = account_details
        else: 
            account_number = account_details[:split].strip()
            account_name = account_details[split:].strip()
    else:
        account_number = account_details[:split]
        account_name = account_details[split:].strip()
    return account_number.strip(), account_name.strip("-").strip()
  


def transaction_mapper(description: str, amount: int, mid: bool = False):
    if amount < 0:
        direction = "Out"
    else:
        direction = "In"

    if (
        mid == False
    ):  # mid represents a hyphen. Safaricom transactions don't have a hyphen
        t_type_description = description
        t_acc_description = "Safaricom"
        t_acc_id, t_acc_name = extract_account_id_account_name(t_acc_description)


    elif mid == True:
        splitter_1, splitter_2 = from_to_at_checker(description)
        t_type_description = description[:splitter_1].strip().replace("\n", "")            
        t_acc_description = description[splitter_2:].strip().replace("\n", "").strip("-")
        t_acc_id, t_acc_name = extract_account_id_account_name(t_acc_description)
            
    

    if description == "":
        t_type_description = "No description"
        return t_type_description, direction, t_acc_id, t_acc_name
    

    description_lower = t_type_description.lower()
    

    for transaction_type in transaction_types.keys():
        if transaction_type.lower() in description_lower:   
            return transaction_types[transaction_type], direction, t_acc_id, t_acc_name

    return f"Unidentified: {t_type_description}", direction, t_acc_id, t_acc_name

