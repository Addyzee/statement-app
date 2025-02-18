import asyncio
from app.document_handling.decrypt import remove_password_from_pdf
from app.document_handling.extract import extract_and_clean
from app.data_writing.write_data import get_customer_name, write_transactions_data

remove_password_from_pdf(password="855268")
# remove_password_from_pdf(password="353794")
# remove_password_from_pdf(password="408884")

text = extract_and_clean()

async def main():
    customer_name = await get_customer_name(text=text)
    await write_transactions_data(text=text)
    print(customer_name)
    
if __name__ == "__main__":
    asyncio.run(main())

