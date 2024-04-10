import websockets
import asyncio
import json
import time
import schedule

async def reset():
    uri = "ws://localhost:8765"
    async with websockets.connect(uri) as websocket:
        await websocket.send(json.dumps({"command": "load_config"}))
        print(await websocket.recv())
        
        
schedule.every().day.at("18:00").do(reset)

while True:
    schedule.run_pending()
    time.sleep(10)