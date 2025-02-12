from pypdf import PdfReader

def extract_and_clean(path: str):
    text = extract_text(path)
    text = remove_table_headers(text)
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



