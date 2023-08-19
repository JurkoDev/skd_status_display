'use client';

import { Card, Text, Title, SearchSelect, SearchSelectItem } from "@tremor/react";
import { searchselectws } from "./searchselectws";

interface Item {
    value: string;
    name: string;
    april: string;
    color: string;
    place: string;
}

var data: Item[]

export default function select_item() {
    const ws = new WebSocket("ws://localhost:8765");
    ws.onopen = () => {
      ws.send(JSON.stringify({ command: "data" }));
    };

    ws.onmessage = (event) => {
      var message = JSON.parse(event.data);
      if (message.command === "data_response") {
        data = message.data
      }
    };
    return (
        {data.map((item) => (data.filter(row => row.place === item.id) == "" ? "" :
        <Card className="mlectt-8">
            <Title>Performance</Title>
            <Text>{data.name}</Text>
            <SearchSelect onValueChange={searchselectws}>
                <SearchSelectItem value="zahradka">
                    zahradka
                </SearchSelectItem>
                <SearchSelectItem value="skolsky_dvor">
                    skolsky dvor
                </SearchSelectItem>
                <SearchSelectItem value="trieda">
                    trieda
                </SearchSelectItem>
            </SearchSelect>
        </Card>))}
    );
}
