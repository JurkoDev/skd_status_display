import { useState } from "react";

export function useWebSocket() {
  var [data, setData] = useState([]);
  var [places, setPlaces] = useState([]);

  const connectWebSocket = () => {
    const ws = new WebSocket("ws://localhost:8765");
    // const ws = new WebSocket("wss://bm7247ff-8765.euw.devtunnels.ms/");
    ws.onopen = () => {
      ws.send(JSON.stringify({ command: "data" }));
    };

    ws.onmessage = (event) => {
      var message = JSON.parse(event.data);
      if (message.command === "data_response") {
        setData(message.data);
        setPlaces(message.places);
      }
    };

    return () => {
      ws.close();
    };
  };

  return { data, places, connectWebSocket };
}