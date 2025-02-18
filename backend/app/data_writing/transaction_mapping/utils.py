import re

def from_to_at_checker(info: str):
    info = info.lower()

    if re.search(r'\bto\b', info):
        matches = list(re.finditer(r'\bto\b', info))  
        split = matches[0].start() if len(matches) == 1 else matches[1].start()
        return split, split + 2  

    elif re.search(r'\bfrom\b', info):
        matches = list(re.finditer(r'\bfrom\b', info))
        split = matches[0].start() if len(matches) == 1 else matches[1].start()
        return split, split + 4  

    elif re.search(r'\bat\b', info):
        matches = list(re.finditer(r'\bat\b', info))
        split = matches[0].start() if len(matches) == 1 else matches[1].start()
        return split, split + 2 

    # Default case: look for " -"
    else:
        split = info.find(" -")
        return (split, split + 2) if split != -1 else (-1, -1) 