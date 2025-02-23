import pandas as pd
from .totals import total_cashflow


def total_outin_by_month(data: pd.DataFrame):
    grouped_data = data.groupby(pd.Grouper(key='Date', axis=0,  freq='ME'))
    mapped_amounts = {}
    
    for date, df in grouped_data:
        month_year = date.strftime("%b-%Y")
        amounts = total_cashflow(data=df)
        mapped_amounts[month_year] = amounts
    return mapped_amounts