"use client";

import { Card, Metric, Text, Title, BarList, Flex, Grid } from "@tremor/react";
import Chart from "./chart";

const data = [
  { value: "č.3", name: "Smikalova 2.B", april:"Šmikalova", color: "yellow", place: "trieda"},
  { value: "č.4", name: "Lomen 1.A,C", color: "purple", place: "trieda" },
  { value: "č.7", name: "Lehutova 1.B,C", april:"Pálenka", color: "pink", place: "skolsky_dvor" },
  { value: "č.12", name: "Lenčešová 1.D,C", april:"", color: "orange", place: "trieda" },
];

const places = [
  {
    category: "Trieda",
    id: "trieda"
  },
  {
    category: "Školsky dvor",
    id: "skolsky_dvor"
  },
  {
    category: "zahradka",
    data: "zahradka"
  }
];

const testtext = "zvončeky"

export default function PlaygroundPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {places.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex className="mt-6">
              <Text>Trieda</Text>
              <Text className="text-right">{item.id !== "trieda" ? "" : testtext}</Text>
            </Flex>
            <BarList
              data={data.filter(row => row.place === item.id).map(row => {
                if (item.id === "skolsky_dvor") {
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
