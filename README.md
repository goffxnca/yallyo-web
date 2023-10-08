# Yallyo - Language Practice Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Issues](https://img.shields.io/github/issues/goffxnca/yallyo-web)](https://github.com/goffxnca/yallyo-web/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/goffxnca/yallyo-web)](https://github.com/goffxnca/yallyo-web/pulls)

Welcome to [Yallyo](https://yallyo.com), a language practice platform designed to connect people worldwide for language exchange and conversation practice. This README provides an overview of the project, its features, and how you can get involved as a contributor.

![ Screenshot1](https://yallyo.com/images/yallyo-mobile.png)
![ Screenshot2](https://yallyo.com/images/yallyo-ipad.png)
![ Screenshot3](https://yallyo.com/images/yallyo-desktop.png)

## Table of Contents

- [About Yallyo](#about-yallyo)
- [How to use Yallyo](#how-to-use-yallyo)
- [Tech Stack](#tech-stack)
- [How to Run Locally](#how-to-run-locally)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## About Yallyo

[Yallyo](https://yallyo.com) is a web-based platform that allows users to engage in video and voice conversations with others to practice languages. Whether you're learning a new language or looking to improve your language skills, Yallyo provides a space for meaningful interactions with people from around the world.

### Features

- **Voice Chat:** Connect through real-time voice conversations.
- **Video Chat:** Engage in face-to-face video+voice conversations.
- **Text Chat:** Send text/emoji/GIF to people in chat rooms.
- **No Login Required:** choose to login with Google account or create fast temporary account.
- **Multi-Language Support:** Practice various languages with users of different proficiency levels.
- **User-Friendly Interface:** Enjoy a seamless experience with a user-friendly interface built with modern technologies.
- **Lobby Chat:** Chat with others in the lobby area before entering rooms.
- **Responsive Design:** Yallyo is designed to work on desktop, tablets, and mobile devices.
- **Open Source:** Yallyo is open-source, which means you can contribute to its development.

## How to use Yallyo

To start using Yallyo, you can visit the [Yallyo website](https://yallyo.com). There's no need to install an app or create an account. Simply click to join a room and start practicing languages with other people around the world.

## Tech Stack

The key technologies that we use to make realtime communication over video/voice/text chat possible on Yallyo platform are WebRCT & WebSocket

#### Frontend (This repository /yallyo-web)

- [NextJS](https://nextjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Socket.io Client](https://socket.io/docs/v4/client-api/)
- [PeerJS (Signaling Server/Wrapper around WebRCT)](https://peerjs.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vercel (Hosting)](https://vercel.com/)

#### Backend (Now is closed source, the source code will be open soon)

- [NestJS](https://nestjs.com/)
- [WebSocket Server](https://socket.io/docs/v4/server-api/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [Firebase (Auth, Storage, Functions)](https://firebase.google.com/)
- [Droplet (Hosting)](https://www.digitalocean.com/products/droplets)
- [PM2](https://www.npmjs.com/package/pm2)

## Contributing

We welcome contributions from the community to help improve and expand Yallyo's features. If you're interested in contributing, please check out our [Contribution Guidelines](CONTRIBUTING) for more information.

Also you can join our dev team on [`Discord Server`](https://discord.gg/8DUHDk7s) as well.

## How to run locally

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), to run locally on your machine please following these steps:

1. Clone this project to your local computer and install dependencies

```bash
npm install
```

2. Create .env.development file with the following variables and place at the root of the project.
   (Join our Discord server [`Yallyo-Language Exchange Community`](https://discord.gg/8DUHDk7s))
   and we will provide you the actual Firebase credential values.

```env
NEXT_PUBLIC_API_URL=https://api.dev.heyguyz.com
NEXT_PUBLIC_API_WS_URL=https://api.dev.heyguyz.com
NEXT_PUBLIC_ROOMS_REFRESH=60000
NEXT_PUBLIC_ROOMS_ITEMS=20
NEXT_PUBLIC_CREATE_ROOM_QUOTA=5

#Firebase
NEXT_PUBLIC_FIREBASE_apiKey=
NEXT_PUBLIC_FIREBASE_authDomain=
NEXT_PUBLIC_FIREBASE_projectId=
NEXT_PUBLIC_FIREBASE_storageBucket=
NEXT_PUBLIC_FIREBASE_messagingSenderId=
NEXT_PUBLIC_FIREBASE_appId=
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_FACEBOOK_PIXELS_ID=
```

3. Run frontend web application by this command

```bash
npm run dev
```

4.  Open [http://localhost:65432](http://localhost:65432) with your browser to see the result.

## Contributors

<a href="https://github.com/goffxnca/yallyo-web/graphs/contributors">
	<img src="https://avatars.githubusercontent.com/u/71051032?v=4" width="60" class="rounded-full" />
	<img src="https://avatars.githubusercontent.com/u/116472903?s=96&v=4" width="60" class="rounded-full" />

</a>

--> It would be even cooler if you guys's avatars also show up here 😃.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
