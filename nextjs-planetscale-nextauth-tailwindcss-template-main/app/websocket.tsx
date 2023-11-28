'use client';

import { v4 as uuidv4 } from 'uuid';
import { unsubscribe } from "diagnostics_channel";
import { any, element } from "prop-types";
import { useEffect, useRef, useState } from "react";

export function useWebSocket() {

  var [data, setData] = useState([]);
  var [places, setPlaces] = useState([]);
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
          })
        }
      }
    };
    // setOnmessage_handler(() => (event: MessageEvent) => onmessage_handlertemp(event));
  }, [data, session]);

  const connectWebSocket = () => {
    const ws = new WebSocket("ws://192.168.5.160:8765");
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

  const userselectclick = (item) => {
    setUser(item.name);
    setUserid(item.id);
    setState("main");
  };

  const dataupdate = (item, ws, userid) => {
    ws.send(JSON.stringify({ command: "data_write", "id": userid, "name": user, "place": item.id }));
    if (adminuser == true) {
      setState("user_select");
    } else {
      userreset();
    }
  };

  const login = (ws, pinInput) => {
    ws.send(JSON.stringify({ command: "user_login", "pin": pinInput.current.value, "session": session }));
  };

  const userreset = () => {
    setUser("");
    setAdminuser(false);
    setState("login");
  };


  return {ws, setWs, data, places, state, setState, user, setUser, userid, setUserid, adminuser, setAdminuser, userselectclick, dataupdate, login, userreset, onmessage_handler, connectWebSocket };
}