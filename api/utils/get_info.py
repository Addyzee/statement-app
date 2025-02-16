import re
import json
import pandas as pd
from utils.transaction_mapper import transaction_mapper
from utils.dirs import get_output_dir
from typing import List
from datetime import datetime


async def get_customer_name(text):
    start = text.find("Customer Name")
    length = text[start:].find("\n")
    line = text[start : start + length]
    return line.split(":")[1]


def is_valid_date(date_str: str) -> bool:
    """Check if a string is a valid date in format YYYY-MM-DD"""
    try:
        datetime.strptime(date_str, '%Y-%m-%d')
        return True
    except ValueError:
        return False

def find_transaction_codes(text) -> List[str]:
    words: List[str] = text.split()
    transaction_codes = []

    for i in range(len(words) - 1):  # -1 to avoid index error on last word
        word = words[i]
        next_word = words[i + 1]
        
        if (len(word) == 10 and
            'P' <= word[0] <= 'V' and
            'A' <= word[1] <= 'L'):
            
            # Check if next word is a valid date
            if is_valid_date(next_word):
                transaction_codes.append(word)

    return transaction_codes

def split_by_codes(text: str, codes: List[str]) -> List[str]:
    if not codes:
        return [text] if text else []
    
    chunks = []
    current_pos = 0
    
    # Split text at each code position
    for i in range(len(codes)):
        next_pos = text.find(codes[i+1], current_pos+10) if i+1 < len(codes) else -1
        if next_pos == -1:
            break
            
        chunks.append(text[current_pos:next_pos])
        current_pos = next_pos
    
    # If there's remaining text
    if current_pos < len(text):
        chunks.append(text[current_pos:])
    
    return chunks
        


async def get_transactions(text):
    start = text.find("Receipt")
    start += text[start:].find("\n") + 1
    section = text[start:]
    codes = find_transaction_codes(section)
    chunks = split_by_codes(section, codes)
    chunks = [chunk.strip() for chunk in chunks if chunk.strip()]
    transactions = []
    try:
        for idx, chunk in enumerate(chunks):
            transaction = {}
            transaction["Transaction code"] = chunk[:10]
            transaction["Date"] = chunk[10:30].strip()
            info = chunk[30:].split("Completed ")
            mid = info[0].find(" -")
            amounts = info[1].split(" ")
            transaction["Amount"] = float(re.sub(r'[^0-9-.]', '', amounts[0]))
            transaction["Balance"] = float(re.sub(r'[^0-9-.]', '', amounts[1]))

            if mid != -1:
                description = info[0].split(" -")
                transaction["Type"], transaction["Direction"] = transaction_mapper(
                    description[0].strip().replace("\n", ""), transaction["Amount"]
                )
                transaction["Party"] = description[1].strip().replace("\n", "")
            if mid == -1:
                transaction["Type"], transaction["Direction"] = transaction_mapper(
                    info[0].strip(), transaction["Amount"]
                )
                transaction["Party"] = "Safaricom"
                

            transactions.append(transaction)
    except Exception as e:
        raise e
    output_dir = get_output_dir()
    df = pd.DataFrame(transactions)
    df.to_csv(f"{output_dir}/transactions.csv")
