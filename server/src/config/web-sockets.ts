import { IncomingMessage, Server as TNodeServer, ServerResponse } from "http";
import { Server } from "socket.io";

export default function WebSocketsConfiguration(
  server: TNodeServer<typeof IncomingMessage, typeof ServerResponse>
) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", () => {
    console.log("A user has connected!");
  });

  io.use((socket, next) => {});
}
