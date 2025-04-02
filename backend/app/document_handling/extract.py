from pypdf import PdfReader

def extract_and_clean(file):
    try:
        text = extract_text(file=file)
        text = remove_table_headers(text=text)
        return text
    except Exception as e:
        raise e
    
def extract_text(file: PdfReader):
    try:
        text = ""
        for page in file.pages:
            whole_page = page.extract_text() + "\n"
            end = whole_page.find("Disclaimer")
            text+=whole_page[:end] 
        return text
    except Exception as e:
        raise e
    
        
# Remove redundant table headers
def remove_table_headers(text):
    start = text.find("Receipt")
    end = text[start:].find("\n") + 1
    text = text [:start + end] + text[start + end:].replace("Receipt No. Completion Time Details Transaction Status Paid In Withdrawn Balance ", "")
    return text



