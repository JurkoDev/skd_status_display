'use client';

import { unsubscribe } from "diagnostics_channel";
import { useState } from "react";

export function useWebSocket() {

  var [data, setData] = useState([]);
  var [places, setPlaces] = useState([]);
  var [state, setState] = useState("");
  var [user, setUser] = useState("");
  var [userid, setUserid] = useState("");
  var [adminuser, setAdminuser] = useState(false);


  const connectWebSocket = () => {
    // const ws = new WebSocket("ws://localhost:8765");
    const ws = new WebSocket("wss://bm7247ff-8765.euw.devtunnels.ms/");
    ws.onopen = () => {
      ws.send(JSON.stringify({ command: "data" }));
      console.log("connected");
      setState("login");
    };

    ws.onmessage = (event) => {
      var message = JSON.parse(event.data);
      if (message.command === "data_response") {
        setData(message.data);
        setPlaces(message.places);
      }
      if (message.command === "user_login_response") {
        // if id is not defined return
        if (message.id == null) {
          return;
        }
        // if admin is true then set state to user_select and set adminuser to true
        if (message.admin == true) {
          setState("user_select");
          setAdminuser(true)
        } else {
          // find the dict in data where id eqauls message.id then set user to name
          console.log(message);
          console.log(data);
          for (var element of data) {
            console.log(element);
            if (element.id == message.id) {
              setUser(element.name);
              setUserid(message.id);
              setState("main");
            }
          }
        }
      }
    };
    const unsubscribe = () => { ws.close(); };

    return { unsubscribe, ws }
  };

  const userselectclick = (item) => {
    setUser(item.name);
    setState("main");
  };

  const dataupdate = (item, ws) => {
    ws.send(JSON.stringify({ command: "data_write", "name": user, "place": item.id }));
    if (adminuser == true) {
      setState("user_select");
    } else {
      userreset();
    }
  };

  const login = (ws, pinInput) => {
    ws.send(JSON.stringify({ command: "user_login", "pin": pinInput.current.value }));
  };

  const userreset = () => {
    setUser("");
    setAdminuser(false);
    setState("login");
  };

  return { data, places, state, setState, user, setUser, userid, setUserid, adminuser, setAdminuser, userselectclick, dataupdate, login, userreset, connectWebSocket };
}