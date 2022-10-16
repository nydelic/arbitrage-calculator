import { Controller, useFieldArray } from "react-hook-form";
import { useArbitrageFormContext } from "../../hooks/useArbitrageForm";
import Input from "../Input";
import ArbitrageOddFields from "./ArbitrageOddFields";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface ArbitrageFormProps {}

function ArbitrageForm({}: ArbitrageFormProps) {
  const { control, register, watch, getValues } = useArbitrageFormContext();
  const {
    fields: providedOddsFields,
    append,
    // prepend,
    remove,
    // swap,
    // move,
    // insert,
  } = useFieldArray({
    control,
    name: "providedOdds",
  });

  const enableBias = watch("enableBias");

  return (
    <form className="mb-4">
      <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-zinc-900 dark:text-white">
        Arbitrage calculator
      </h1>
      <div className="mb-4">
        <Input
          label="Budget"
          {...register("budget", {
            valueAsNumber: true,
            required: "This value is required and cannot be empty",
          })}
          min="0"
          type="number"
          placeholder="enter budget"
        />
      </div>
      <label className="text-sm font-medium">Provider odds</label>
      <div className="rounded-md p-2 border mb-4 bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-600">
        <div>
          {providedOddsFields.map((providedOddsField, pIndex) => (
            <div key={providedOddsField.id} className="mb-2 last:mb-0">
              <Controller
                control={control}
                name={`providedOdds.${pIndex}`}
                render={() => <ArbitrageOddFields providerIndex={pIndex} />}
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            type="button"
            className="text-sm my-1 text-zinc-300 disabled:text-zinc-200 border border-transparent hover:[&:not(:disabled)]:text-rose-500 hover:[&:not(:disabled)]:underline -mb-2 inline-flex items-center mr-2"
            onClick={(e) => {
              e.preventDefault();
              remove(providedOddsFields.length - 1);
            }}
            disabled={providedOddsFields.length <= 1}
          >
            <AiOutlinePlusCircle className="mr-1" /> Remove provider
          </button>

          <button
            type="button"
            className="text-sm my-1 text-zinc-300 border border-transparent hover:text-emerald-500 hover:underline -mb-2 inline-flex items-center"
            onClick={(e) => {
              e.preventDefault();
              const allProviders = getValues("providedOdds");
              const lastProvider = allProviders[allProviders.length - 1];

              append({ odds: [...lastProvider.odds] });
            }}
          >
            <AiOutlinePlusCircle className="mr-1" /> Add provider
          </button>
        </div>
      </div>
      <div>
        <label
          htmlFor="enableBias"
          className="inline-flex relative items-center cursor-pointer"
        >
          <input
            id="enableBias"
            className="sr-only peer"
            type="checkbox"
            {...register("enableBias")}
          />
          <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-color-300 dark:peer-focus:ring-accent-color-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-accent-color-600"></div>
          <span className="ml-3 text-sm font-medium">Bias</span>
        </label>
      </div>
      <div className="rounded-md p-2 border mb-4 bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-600">
        <Controller
          control={control}
          name="biasConfig"
          render={({ field }) => (
            <div className={enableBias ? "" : "opacity-50 pointer-events-none"}>
              {field.value.map((biasField, bIndex) => (
                <input
                  className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-zinc-700"
                  key={bIndex}
                  {...register(`biasConfig.${bIndex}`, {
                    valueAsNumber: true,
                    required: "required",
                  })}
                  min="0"
                  type="range"
                  max="100"
                />
              ))}
            </div>
          )}
        />
      </div>
    </form>
  );
}

export default ArbitrageForm;
