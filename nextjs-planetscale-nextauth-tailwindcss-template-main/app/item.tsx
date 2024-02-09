'use client';

import { Card, Text, Title, SearchSelect, SearchSelectItem, Table, TableHead, TableRow, TableHeaderCell, TableBody, Grid, Button, TextInput, Color } from "@tremor/react";
import { useEffect, useState } from "react";
import { useWebSocket } from "./websocket";
import React from "react";


interface Item {
    value: string;
    name: string;
    april: string;
    color: string;
    place: string;
}

var ws: WebSocket;
export const pinError = React.createRef<HTMLParagraphElement>();
export const customMessage = React.createRef<HTMLInputElement>();
export const pinInput = React.createRef<HTMLInputElement>();
export default function Item() {
    const {ws, setWs, data, places, state, setState, user, setUser, userid, setUserid, adminuser, setAdminuser, userselectclick, dataupdate, login, userreset, onmessage_handler, registerCustomPlace, connectWebSocket } = useWebSocket();

    useEffect(() => {
        var temp = connectWebSocket();
        return temp.unsubscribe;
    //dependency cant be added make a loop idk why
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    return (
        <div>
            {/* {state == "main" ? <p>Ahoj {user}</p> : ""} */}
            {state == "" ? <Card className="mlectt-8">
                <Title>Loading</Title>
            </Card> : ""}
            {state == "main" ? <Card className="mlectt-8">
                <Title style={{ marginBottom: '16px' }}>Ahoj {user} si v { data.find((item: Item | undefined) => item?.name === user)?.place as unknown as string}</Title>

                <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                    {places.map((item, index) => (
                        <Button key={index} color="blue" onClick={() => dataupdate(item, ws, userid)}>{item.category.toString()}</Button>
                    ))}
                </Grid>
                <Grid numItemsSm={2} numItemsLg={2} className="gap-6">
                    <Title>Custom Place</Title>
                    <TextInput type="text" ref={customMessage} />
                    <Button color="blue" onClick={() => registerCustomPlace(ws, userid)}>Submit</Button>
                </Grid>
            </Card> : ""}
            {state == "login" ? <Card className="mlectt-8">
                <Title style={{ marginBottom: '16px' }}>prihlas sa</Title>
                <Grid numItemsSm={2} numItemsLg={2} className="gap-6">
                    <TextInput type="text" ref={pinInput} />
                    <Button color="blue" onClick={() => login(ws)}>Prihlasiť</Button>
                </Grid>
                <Text color="red" ref={pinError}></Text>
            </Card> : ""}
            {state == "user_select" ? <div>
                <Card className="mlectt-8">
                    <Title style={{ marginBottom: '20px' }}>select user</Title>

                    <Grid numItemsSm={3} numItemsLg={4} className="gap-6">
                        {data.map((item,index) => (
                            <Button key={index} color={item.color as unknown as Color} onClick={() => userselectclick(item)}>{item.name.toString()}</Button>
                        ))}
                    </Grid>
                </Card>
            </div> : ""}
            <Button color="red" onClick={() => userreset()}>reset</Button>
        </div >
    );
}
