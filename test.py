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
        temp = json.loads(message)
        asyncio.create_task(youtube_dl_run(temp))

async def youtube_dl_run(temp):
    if temp["command"] == "login":
        type = temp["type"]
        if type == "pin":
            #query the nonexistant db for token
            #temp code
            if temp["pin"] == "1234":
                jsontemp = json.loads('{"command":"login_response","type":"pin","status":"success","message":"Login success","username":"jozefinka","token":"jozefinka_token"}')
                websockets.broadcast(CLIENTS, json.dumps(jsontemp))
                return
            if temp["pin"] == "123":
                jsontemp = json.loads('{"command":"login_response","type":"pin","status":"success","message":"Login success","username":"šmikalova","token":"šmikalova_token"}')
                websockets.broadcast(CLIENTS, json.dumps(jsontemp))
                return
            #temp code end
            jsontemp = json.loads('{"command":"login_response","type":"pin","status":"error","message":"Login failed"}')
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
        auth = temp["auth"]
        state = temp["state"]
        #query the nonexistant db for state
        #temp code
        if auth != "" and auth == "jozefinka_token":
            #write to the nonexistant db
            jsontemp = json.loads('{"command":"change_status_response","status":"success","message":"Status changed","state":"","auth":""}')
            jsontemp["state"] = state
            jsontemp["auth"] = auth
            websockets.broadcast(CLIENTS, json.dumps(jsontemp))
            return
        #temp code end
        jsontemp = json.loads('{"command":"change_status_response","status":"error","message":"status not changed"}')
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))
    if temp["command"] == "query_status":
        auth = temp["auth"]
        # use auth to request state from db
        #temp code
        state = "home"
        if auth != "" and auth == "jozefinka_token":
            jsontemp = json.loads('{"command":"query_status_response","state":"","auth":""}')
            jsontemp["auth"] = auth
            jsontemp["state"] = state
            websockets.broadcast(CLIENTS, json.dumps(jsontemp))
            return
        #temp code end
        jsontemp = json.loads('{"command":"query_status_response","state":"error","auth":""}')
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))
    if temp["command"] == "query_user_info":
        auth = temp["auth"]
        # use auth to request state from db
        #temp code
        if auth != "" and auth == "jozefinka_token":
            jsontemp = json.loads('{"command":"query_user_info_response","auth":""}')
            jsontemp["auth"] = auth
            jsontemp["name"] = name
            websockets.broadcast(CLIENTS, json.dumps(jsontemp))
            return
        #temp code end
        jsontemp = json.loads('{"command":"query_user_info_response","username":"error","auth":""}')
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
