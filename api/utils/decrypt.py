import os
from pypdf import PdfReader, PdfWriter
from utils.dirs import get_output_dir, get_document_dir
dir_name = get_document_dir()


def remove_password_from_pdf(filename=dir_name, output_name="open_statement.pdf", password=None):
    try:
        reader = PdfReader(filename)

        if reader.is_encrypted:
            if not reader.decrypt(password):  
                raise ValueError("Incorrect password or decryption failed.")

        writer = PdfWriter(clone_from=reader)

        output_dir = get_output_dir()
        os.makedirs(output_dir, exist_ok=True)

        output_path = os.path.join(output_dir, output_name)

        with open(output_path, "wb") as f:
            writer.write(f)
        return output_path

    except Exception as e:
        raise Exception



