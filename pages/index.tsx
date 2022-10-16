import type { NextPage } from "next";
import Head from "next/head";
import { FormProvider } from "react-hook-form";
import ArbitrageCalculations from "../src/components/arbitrage/ArbitrageCalculations";
import ArbitrageCalculationsErrorBoundary from "../src/components/arbitrage/ArbitrageCalculationsErrorBoundary";
import ArbitrageForm from "../src/components/arbitrage/ArbitrageForm";
import useArbitrageForm from "../src/hooks/useArbitrageForm";

const Home: NextPage = () => {
  const arbitrageForm = useArbitrageForm();

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
    </>
  );
};

export default Home;
