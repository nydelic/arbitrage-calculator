import { useForm, useFormContext } from "react-hook-form";

export interface ArbitrageFormShape {
  budget: number;
  biasConfig: number[];
  providedOdds: number[][];
}

export function useArbitrageFormContext() {
  return useFormContext<ArbitrageFormShape>();
}

function useArbitrageForm() {
  const arbitrageForm = useForm<ArbitrageFormShape>({
    criteriaMode: "all",
    mode: "all",
    defaultValues: { providedOdds: [[3, 5, 99]], budget: 1000 },
  });

  return arbitrageForm;
}

export default useArbitrageForm;
