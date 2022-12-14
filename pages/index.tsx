import type { NextPage } from "next";
import Head from "next/head";
import { FormProvider } from "react-hook-form";
import ArbitrageCalculations from "../src/components/arbitrage/ArbitrageCalculations";
import ArbitrageCalculationsErrorBoundary from "../src/components/arbitrage/ArbitrageCalculationsErrorBoundary";
import ArbitrageForm from "../src/components/arbitrage/ArbitrageForm";
import useArbitrageForm from "../src/hooks/useArbitrageForm";
import { track, parameters } from "insights-js";
import { useState } from "react";

const Home: NextPage = () => {
  const arbitrageForm = useArbitrageForm();
  const [hasLiked, setHasLiked] = useState(false);

  return (
    <>
      <Head>
        <title>Arbitrage calculator</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={
            "An advanced arbitrage calculator with support for weighted biases and automatically finding the best odds from a list of odds. Commonly used in sports betting."
          }
        />
      </Head>
      <div className="mx-auto max-w-2xl">
        <div className="py-6 px-8 bg-zinc-100 dark:bg-zinc-900 rounded-lg md:my-8">
          <FormProvider {...arbitrageForm}>
            <ArbitrageForm />
            <ArbitrageCalculationsErrorBoundary>
              <ArbitrageCalculations />
            </ArbitrageCalculationsErrorBoundary>
          </FormProvider>
        </div>
      </div>
      <div className="text-center">
        <button
          type="button"
          disabled={hasLiked}
          className="disabled:opacity-50"
          onClick={(e) => {
            e.preventDefault();

            track({
              id: "liked-page",
              unique: true,
              parameters: {
                locale: parameters.locale(),
                referrer: parameters.referrer(),
              },
            });

            setHasLiked(true);
          }}
        >
          like <span className="text-3xl">👍🏻</span>
        </button>
        <div className="text-xs opacity-50 max-w-md mx-auto">
          (<strong>message from the dev</strong>: Pressing this button will
          inform me whether this tool is used. If it gains traction I might
          offer new features such as providing it as a browser extension)
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default Home;
