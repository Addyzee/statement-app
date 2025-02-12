import pikepdf

statement = pikepdf.open("output/open-statement.pdf")

print(statement.pages[0])