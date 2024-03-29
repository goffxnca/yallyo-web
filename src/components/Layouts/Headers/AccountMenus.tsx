import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  ArrowLeftOnRectangleIcon,
  CurrencyDollarIcon,
  UserIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { signoutFromGoogle } from "@/store/authSlice";
import DarkOverlay from "../Overlay";
import { joinClasses } from "@/utils/jsx-utils";
import Link from "next/link";
import getConfig from "next/config";
import { UserType1 } from "@/types/common";
const { publicRuntimeConfig } = getConfig();
interface Props {
  email: string;
  displayName: string;
  profileURL: string;
  type1: string;
}

const AccountMenus = ({ email, displayName, profileURL, type1 }: Props) => {
  // console.log("AccountMenus");
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex">
        <Menu.Button className="">
          <div className="flex items-center cursor-pointer select-none group">
            <img
              src={profileURL}
              className="w-10 h-10 object-cover rounded-full"
              alt="User Avatar"
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
                <Link href="/profile">
                  <div
                    className={joinClasses(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm select-none"
                    )}
                  >
                    <div>
                      <img
                        src={profileURL}
                        className="w-10 h-10 object-cover rounded-full mr-2"
                        alt="User Avatar"
                      />
                    </div>
                    <div>
                      <div className="text-gray-700 font-bold">
                        {displayName}
                      </div>
                      <div className="text-gray-700">{email}</div>
                    </div>
                  </div>
                </Link>
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

            {/* <Menu.Item>
              {({ active }) => (
                <Link
                  href="/wallet"
                  className={joinClasses(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <CurrencyDollarIcon
                    className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  My Wallet
                </Link>
              )}
            </Menu.Item> */}

            {type1 === UserType1.PERM_USER && (
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
            )}

            <div className="block lg:hidden text-xs text-center p-2 text-gray-300">
              v{publicRuntimeConfig.version}:
              {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 4)}
            </div>
          </div>
          {/* Group with line separator by using div */}
        </Menu.Items>
      </Transition>

      {loading && <DarkOverlay />}
    </Menu>
  );
};

export default AccountMenus;
