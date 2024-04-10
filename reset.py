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
        websocket.close()
        
        
schedule.every().day.at("19:13").do(reset)

while True:
    schedule.run_pending()
    time.sleep(10)