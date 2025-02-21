from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.data_writing.write_data import get_customer_name
from app.document_handling.extract import extract_and_clean
from app.document_handling.decrypt import remove_password_from_pdf

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


text = extract_and_clean()


@app.get("/summary")
async def get_summary():
    customer_name = await get_customer_name(text=text)
    return {"Customer Name": customer_name}

@app.post("/upload/")
async def upload_statement(file: UploadFile):
    return {"filename":file.filename}
    



    
    