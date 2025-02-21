from fastapi import FastAPI, UploadFile, Body
from fastapi.middleware.cors import CORSMiddleware

from typing import Annotated

from app.data_writing.write_data import get_customer_name
from app.document_handling.extract import extract_and_clean2
from app.document_handling.decrypt import remove_password_from_pdf2

app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# text = extract_and_clean()


# @app.get("/summary")
# async def get_summary():
#     customer_name = await get_customer_name(text=text)
#     return {"Customer Name": customer_name}

@app.post("/upload/")
async def upload_statement(file: UploadFile):
    return {"filename":file.filename}

@app.post("/decrypt/")
async def decrypt_pdf(file: UploadFile, password: Annotated[str, Body()]):
    try:
        decrypted_file = remove_password_from_pdf2(file.file, password)
        text = extract_and_clean2(file=decrypted_file)
        customer_name = await get_customer_name(text=text)
        print(customer_name)
        return {"the pdf":file.filename,
                "the name": customer_name}
    except Exception as e:
        raise e
    
    
    



    
    