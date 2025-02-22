import pandas as pd
import numpy as np

from typing import List, Dict


def total_cashflow(
    data: pd.DataFrame, direction: List[str] | str = ["In", "Out"]
) -> Dict[str, float] | float:
    try:
        if type(direction) == str:
            amount = float(
                np.round(data[data.Direction == direction]["Amount"].sum(), 3)
            )
            return amount
        money_received = float(
            np.round(data[data.Direction == "In"]["Amount"].sum(), 3)
        )
        money_sent = float(np.round(data[data.Direction == "Out"]["Amount"].sum(), 3))
        return {"In": money_received, "Out": money_sent}
    except Exception as e:
        raise e
