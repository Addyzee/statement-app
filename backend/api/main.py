import pandas as pd
import uuid

from fastapi import FastAPI, UploadFile, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


from typing import Annotated, List
from threading import Thread

from api.cleanup import cleanup_sessions_timely, cleanup_max_sessions

from app.config import DATA_DIR

from app.data_writing.write_data import get_customer_name, write_transactions_data2
from app.document_handling.extract import extract_and_clean2
from app.document_handling.decrypt import remove_password_from_pdf2
from app.data.clean import clean_data2
from app.analysis.analysis import (
    transaction_type_analysis,
    transaction_accounts_analysis,
    time_analysis,
    filterable_headers,
    query_analysis
)
from app.analysis.totals import total_cashflow


app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://statement-app.vercel.app",
    "https://statement-app.vercel.app/"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


session_data = {} 


class QueryPost(BaseModel):
    SessionId: str 
    TTypes: str | List[str] | None = None
    AccountNames: str | List[str] | None = None
    



@app.post("/decrypt/")
async def decrypt_pdf(file: UploadFile, password: Annotated[str, Body()]):
    try:
        decrypted_file = remove_password_from_pdf2(file.file, password)
        text = extract_and_clean2(file=decrypted_file)
        customer_name = await get_customer_name(text=text)
        data = await write_transactions_data2(text)
        clean_data = clean_data2(data)
        session_id = str(uuid.uuid4())
        analysis = await main_analysis(data=clean_data)
        session_data[session_id] = clean_data

        return {
            "the_pdf": file.filename,
            "the_name": customer_name,
            "session_id": session_id,
            "analysis": analysis,
        }
    except Exception as e:
        raise e


async def main_analysis(data: pd.DataFrame):
    try:
        total_amounts = total_cashflow(data)
        types_analysis = transaction_type_analysis(data)
        accounts_analysis = transaction_accounts_analysis(data)
        times_analysis = time_analysis(data)
        headers = filterable_headers()

        return {
            "summary": {
                "total_cashflow": total_amounts,
                "period": times_analysis["period"],
                "top_accounts": accounts_analysis["top_accounts"],
                "highest_months": times_analysis["highest_months"],
                "average_monthly": times_analysis["average_monthly"],
                "safaricom_charges": types_analysis["safaricom_charges"],
                "filterable_headers": headers,
            },
            "months_analysis": times_analysis["monthly_analysis"],
            "transaction_type_analysis": types_analysis,
            "accounts_analysis": accounts_analysis,
        }

    except Exception as e:
        raise e


@app.post("/query/")
async def query_transactions(
    query_post: QueryPost
):
    if query_post.SessionId not in session_data:
        print(session_data.keys())
        return {"Error": "session expired or not found"}

    data: pd.DataFrame = session_data[query_post.SessionId]
    query = {}
    
    t_type = query_post.TTypes
    account_name = query_post.AccountNames

    if t_type:
        if type(t_type) == str:
            t_type = [t_type]
        data = data[data["Type"].isin(t_type)]
        query["Type"] = t_type
        
    if account_name:
        if type(account_name) == str:
            account_name = [account_name]
        data = data[data["Account Name"].isin(account_name)]
        query["account_name"] = account_name
    try: 
        return query_analysis(data=data, queries=query)
    except Exception as e:
        raise e
    

    
Thread(target=cleanup_sessions_timely, args=(session_data,), daemon=True).start()
Thread(target=cleanup_max_sessions, args=(session_data,), daemon=True).start()
        

