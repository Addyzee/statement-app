from dotenv import load_dotenv
import os

load_dotenv(".env.example")


def get_document_dir():
    dir = os.getenv("DOCUMENT_DIRECTORY")
    doc_name = os.getenv("DOCUMENT_NAME")
    full_dir = os.path.join(dir,doc_name)
    return full_dir

def get_output_dir():
    output_dir = os.getenv("OUTPUT_DIR")
    return output_dir