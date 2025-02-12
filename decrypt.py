import os
from pypdf import PdfReader, PdfWriter


def remove_password_from_pdf(filename, output_name, password=None):
    try:
        reader = PdfReader(filename)

        if reader.is_encrypted:
            if not reader.decrypt(password):  
                raise ValueError("Incorrect password or decryption failed.")

        writer = PdfWriter(clone_from=reader)

        output_dir = "output"
        os.makedirs(output_dir, exist_ok=True)

        output_path = os.path.join(output_dir, output_name)

        with open(output_path, "wb") as f:
            writer.write(f)

    except Exception as e:
        print(f"Error: {e}")



