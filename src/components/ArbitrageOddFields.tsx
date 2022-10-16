import { ErrorMessage } from "@hookform/error-message";
import { useFieldArray } from "react-hook-form";
import { useArbitrageFormContext } from "../hooks/useArbitrageForm";

interface ArbitrageOddFieldsProps {
  providerIndex: number;
}

function ArbitrageOddFields({ providerIndex }: ArbitrageOddFieldsProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useArbitrageFormContext();
  const {
    fields: providedOddFields,
    append,
    // prepend,
    remove,
    // swap,
    // move,
    // insert,
  } = useFieldArray({
    control,
    name: `providedOdds.${providerIndex}.odds` as any,
  });
  return (
    <>
      {providedOddFields.map((providedOddField, oIndex) => (
        <div key={`${providedOddField.id}-${providerIndex}`}>
          <div className="inline-flex flex-col">
            <input
              {...register(`providedOdds.${providerIndex}.odds.${oIndex}`, {
                valueAsNumber: true,
                required: "This value is required and cannot be empty",
              })}
              type="number"
              placeholder="enter odd"
            />
            <ErrorMessage
              errors={errors}
              name={`providedOdds.${providerIndex}.odds.${oIndex}`}
              render={({ message }) => (
                <span className="text-rose-500 text-sm">{message}</span>
              )}
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                remove(oIndex);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          append(1);
        }}
      >
        Append
      </button>
    </>
  );
}

export default ArbitrageOddFields;
