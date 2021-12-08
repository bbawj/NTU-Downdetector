# NTU Downdetector

## Description

#### Problem

There is no centralized platform to check the status of services at NTU. Inspired by downdetector, the goal is to create a platform for real time user reports of student issues such as internet connection, printer up-time etc. This allows users to have easy access to whether a problem has occurred while also giving the relevant administrators the ability to quickly rectify a problem.

#### Technologies

- React
- MySQL
- NextJS
- NodeJS

## Setup

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Create a `.env.local` file to store your MySQL database configs securely which will be ignored by git. Follow the template shown in [.env.example](.env.example)

Make sure to create a local MySQL database in your local machine before running the development server. Run the SQL setup file in [setup.sql](/lib/setup.sql). This will create the standard database with dummy data.

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## How to Contribute
1. Create a new branch from the main repository. Name it according to the feature or bug you are fixing eg. cards_feature.
2. Make your commits in this new branch
3. Submit a pull request when the code is ready to be merged. Assign someone to review your changes.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
