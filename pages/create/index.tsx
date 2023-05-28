import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useTerra } from "../../hooks/useTerra";

const BannerPage: NextPage = () => {
  const { push } = useRouter();
  const { wallet } = useAuthContext();
  const { connectStargaze } = useTerra();

  useEffect(() => {
    if (wallet?.type === "stargaze") {
      push("/create/social");
    }
  }, [push, wallet]);

  return (
    <>
      <Head>
        <title>NFT Image Creator | Cosmos Ape Alliance x Apello</title>
        <meta
          key="description"
          name="description"
          content="Create a dynamic image using NFTs from your Stargaze wallet."
        />
        <meta
          key="og-title"
          property="og:title"
          content="NFT Image Creator | Cosmos Ape Alliance x Apello"
        />
        <meta
          property="og:image"
          key="og:image"
          content="https://www.apello.xyz/banners/og-img-banner.jpg"
        />
        <meta
          key="og-description"
          property="og:description"
          content="Create a dynamic image using NFTs from your Stargaze wallet."
        />
        <meta
          key="twitter-title"
          name="twitter:title"
          content="NFT Image Creator | Cosmos Ape Alliance x Apello"
        />
        <meta
          key="twitter-description"
          name="twitter:description"
          content="Create a dynamic image using NFTs from your Stargaze wallet."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@apello_app" />
        <meta
          name="twitter:image"
          content={`https://www.apello.xyz/banners/og-img-banner.jpg`}
        />
      </Head>
      <section className="m-10">
        <div className="w-full flex flex-col items-center mb-[200px]">
          <h1 className="text-center font-bold text-5xl mb-2">
            Create an <span className="text-indigo-500">NFT</span> banner
          </h1>
          <p className="text-center text-lg mb-8">
            Select NFTs from your <em>Stargaze</em> wallet collections to create
            dynamic images.
          </p>
          <button
            className="select-none flex items-center text-lg px-3 py-2 mb-2 rounded-md border-solid border-violet border-2"
            onClick={connectStargaze}
          >
            <div className="relative h-6 w-6">
              <Image fill src="/chains/stargaze.png" alt="Stargaze logo" />
            </div>
            <span className="whitespace-nowrap ml-1">
              Connect Stargaze Wallet
            </span>
          </button>
          <p className="text-center text-lg mb-8">
            <Link
              href="/create/manual"
              className="text-center text-lg underline hover:no-underline text-indigo-300"
            >
              Mobile wallet not working?
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default BannerPage;