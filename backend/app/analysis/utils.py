import pandas as pd

from collections.abc import Callable
from typing import List

def convert_to_default(
    defaulter_function: Callable[[], List[str]], data:pd.DataFrame, object: List[str] | str | None
):
    if object == None:
        return defaulter_function(data)
    elif type(object) == str:
        return [object]
    elif isinstance(object, list):
        return object
    else:
        raise "Type must be str, list, or None"