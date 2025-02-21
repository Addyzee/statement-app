from pypdf import PdfReader
from app.config import OUTPUT_DIR

def extract_and_clean2(file):
    text = extract_text2(file=file)
    text = remove_table_headers(text=text)
    return text
    
def extract_text2(file: PdfReader):
    text = ""
    for page in file.pages:
        whole_page = page.extract_text() + "\n"
        end = whole_page.find("Disclaimer")
        text+=whole_page[:end] 
    return text
    

def extract_and_clean(path: str = OUTPUT_DIR, file_name: str = "open_statement.pdf"):
    text = extract_text(f"{path}/{file_name}")
    text = remove_table_headers(text)
    with open(f"{path}/pdftext.txt","w") as f:
        f.write(text)
    return text

def extract_text(path:str):
    reader = PdfReader(path) 

    # Extracts without the footer part
    text = ""
    
    for page in reader.pages:
        whole_page = page.extract_text() + "\n"
        end = whole_page.find("Disclaimer")
        text+=whole_page[:end] 
    return text
        
# Remove redundant table headers
def remove_table_headers(text):
    start = text.find("Receipt")
    end = text[start:].find("\n") + 1
    text = text [:start + end] + text[start + end:].replace("Receipt No. Completion Time Details Transaction Status Paid In Withdrawn Balance ", "")
    return text



