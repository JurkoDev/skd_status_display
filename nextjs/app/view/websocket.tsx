import { useState } from "react";

export type DataType = { id: number, value: string, name: string, april: string, color: string, place: string, trieda: string }[];

export function useWebSocket() {
  var [data, setData] = useState<DataType>([]);
  var [places, setPlaces] = useState<{ category: string, id: string }[]>([]);
  if (places.length === 0) {
    setPlaces([{category: "Trieda", id: "trieda"},]);
  }
  if (data.length === 0) {
    setData([{id: 0, value: "č.0", name: "Loading", april:"Loading", color: "gray", place: "trieda", trieda:""},]);
  }
  const connectWebSocket = () => {
    const ws = new WebSocket("ws://skd.zsdudova.sk:8765");
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