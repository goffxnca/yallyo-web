import ChatSidebarHeader from "./ChatSidebarHeader";
import ChatSidebarContent from "./ChatSidebarContent";
import ChatSidebarFooter from "./ChatSidebarFooter";
import { randomBoolean } from "@/utils/bool-utils";
import { faker } from "@faker-js/faker";
import { IChatMessage } from "@/types/common";
import { createNArray } from "@/utils/array-utils";

const SessionChatSidebar = () => {
  const messages: IChatMessage[] = createNArray(20).map((num) => ({
    id: Math.random().toString(),
    message: faker.lorem.sentence(),
    fromMe: randomBoolean(),
  }));

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 w-full z-40 lg:relative lg:w-[350px] lg:z-20">
      <div className="flex flex-col h-screen">
        <ChatSidebarHeader />
        <ChatSidebarContent messages={messages} />
        <ChatSidebarFooter />
      </div>
    </div>
  );
};

export default SessionChatSidebar;
