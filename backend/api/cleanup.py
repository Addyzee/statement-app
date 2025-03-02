import time
from typing import Dict

MAX_SESSIONS = 5


def cleanup_sessions_timely(session_data: Dict[str, str]):
    while True:
        sessions_length = len(list(session_data.keys()))
        time.sleep(900)
        threshhold_value = 3
        if sessions_length > threshhold_value:
            expired_sessions = list(session_data.keys())[:threshhold_value-1]
            for session in expired_sessions:
                del session_data[session]

def cleanup_max_sessions(session_data: Dict[str, str]):
    while True:
        sessions_length = len(list(session_data.keys()))
        time.sleep(600)
        if sessions_length > MAX_SESSIONS:
            expired_sessions = list(session_data.keys())[:sessions_length-2]
            for session in expired_sessions:
                del session_data[session]


            
            