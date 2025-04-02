from pypdf import PdfReader
from app.config import DOCUMENT_DIR
dir_name = DOCUMENT_DIR

    
def remove_password_from_pdf(file,  password=None):
    try:
        reader = PdfReader(file)

        if reader.is_encrypted:
            if password is None:
                raise ValueError("Password is required to decrypt the PDF.")
            if not reader.decrypt(password):  
                raise ValueError("Incorrect password")
        return reader
            
    except Exception as e:
        raise e
        



