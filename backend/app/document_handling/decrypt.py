import os
from pypdf import PdfReader, PdfWriter
from app.config import DOCUMENT_DIR, OUTPUT_DIR
dir_name = DOCUMENT_DIR


def remove_password_from_pdf(filename=dir_name, output_name="open_statement.pdf", password=None):
    try:
        reader = PdfReader(filename)

        if reader.is_encrypted:
            if not reader.decrypt(password):  
                raise ValueError("Incorrect password or decryption failed.")

        writer = PdfWriter(clone_from=reader)

        output_dir = OUTPUT_DIR
        os.makedirs(output_dir, exist_ok=True)

        output_path = os.path.join(output_dir, output_name)

        with open(output_path, "wb") as f:
            writer.write(f)
        return output_path

    except Exception as e:
        raise e
    
def remove_password_from_pdf2(filename=dir_name, output_name="open_statement.pdf", password=None):
    try:
        reader = PdfReader(filename)

        if reader.is_encrypted:
            if not reader.decrypt(password):  
                raise ValueError("Incorrect password or decryption failed.")
    except Exception as e:
        return e
        



