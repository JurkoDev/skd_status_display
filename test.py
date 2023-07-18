#!/usr/bin/env python
import os
import asyncio
# import pathlib
# import ssl
import websockets
import json

# ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
# localhost_pem = pathlib.Path(__file__).with_name("localhost.pem")
# ssl_context.load_cert_chain(localhost_pem)

CLIENTS = set()
async def echo(websocket):
    CLIENTS.add(websocket)
    async for message in websocket:
        websockets.broadcast(CLIENTS, message)
        temp = json.loads(message)
        asyncio.create_task(youtube_dl_run(temp))

async def youtube_dl_run(temp):
    if temp["command"] == "login":
        type = temp["type"]
        if type == "pin":
            #query the nonexistant db for token
            jsontemp = json.loads('{"command":"login_response","type":"pin","status":"success","message":"Login success"}')
            websockets.broadcast(CLIENTS, json.dumps(jsontemp))
        if type == "nfckey":
            #query the nonexistant db for token
            jsontemp = json.loads('{"command":"login_response","type":"nfckey","status":"success","message":"Login success"}')
            websockets.broadcast(CLIENTS, json.dumps(jsontemp))
        if type == "su":
            #query the nonexistant db for token
            jsontemp = json.loads('{"command":"login_response","type":"su","status":"success","message":"Login success"}')
            websockets.broadcast(CLIENTS, json.dumps(jsontemp))
    if temp["command"] == "change_status":
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))
        jsontemp = json.loads('{"command":"media_play_youtube_audio","link":""}')
        jsontemp["link"] = streamtemp
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))
    if temp["command"] == "query_status":
        link = temp["link"]
        jsontemp = json.loads('{"command":"media_youtube_video_name","note":""}')
        jsontemp["note"] = streamtemp
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))
    if temp["command"] == "query_user_info":
        link = temp["link"]
        jsontemp = json.loads('{"command":"queue_load_playlist_response","link_array":""}')
        jsontemp["link_array"] = streamtemp
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))
    if temp["command"] == "query_users":
        link = temp["link"]
        jsontemp = json.loads('{"command":"queue_load_playlist_response","link_array":""}')
        jsontemp["link_array"] = streamtemp
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))
    if temp["command"] == "query_user_info":
        link = temp["link"]
        jsontemp = json.loads('{"command":"queue_load_playlist_response","link_array":""}')
        jsontemp["link_array"] = streamtemp
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))
    if temp["command"] == "query_all_status":
        link = temp["link"]
        jsontemp = json.loads('{"command":"queue_load_playlist_response","link_array":""}')
        jsontemp["link_array"] = streamtemp
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))
    if temp["command"] == "query_user_info":
        link = temp["link"]
        jsontemp = json.loads('{"command":"queue_load_playlist_response","link_array":""}')
        jsontemp["link_array"] = streamtemp
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))



async def main():
    async with websockets.serve(echo, "0.0.0.0", 8765):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
