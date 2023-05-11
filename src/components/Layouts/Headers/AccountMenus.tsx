import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  ArrowLeftOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { signoutFromGoogle } from "@/store/authSlice";
import DarkOverlay from "../Overlay";
import { joinClasses } from "@/utils/jsx-utils";
import Link from "next/link";

interface Props {
  email: string;
  displayName: string;
  profileURL: string;
}

const AccountMenus = ({ email, displayName, profileURL }: Props) => {
  console.log("AccountMenus");
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex">
        <Menu.Button className="">
          <div className="flex items-center cursor-pointer select-none group">
            <Image
              src={profileURL}
              className="rounded-full w-10 h-10 group-hover:scale-105"
              width={20}
              height={20}
              alt=""
            />
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400 group-hover:text-accent2"
              aria-hidden="true"
            />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={joinClasses(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm select-none cursor-pointer"
                  )}
                >
                  <div>
                    <Image
                      src={profileURL}
                      className="rounded-full w-8 h-8 mr-2"
                      width={20}
                      height={20}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="text-gray-700 font-bold">{displayName}</div>
                    <div className="text-gray-700">{email}</div>
                  </div>
                </div>
              )}
            </Menu.Item>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={joinClasses(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <UserIcon
                    className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  My Profile
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={joinClasses(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <UserIcon
                    className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Feature Request
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <div
                  className={joinClasses(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm select-none cursor-pointer"
                  )}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      dispatch(signoutFromGoogle());
                    }, 3000);
                  }}
                >
                  <ArrowLeftOnRectangleIcon
                    className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Sign Out
                </div>
              )}
            </Menu.Item>
          </div>
          {/* Group with line separator by using div */}
        </Menu.Items>
      </Transition>

      {loading && <DarkOverlay />}
    </Menu>
  );
};

export default AccountMenus;
