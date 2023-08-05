import {
  ChatBubbleBottomCenterIcon,
  Cog6ToothIcon,
  HomeIcon,
  NewspaperIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const MobileNavigators = () => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const isLobby = router.pathname === "/m/lobby";
  const isSession = router.pathname.startsWith("/room");
  const isBlog = router.pathname.startsWith("/blog");
  const isProfile = router.pathname === "/profile";

  return (
    <div className="fixed left bottom-0 text-white z-40 bg-secondary w-full border-t border-gray-500">
      <nav>
        <ul className="flex text-center">
          <li
            className={`border-r border-gray-500 w-1/4 py-2 ${
              isHome && "text-accent2"
            }`}
          >
            <Link href="/">
              <div className="flex items-center justify-center">
                <HomeIcon className="w-6 h-6" />
              </div>
              <div className={`text-xs ${isHome && "text-accent2"}`}>Home</div>
            </Link>
          </li>
          <li
            className={`border-r border-gray-500 w-1/4 py-2 ${
              isLobby && "text-accent2"
            }`}
          >
            <Link href="/m/lobby">
              <div className="flex items-center justify-center">
                <ChatBubbleBottomCenterIcon className="w-6 h-6" />
              </div>
              <div className={`text-xs ${isLobby && "text-accent2"}`}>
                Lobby
              </div>
            </Link>
          </li>
          {isSession && (
            <li
              className={`border-r border-gray-500 w-1/4 py-2  ${
                isSession ? "text-accent2" : "text-gray-500"
              }`}
            >
              <div className="flex items-center justify-center">
                <PhoneIcon className="w-6 h-6 " />
              </div>
              <div
                className={`text-xs  ${
                  isSession ? "text-accent2" : "text-gray-500"
                }`}
              >
                Session
              </div>
            </li>
          )}

          <li
            className={`border-r border-gray-500 w-1/4 py-2 ${
              isBlog && "text-accent2"
            }`}
          >
            <Link href="/blog">
              <div className="flex items-center justify-center">
                <NewspaperIcon className="w-6 h-6" />
              </div>
              <div className={`text-xs ${isBlog && "text-accent2"}`}>Blog</div>
            </Link>
          </li>
          <li className={`w-1/4 py-2 ${isProfile && "text-accent2"}`}>
            <Link href="/profile">
              <div className="flex items-center justify-center">
                <Cog6ToothIcon className="w-6 h-6" />
              </div>
              <div className={`text-xs ${isProfile && "text-accent2"}`}>
                Settings
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavigators;
