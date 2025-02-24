<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Customized CrossMint Wallet</h3>

  <p align="center">
  This application demonstrates the use of Abstract Accounts with a built-in passkey authenticator. Simply sign in with Google or Crossmint's built-in SSO login, authorize your passkey, and create your smart wallet in seconds.
    <br />
    <a href="https://docs.crossmint.com/wallets/smart-wallets/quickstart"><strong>Explore the quickstart docs »</strong></a>
    <br />
    <br />
    <a href="https://www.smarterwallet.dev/">View Demo</a>
    ·
    <a href="https://github.com/Crossmint/crossmint-sdk/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Crossmint/crossmint-sdk/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
    <a href="#usage">Usage</a>
    <ul>
        <li><a href="#adding-the-provider">Adding the Provider</a></li>
        <li><a href="#hooks">Hooks</a></li>
      </ul>
    </li>
    <li>
      <a href="#process-for-updating-and-deploying-the-nextjs-demo">Process for Updating and Deploying the Next.js Demo</a>
      <ul>
        <li><a href="#guide">Guide</a></li>
      </ul>
    </li>
  </ol>
</details>

### Built With

-   [![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
-   [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
-   [![Crossmint](https://img.shields.io/badge/Crossmint-04CD6C?style=for-the-badge&logoColor=04CD6C&link=https://www.crossmint.com/)](https://www.crossmint.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Follow these steps to set up your project locally and get it running. This guide provides clear instructions to help you get started quickly.

### Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (v20.12 or later)
-   npm (comes with Node.js)
-   pnpm (`npm install -g pnpm`)

### Installation

1. Obtain a free API Key from the Crossmint Console. Refer to [Get an API Key](https://docs.crossmint.com/wallets/smart-wallets/quickstart#2-get-an-api-key) from the Quickstart guide for detailed instructions.

2. Clone the repo
    ```sh
    git clone git repo
    ```
3. Install PNPM packages
    ```sh
    pnpm i
    ```
4. In the directory containing this README.md file, rename the `.env.example` file to `.env` and add your API key to the file.
    ```bash
    NEXT_PUBLIC_CROSSMINT_AUTH_SMART_WALLET_API_KEY="ENTER YOUR CROSSMINT API KEY";
    ```
5. Start the development server
    ```sh
    pnpm dev
    ```
6. Once you start the Next.js development server, the application can be found at `http://localhost:3000`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

