import random
from typing import List
from .names import first_names, last_names
random.seed(42)


def names_generator(number_of_names: int):
    names = []
    for i in range(len(first_names)):
            for j in range(len(last_names)):
                name = f"{first_names[i]} {last_names[j]}"
                names.append(name)
    random.shuffle(names)
    
    return names[:number_of_names]

def get_mapped_names(names: List[str]):
    names = list(set(names))
    names_len = len(names)
    anon_names = names_generator(names_len)
    mapped_names = {}
    for i in range(names_len):
        mapped_names[names[i]] = anon_names[i]
        
    return mapped_names
        