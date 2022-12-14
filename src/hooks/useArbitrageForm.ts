import { useForm, useFormContext } from "react-hook-form";

export interface ArbitrageFormShape {
  budget: number;
  enableBias: boolean;
  biasConfig: number[];
  providedOdds: { odds: number[] }[];
}

export function useArbitrageFormContext() {
  return useFormContext<ArbitrageFormShape>();
}

function useArbitrageForm() {
  const arbitrageForm = useForm<ArbitrageFormShape>({
    criteriaMode: "all",
    mode: "all",
    defaultValues: {
      providedOdds: [{ odds: [3, 3, 3] }],
      budget: 100,
      enableBias: false,
      biasConfig: [100, 100, 100],
    },
  });

  return arbitrageForm;
}

export default useArbitrageForm;
