"use client";

import { useState, useEffect, Requireable } from "react";
import { Card, Metric, Text, Title, BarList, Flex, Grid, Color, ValueFormatter } from "@tremor/react";
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



export default function PlaygroundPage() {
  var { data, places, connectWebSocket } = useWebSocket();

  useEffect(() => {
    const unsubscribe = connectWebSocket();

    return unsubscribe;
  }, [connectWebSocket]);

  // data = datatemp;
  // main class originaly "p-4 md:p-10 mx-auto max-w-7xl"
  return (
    <main className="p-4 md:p-10 mx-auto"> 
      <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
        {places.map((item) => (data.filter(row => row.place === item.id).length === 0 ? "" :
          <Card key={item.category.toString()}>
            <Title>{item.category.toString()}</Title>
            <Flex className="mt-6">
              <Text>Trieda</Text>
              <Text className="text-right">{item.id.toString() !== "trieda" ? "" : "Zvoniť"}</Text>
            </Flex>
            <BarList
            /* eslint-disable */
              data={data.filter(row => row.place === item.id).map((row) => {
                if (item.id.toString() !== "trieda") {
                  return { name: row.name + " " + row.trieda, value: "", color: row.color};
                } else {
                  return { name: row.name + " " + row.trieda, value: row.value, color: row.color};
                }
              })}
              className="mt-2"
            /* eslint-enable */
            />
          </Card>
        ))}
      </Grid>
      {/* <Chart /> */}
    </main>
  );
}
