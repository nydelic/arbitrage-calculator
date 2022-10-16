import { Fragment } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { useArbitrageFormContext } from "../../hooks/useArbitrageForm";
import Input from "../Input";
import ArbitrageOddFields from "./ArbitrageOddFields";

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
      <div>
        <Input
          label="Budget"
          {...register("budget", {
            valueAsNumber: true,
            required: "This value is required and cannot be empty",
          })}
          type="number"
          placeholder="enter budget"
        />
      </div>
      {providedOddsFields.map((providedOddsField, pIndex) => (
        <Fragment key={providedOddsField.id}>
          <Controller
            control={control}
            name={`providedOdds.${pIndex}`}
            render={() => (
              <>
                <button
                  className=""
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    prepend({ odds: [1, 2, 3] });
                  }}
                >
                  Prepend
                </button>
                <ArbitrageOddFields providerIndex={pIndex} />
              </>
            )}
          />
        </Fragment>
      ))}
    </form>
  );
}

export default ArbitrageForm;
