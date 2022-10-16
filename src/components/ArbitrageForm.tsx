import { Fragment } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { useArbitrageFormContext } from "../hooks/useArbitrageForm";
import { ErrorMessage } from "@hookform/error-message";

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
    <form>
      <div>
        <input
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
            render={({ field }) => (
              <>
                {field.value.map((odd, oIndex) => {
                  return (
                    <div
                      key={`${providedOddsField.id}-${oIndex}`}
                      className="inline-flex flex-col"
                    >
                      <input
                        {...register(`providedOdds.${pIndex}.${oIndex}`, {
                          valueAsNumber: true,
                          required:
                            "This value is required and cannot be empty",
                        })}
                        type="number"
                        placeholder="enter odd"
                      />
                      <ErrorMessage
                        errors={errors}
                        name={`providedOdds.${pIndex}.${oIndex}`}
                        render={({ message }) => <span>{message}</span>}
                      />
                    </div>
                  );
                })}
              </>
            )}
          />
        </Fragment>
      ))}
    </form>
  );
}

export default ArbitrageForm;
