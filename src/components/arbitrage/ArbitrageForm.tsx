import { Controller, useFieldArray } from "react-hook-form";
import { useArbitrageFormContext } from "../../hooks/useArbitrageForm";
import Input from "../Input";
import ArbitrageOddFields from "./ArbitrageOddFields";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface ArbitrageFormProps {}

function ArbitrageForm({}: ArbitrageFormProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useArbitrageFormContext();
  const {
    fields: providedOddsFields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
  } = useFieldArray({
    control,
    name: "providedOdds",
  });

  return (
    <form className="mb-4">
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
      <label>Odds</label>
      <div className="rounded-md p-2 border mb-4">
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
              append({ odds: [1, 2, 3] });
            }}
          >
            <AiOutlinePlusCircle className="mr-1" /> Add provider
          </button>
        </div>
      </div>
    </form>
  );
}

export default ArbitrageForm;