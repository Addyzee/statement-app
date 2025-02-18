from typing import List
from datetime import datetime

    
def is_valid_date(date_str: str) -> bool:
    """Check if a string is a valid date in format YYYY-MM-DD"""
    try:
        datetime.strptime(date_str, "%Y-%m-%d")
        return True
    except ValueError:
        return False


def find_transaction_codes(text) -> List[str]:
    words: List[str] = text.split()
    transaction_codes = []

    for i in range(len(words) - 1):  # -1 to avoid index error on last word
        word = words[i]
        next_word = words[i + 1]

        if len(word) == 10 and "P" <= word[0] <= "V" and "A" <= word[1] <= "L":

            # Check if next word is a valid date
            if is_valid_date(next_word):
                transaction_codes.append(word)

    return transaction_codes


def split_by_codes(text: str) -> List[str]:
    codes = find_transaction_codes(text)
    if not codes:
        return [text] if text else []

    chunks = []
    current_pos = 0

    # Split text at each code position
    for i in range(len(codes)):
        next_pos = (
            text.find(codes[i + 1], current_pos + 10) if i + 1 < len(codes) else -1
        )
        if next_pos == -1:
            break

        chunks.append(text[current_pos:next_pos])
        current_pos = next_pos

    # If there's remaining text
    if current_pos < len(text):
        chunks.append(text[current_pos:])

    return chunks