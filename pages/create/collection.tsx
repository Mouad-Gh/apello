import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

import NFTSelector from "../../components/NFTSelector";
import { Stepper } from "../../components/NFTSelector/Stepper";
import { BannerContext } from "../../context/BannerContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const CollectionPage: NextPage = () => {
  const { push } = useRouter();
  const { wallet } = useAuthContext();
  const { config } = useContext(BannerContext);

  useEffect(() => {
    // If no "type" or "style", redirect to start
    // User needs to start from beginning
    if (config.type === "DEFAULT" || !config.style) {
      push("/create/social");
    }
  }, [config, push]);

  useEffect(() => {
    // Redirect to start of flow if wallet not connected
    if (wallet?.type !== "stargaze" && !config.manualWalletAddress?.length) {
      push("/create/");
    }
  }, [config.manualWalletAddress, push, wallet]);

  if (config.type === "DEFAULT" || !config.style) {
    return null;
  }

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
      <section className="m-10 mt-4">
        <div className="w-full flex flex-col items-center mb-[200px]">
          <Stepper currentStep={3} steps={3} />
          <h1 className="text-center font-bold text-3xl mb-2">
            Create an <span className="text-indigo-500">NFT</span> banner
          </h1>
          <p className="text-center text-lg mb-10">
            Choose 3 NFTs from your collection to build into your banner image.
          </p>
          {((wallet?.type === "stargaze" && wallet?.adress) ||
            config.manualWalletAddress?.length > 0) && (
            <NFTSelector
              address={wallet?.adress ?? config.manualWalletAddress}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default CollectionPage;