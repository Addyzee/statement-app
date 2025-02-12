from extract import extract_and_clean
from get_info import get_customer_name, get_transactions

text = extract_and_clean("output/open-statement.pdf")

customer_name = get_customer_name(text=text)
transactions = get_transactions(text=text)
print(customer_name)
print(transactions[:100])

