import asyncio
from utils.decrypt import remove_password_from_pdf
from utils.extract import extract_and_clean
from utils.get_info import get_customer_name, get_transactions

remove_password_from_pdf(password="855268")

text = extract_and_clean("documents/output/open-statement.pdf")

async def main():
    customer_name = await get_customer_name(text=text)
    await get_transactions(text=text)
    print(customer_name)
    
if __name__ == "__main__":
    asyncio.run(main())

