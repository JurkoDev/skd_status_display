export const wstx = new WebSocket("ws://localhost:8765");

var user = "test"
export function searchselectws(value: string) {
    if(wstx.readyState == 1 ){
        if(user != null){
    wstx.send(JSON.stringify({"command":"change_status" , "user":user , "status":value}));
    }}
}