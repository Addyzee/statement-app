import pikepdf

def remove_password_from_pdf(filename, output_name, password=None):
    pdf = pikepdf.open(filename, password=password)
    pdf.save(f"output/{output_name}.pdf")
