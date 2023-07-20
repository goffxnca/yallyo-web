import { ILobbyChat } from "@/types/common";
import { randomBoolean } from "@/utils/bool-utils";
import LobbyChatItem from "./LobbyChatItem";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import LoginModal from "../Modals/LoginModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  lobbyChats: ILobbyChat[];
  isLoading: boolean;
  onLoadMore: Function;
  canLoadMore: boolean;
  onSendMessage: Function;
  onToggleLobby: Function;
  showFullLobby: boolean;
}

const Lobby = ({
  lobbyChats,
  isLoading,
  onLoadMore,
  canLoadMore,
  onSendMessage,
  onToggleLobby,
  showFullLobby,
}: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const textboxRef = useRef<HTMLInputElement>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (lobbyChats.length > 0) {
      const scrollToBottom = () => {
        if (scrollContainerRef && scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            top: scrollContainerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      };
      scrollToBottom();
    }
  }, [lobbyChats.length]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const message = textboxRef.current?.value;
    if (message) {
      textboxRef.current.value = "";
      onSendMessage(message);
    }
  };

  return (
    <section className="relative w-full rounded-md bg-secondary h-screen pt-16">
      <div
        className={`flex items-center justify-center relative ${
          showFullLobby && " border-r border-gray-600"
        }`}
      >
        <h2 className="text-accent1 h-8 text-center border-b border-gray-600 bg-opacity-90 py-1 font-bold w-full">
          {showFullLobby && "Lobby"}
        </h2>
        {/* <ChevronRightIcon className="w-6 h-6 absolute right-0 text-white" /> */}
        {showFullLobby ? (
          <ChevronLeftIcon
            className="w-6 h-6 absolute right-0 text-white cursor-pointer"
            onClick={() => {
              onToggleLobby();
            }}
          />
        ) : (
          <ChevronRightIcon
            className="w-6 h-6 absolute right-0 text-white cursor-pointer"
            onClick={() => {
              onToggleLobby();
            }}
          />
        )}
      </div>

      <div
        className={`h-full overflow-y-scroll pt-2 ${
          showFullLobby && " border-r border-gray-600"
        }`}
        ref={scrollContainerRef}
      >
        {/* {canLoadMore && (
          <div className="flex justify-center">
            <button
              className="text-sm px-2 py-1 bg-gray-200 rounded-b-lg text-center text-secondary"
              onClick={() => {
                onLoadMore();
              }}
            >
              Previous Messages
            </button>
          </div>
        )} */}

        <ul className="space-y-2 mb-10 px-4 pb-20">
          {lobbyChats.map((message) => {
            return (
              <LobbyChatItem
                key={message._id}
                _id={message._id}
                type={message.type}
                message={message.message}
                sender={message.sender}
                createdAt={message.createdAt}
                createdBy={message.createdBy}
                active={message.active}
              />
            );
          })}
        </ul>

        {/* Submit */}
        {showFullLobby && (
          <div className="absolute left-0 bottom-0 w-full">
            <form
              onSubmit={handleSubmit}
              className="flex justify-between gap-x-1  relative"
            >
              <input
                type="text"
                className="w-full border-secondary  focus:ring-0 focus:border-4 focus:border-accent2 text-secondary pr-10"
                placeholder="Send a message"
                spellCheck="false"
                style={{ fontSize: 14 }}
                ref={textboxRef}
                onFocus={() => {
                  if (!user) {
                    setShowLoginModal(true);
                  }
                }}
              ></input>

              <button
                type="submit"
                className="absolute h-full right-0 top-0 bottom-0 p-2 flex items-center cursor-pointer text-accent1 "
              >
                <div className="flex items-center">
                  <PaperAirplaneIcon className="w-6 h-6" />
                </div>
              </button>
            </form>
          </div>
        )}
      </div>

      {showLoginModal && (
        <LoginModal
          message="To access the lobby area and send messages, please log in."
          onCloseModal={() => {
            setShowLoginModal(false);
          }}
          onLoginSucceed={() => {
            setShowLoginModal(false);
            textboxRef.current?.focus();
          }}
        />
      )}
    </section>
  );
};

export default Lobby;
