from setuptools import setup, find_packages

setup(
    name="pesa_statements",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        "pandas",
        "pypdf2",
        "fastapi",
    ]
)