import re
import pandas as pd
from .transaction_mapping.transaction_mapper import transaction_mapper
from app.config import OUTPUT_DIR
from .utils import split_by_codes


async def write_transactions_data(text):
    start = text.find("Receipt")
    start += text[start:].find("\n") + 1
    section = text[start:]
    transaction_chunks = split_by_codes(section)
    transaction_chunks = [chunk.strip() for chunk in transaction_chunks if chunk.strip()]
    transactions = []
    try:
        for chunk in transaction_chunks:
            chunk = chunk.replace("\n", " ")
            transaction = {}
            transaction["Transaction code"] = chunk[:10]
            transaction["Date"] = chunk[10:30].strip()
            info = chunk[30:].split("Completed ")

            amounts = info[1].split(" ")
            transaction["Amount"] = float(re.sub(r"[^0-9-.]", "", amounts[0]))
            transaction["Balance"] = float(re.sub(r"[^0-9-.]", "", amounts[1]))

            mid = info[0].find(" -")

            if mid != -1:
                transaction["Type"], transaction["Direction"], transaction["Account ID"], transaction["Account Name"] = (
                    transaction_mapper(
                        description=info[0], amount=transaction["Amount"], mid=True
                    )
                )

            if mid == -1:
                transaction["Type"], transaction["Direction"], transaction["Account ID"], transaction["Account Name"] = (
                    transaction_mapper(
                        description=info[0].strip(),
                        amount=transaction["Amount"],
                        mid=False,
                    )
                )
                
            transaction["Original Transaction"] = info[0].strip()

            transactions.append(transaction)
    except Exception as e:
        raise e
    output_dir = OUTPUT_DIR
    df = pd.DataFrame(transactions)
    df.to_csv(f"{output_dir}/raw_transactions.csv", index=False)
    
async def get_customer_name(text):
    start = text.find("Customer Name")
    length = text[start:].find("\n")
    line = text[start : start + length]
    return line.split(":")[1]
