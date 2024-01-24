import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/roomContext";
import { VideoPlayer } from "../components/VideoPlayer";

export const Room = () => {
    const { id } = useParams();
    const { ws, me, stream } = useContext(RoomContext);
    useEffect(() => {
        if (me) ws.emit("join-room", { roomId: id, peerId: me._id });
    }, [me, id, ws]);
    return (<>
        <div>Room {id}</div>
        <div>
            <VideoPlayer stream={stream} />
        </div>
    </>);
};