from fastapi import FastAPI
from utils.get_info import get_customer_name
from utils.extract import extract_and_clean
from utils.decrypt import remove_password_from_pdf

text = extract_and_clean("documents/output/open-statement.pdf")

app = FastAPI()

@app.get("/summary")
async def get_summary():
    customer_name = await get_customer_name(text=text)
    return {"Customer Name": customer_name}

@app.get("/unlock/{password}")
async def unlock_statement(password: str):
    try:
        output_path = remove_password_from_pdf(password=password)
        return {"Success": output_path}
    except Exception as e:
        raise e
    