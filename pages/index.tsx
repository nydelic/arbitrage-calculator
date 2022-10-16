import type { NextPage } from "next";
import Head from "next/head";
import { FormProvider } from "react-hook-form";
import ArbitrageCalculations from "../src/components/ArbitrageCalculations";
import ArbitrageCalculationsErrorBoundary from "../src/components/ArbitrageCalculationsErrorBoundary";
import ArbitrageForm from "../src/components/ArbitrageForm";
import useArbitrageForm from "../src/hooks/useArbitrageForm";

const Home: NextPage = () => {
  const arbitrageForm = useArbitrageForm();

  return (
    <>
      <Head>
        <title>Nydelic</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-2xl py-10">
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
