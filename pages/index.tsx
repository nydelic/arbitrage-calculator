import type { NextPage } from "next";
import Head from "next/head";
import { FormProvider } from "react-hook-form";
import ArbitrageCalculations from "../src/components/ArbitrageCalculations";
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
      <FormProvider {...arbitrageForm}>
        <ArbitrageForm />
        <ArbitrageCalculations />
      </FormProvider>
    </>
  );
};

export default Home;
