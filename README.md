# Yallyo - Language Practice Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Issues](https://img.shields.io/github/issues/goffxnca/yallyo-web)](https://github.com/goffxnca/yallyo-web/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/goffxnca/yallyo-web)](https://github.com/goffxnca/yallyo-web/pulls)

Welcome to Yallyo, a language practice platform designed to connect people worldwide for language exchange and conversation practice. This README provides an overview of the project, its features, and how you can get involved as a contributor.

## Table of Contents

- [About Yallyo](#about-yallyo)
- [Getting Started](#getting-started)
- [Tech Stack](#)
- [Contributing](#contributing)
- [License](#license)
- [How to Run Locally](#how-to-run-locally)
- [Contributors](#contributors)

## About Yallyo

Yallyo is a web-based platform that allows users to engage in video and voice conversations with others to practice languages. Whether you're learning a new language or looking to improve your language skills, Yallyo provides a space for meaningful interactions with people from around the world.

### Features

- **No Login Required:** Easily join chat rooms and conversations with a single click. No need to create an account.
- **Multi-Language Support:** Practice various languages with users of different proficiency levels.
- **User-Friendly Interface:** Enjoy a seamless experience with a user-friendly interface built with modern technologies.
- **Lobby Chat:** Chat with others in the lobby area before entering rooms.
- **Responsive Design:** Yallyo is designed to work on desktop, tablets, and mobile devices.
- **Open Source:** Yallyo is open-source, which means you can contribute to its development.

### Tech Stack

The key technology that make realtime communication over video/voice/text chat possible is WebRCT & WebSocket

#### Frontend

- NextJS
- Redux Toolkit
- Socket.io Client
- PeerJS (Wrapper around low-level WebRCT)
- TailwindCSS
- TypeScript
- Vercel (Hosting)

#### Backend (Now is closed source, the source code will be open soon)

- NestJS
- WebSocket
- MongoDB Atlas
- Firebase (Temporary used for Authentication)

## Getting Started

To get started with Yallyo, you can visit the [Yallyo website](https://yallyo.com). There's no need to install an app or create an account. Simply click to join a room and start practicing languages.

## Contributing

We welcome contributions from the community to help improve and expand Yallyo's features. If you're interested in contributing, please check out our [Contribution Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## How to run locally

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributors

<a href="https://github.com/goffxnca/yallyo-web/graphs/contributors">
	<img src="https://avatars.githubusercontent.com/u/71051032?v=4" width="60" class="rounded-full" />
	<img src="https://avatars.githubusercontent.com/u/116472903?s=96&v=4" width="60" class="rounded-full" />

</a>

--> It would be even cooler if you guys's avatars also show up here 😃.
