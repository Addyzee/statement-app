import asyncio
from typing import Dict
import datetime

MAX_SESSIONS = 30

async def all_cleanup(data_sessions: Dict):
    asyncio.create_task(cleanup_sessions_timely(data_sessions))
    asyncio.create_task(cleanup_max_sessions(data_sessions))
    asyncio.create_task(daily_cleanup(data_sessions))


async def cleanup_sessions_timely(data_sessions: Dict):
    '''
    This cleans up sessions after short periods. It has a threshold value, which is less than max sessions.
    The reason this is the case is to keep memory usage at a low; whilst max sessions is a higher threshold(say 80% memory), this will keep memory usage at a lower value(maybe 50%) hence less memory usage
    '''
    while True:
        sessions_length = len(list(data_sessions.keys()))
        print(sessions_length)
        await asyncio.sleep(900)
        threshhold_value = 10
        if sessions_length > threshhold_value:
            expired_sessions = list(data_sessions.keys())[:threshhold_value-1]
            for session in expired_sessions:
                if session != "0":
                    print("Sessions length",sessions_length,"Timely cleanup deleting", session)
                    del data_sessions[session]

async def cleanup_max_sessions(data_sessions: Dict):
    ''' 
    These are presumably the maximum number of sessions we can hold without depleting memory
    This runs more frequently than the timely function because if for some reason we have a high period of activity before timely cleanup happens, we can not afford to crash the program
    This function will rarely run, but when it does, it saves us
    '''
    while True:
        sessions_length = len(list(data_sessions.keys()))
        await asyncio.sleep(600)
        if sessions_length > MAX_SESSIONS:
            expired_sessions = list(data_sessions.keys())[:sessions_length-2]
            for session in expired_sessions:
                if session != "0":
                    print("Sessions length", sessions_length, "Max cleanup deleting", session)
                    del data_sessions[session]

async def daily_cleanup(data_sessions: Dict):
    while True:
        await asyncio.sleep(12 * 3600)
        all_sessions = list(data_sessions.keys())
        for session in all_sessions:
            time_created = data_sessions[session]["time_created"]
            if (datetime.datetime.now() - time_created).total_seconds() > 18 * 3600:
                if session != "0":
                    print("Daily cleanup deleting", session)
                    del data_sessions[session]
                
            