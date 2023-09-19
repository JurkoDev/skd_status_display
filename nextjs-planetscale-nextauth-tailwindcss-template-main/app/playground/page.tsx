"use client";

import { useState, useEffect } from "react";
import { Card, Metric, Text, Title, BarList, Flex, Grid } from "@tremor/react";
import { useWebSocket } from "./websocket";

// var data = [
//   { value: "č.3", name: "Smikalova 2.B", april:"Šmikalova", color: "yellow", place: "trieda"},
//   { value: "č.4", name: "Lomen 1.A,C", april:"", color: "purple", place: "trieda" },
//   { value: "č.7", name: "Lehutova 1.B,C", april:"Pálenka", color: "pink", place: "zahradka" },
//   { value: "č.12", name: "Lenčešová 1.D,C", april:"", color: "orange", place: "trieda" },
// ];

// var places = [
//   {
//     category: "Trieda",
//     id: "trieda"
//   },
//   {
//     category: "Školsky dvor",
//     id: "skolsky_dvor"
//   },
//   {
//     category: "Zahradka",
//     id: "zahradka"
//   }
// ];
export var data = [];


export default function PlaygroundPage() {
  var { data: datatemp, places, connectWebSocket } = useWebSocket();

  useEffect(() => {
    const unsubscribe = connectWebSocket();

    return unsubscribe;
  }, []);

  data = datatemp;

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {places.map((item) => (data.filter(row => row.place === item.id) == "" ? "" :
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex className="mt-6">
              <Text>Trieda</Text>
              <Text className="text-right">{item.id !== "trieda" ? "" : "Zvoniť"}</Text>
            </Flex>
            <BarList
              data={data.filter(row => row.place === item.id).map(row => {
                if (item.id !== "trieda") {
                  return { ...row, value: "" };
                }
                return row;
              })}
              color={data.color}
              className="mt-2"
            />
          </Card>
        ))}
      </Grid>
      {/* <Chart /> */}
    </main>
  );
}
