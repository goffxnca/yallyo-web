import ChatSidebarHeader from "./ChatSidebarHeader";
import ChatSidebarContent from "./ChatSidebarContent";
import ChatSidebarFooter from "./ChatSidebarFooter";
import {
  ISessionEventMessage,
  ISocketIOMessage,
  SessionsGatewayEventCode,
} from "@/types/common";
import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  sessionsSocket: Socket;
}
const SessionChatSidebar = ({ sessionsSocket }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { messages } = useSelector((state: RootState) => state.session);

  if (!user) {
    return <div></div>;
  }

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 w-full z-40 lg:relative lg:w-[350px] lg:z-20">
      <div className="flex flex-col h-screen">
        <ChatSidebarHeader />
        <ChatSidebarContent messages={messages} />
        <ChatSidebarFooter
          onSendMessage={(message: string) => {
            const payload: ISessionEventMessage = {
              id: Math.random().toString(),
              type: "chat",
              subType: "",
              sender: {
                _id: user.uid,
                color: "",
                dname: user.displayName,
                photoURL: user.photoURL,
              },
              message: message,
              isMe: false,
              sentAt: new Date().toLocaleTimeString(),
              read: false,
            };
            const data: ISocketIOMessage = {
              type: SessionsGatewayEventCode.SEND_MSG,
              message: `User id: ${user.uid} sent new message`,
              payload,
            };
            sessionsSocket.emit("clientMessage", data);
          }}
        />
      </div>
    </div>
  );
};

export default SessionChatSidebar;
