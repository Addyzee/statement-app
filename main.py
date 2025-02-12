from decrypt import remove_password_from_pdf
from extract import extract_and_clean
from get_info import get_customer_name, get_transactions

remove_password_from_pdf("documents/statement.pdf", "open-statement.pdf", "855268")

text = extract_and_clean("output/open-statement.pdf")

customer_name = get_customer_name(text=text)
transactions = get_transactions(text=text)
print(customer_name)
print(transactions[:100])

