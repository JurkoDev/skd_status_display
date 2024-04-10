import websockets
import asyncio
import json
import time
import threading
import schedule

def reset():
    uri = "ws://localhost:8765"
    async def reset_async():
        async with websockets.connect(uri) as websocket:
            await websocket.send(json.dumps({"command": "load_config"}))
            print(await websocket.recv())
            await websocket.close()
    
    asyncio.run(reset_async())

        
        

schedule.every().day.at("19:32").do(reset)

while True:
    schedule.run_pending()
    time.sleep(10)