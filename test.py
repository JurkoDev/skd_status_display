#!/usr/bin/env python
import os
import asyncio
# import pathlib
# import ssl
import websockets
import json
import yaml

# ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
# localhost_pem = pathlib.Path(__file__).with_name("localhost.pem")
# ssl_context.load_cert_chain(localhost_pem)

data = []
places = []
pin = []

with open('config.yaml', 'r', encoding='utf8',) as file:
    configuration = yaml.safe_load(file)
    data = configuration["data"]
    places = configuration["places"]
    pin = configuration["pin"]
    print("yaml loaded")

# data = [{ "value": "č.3", "name": "Smikalova 2.B", "april":"Šmikalova", "color": "yellow", "place": "trieda"},{ "value": "č.4", "name": "Lomen 1.A,C", "april":"", "color": "purple", "place": "trieda" },{ "value": "č.7", "name": "Lehutova 1.B,C", "april":"Pálenka", "color": "pink", "place": "trieda" },{ "value": "č.12", "name": "Lenčešová 1.D,C", "april":"", "color": "orange", "place": "trieda" },] 
# places = [{"category": "Trieda","id": "trieda"},{"category": "Školsky dvor","id": "skolsky_dvor"},{"category": "Zahradka","id": "zahradka"}]

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
    if temp["command"] == "change_status_commentout":
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

    if temp["command"] == "user_login":
        jsontemp = json.loads('{"command":"user_login_response","admin":false}')
        jsontemp["session"] = temp["session"]

        #get the id of the pin (var temp["pin"]) from var array pin
        for i in range(len(pin)):
            if pin[i]["pin"] == temp["pin"]:
                jsontemp["id"] = pin[i]["id"]
                jsontemp["admin"] = pin[i]["admin"]
            print("try:")
            print(pin[i]["id"])
            print(pin[i]["pin"])
            print(temp["pin"])
            print(int(temp["pin"]))


        # match temp["pin"]:
        #     case "616263":
        #         jsontemp["user"] = "adam"
        #         jsontemp["admin"] = True
        #     case "515253":
        #         jsontemp["user"] = "Smikalova 2.B"
        #     case "414243":
        #         jsontemp["user"] = "Lomen 1.A,C"
        
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))
        # websockets.send(json.dumps(jsontemp))


    if temp["command"] == "data":
        jsontemp = json.loads('{"command":"data_response","data":"","placing":""}')
        jsontemp["data"] = data
        jsontemp["places"] = places
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))

        websockets.broadcast(CLIENTS, json.dumps(json.loads('{"command":"user_login_update"}')))
    if temp["command"] == "data_write":
        tempid = temp["id"]

        # find in array data a dictionary where var tempname matches name then set the value of place to var tempplace

        for i in range(len(data)):
            if data[i]["id"] == tempid:
                data[i]["place"] = temp["place"]


        jsontemp = json.loads('{"command":"data_write_response"}')
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))

        jsontemp = json.loads('{"command":"data_response","data":"","placing":""}')
        jsontemp["data"] = data
        jsontemp["places"] = places
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))
    if temp["command"] == "data_write_custom_place":
        tempid = temp["id"]

        # find in array data a dictionary where var tempname matches name then set the value of place to var tempplace
        found = False
        for i in range(len(places)):
            if places[i]["id"] == tempid:
                places[i]["category"] = temp["place"]
                found = True

        if not found:
            places.append({"category": temp["place"], "id": tempid})



        jsontemp = json.loads('{"command":"data_write_custom_place_response"}')
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))

        jsontemp = json.loads('{"command":"data_response","data":"","placing":""}')
        jsontemp["data"] = data
        jsontemp["places"] = places
        websockets.broadcast(CLIENTS, json.dumps(jsontemp))

    # websockets.broadcast(CLIENTS, json.dumps(temp))



async def main():
    async with websockets.serve(echo, "0.0.0.0", 8765):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    print("starting server")
    asyncio.run(main())
