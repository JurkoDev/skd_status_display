'use client';

import { v4 as uuidv4 } from 'uuid';
import { unsubscribe } from "diagnostics_channel";
import { any, element, number, string } from "prop-types";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { customMessage, pinError, pinInput } from './item';

export function useWebSocket() {

  var [data, setData] = useState([{id: number, value:string, name:string, april:string, color:string, place:string}]);
  var [places, setPlaces] = useState([{category:string, id:string}]);
  var [state, setState] = useState("");
  var [user, setUser] = useState("");
  var [userid, setUserid] = useState("");
  var [adminuser, setAdminuser] = useState(false);
  var [ws, setWs] = useState();
  var [session, setsession] = useState("");

  // var onmessage_handler: (event: MessageEvent) => void;

  const onmessage_handler = useRef((event: MessageEvent) => { });

  useEffect(() => {
    onmessage_handler.current = (event: { data: string; }) => {
      var message = JSON.parse(event.data);
      if (message.command === "user_login_response") {
        // if id is not defined return
        if (message.id == null) {
          pinError.current.innerHTML = "Nesprávny pin";
          return;
        }
        if (message.session !== session) {
          return;
        }
        // if admin is true then set state to user_select and set adminuser to true
        if (message.admin === true) {
          setState("user_select");
          setAdminuser(true);
        } else {
          // find the dict in data where id eqauls message.id then set user to name
          data.forEach((i) => {
            console.log(i);
            if (i.id == message.id) {
              setUser(i.name);
              setUserid(message.id);
              setState("main");
            }
          });
        }
      }
    };
    // setOnmessage_handler(() => (event: MessageEvent) => onmessage_handlertemp(event));
  }, [data, session]);

  const connectWebSocket = () => {
    const ws = new WebSocket("ws://skd.zsdudova.sk:8765");
    // const ws = new WebSocket("wss://bm7247ff-8765.euw.devtunnels.ms/");
    setWs(ws);
    ws.onopen = () => {
      var uuid = uuidv4().toString();
      setsession(uuid);
      ws.send(JSON.stringify({ command: "data" }));
      console.log("connected");
      setState("login");
    };
    ws.addEventListener("message", (event) => {
      onmessage_handler.current(event);
      var message = JSON.parse(event.data);
      if (message.command === "data_response") {
        setData(message.data);
        console.log(message.data);
        setPlaces(message.places);
      }
    });
    const unsubscribe = () => { ws.onmessage = null; ws.close(); };

    return { unsubscribe, ws }
  };

  const userselectclick = (item: any) => {
    setUser(item.name);
    setUserid(item.id);
    setState("main");
  };

  const dataupdate = (item: { id: any; }, ws: any, userid: any) => {
    ws.send(JSON.stringify({ command: "data_write", "id": userid, "name": user, "place": item.id }));
    if (adminuser == true) {
      setState("user_select");
    } else {
      userreset();
    }
  };

  const login = (ws: any) => {
    ws.send(JSON.stringify({ command: "user_login", "pin": pinInput.current.value, "session": session }));
  };

  const userreset = () => {
    setUser("");
    setAdminuser(false);
    setState("login");
  };

  const registerCustomPlace = (ws: any, userid: any) => {	
    ws.send(JSON.stringify({ command: "data_write_custom_place", "id": userid, "place": customMessage.current.value }));	
    customMessage.current.value = "";
  }


  return { ws, setWs, data, places, state, setState, user, setUser, userid, setUserid, adminuser, setAdminuser, userselectclick, dataupdate, login, userreset, onmessage_handler, registerCustomPlace, connectWebSocket };
}