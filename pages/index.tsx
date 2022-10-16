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
      </Head>
      <div className="mx-auto max-w-2xl py-10 px-8">
        <FormProvider {...arbitrageForm}>
          <ArbitrageForm />
          <ArbitrageCalculationsErrorBoundary>
            <ArbitrageCalculations />
          </ArbitrageCalculationsErrorBoundary>
        </FormProvider>
      </div>
    </>
  );
};

export default Home;
