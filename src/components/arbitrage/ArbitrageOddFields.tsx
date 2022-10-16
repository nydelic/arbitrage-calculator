import { ErrorMessage } from "@hookform/error-message";
import { useFieldArray } from "react-hook-form";
import { useArbitrageFormContext } from "../../hooks/useArbitrageForm";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import Input from "../Input";

interface ArbitrageOddFieldsProps {
  providerIndex: number;
}

function ArbitrageOddFields({ providerIndex }: ArbitrageOddFieldsProps) {
  const {
    control,
    register,
    getValues,
    setValue,
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
    <div className="relative flex">
      <div className="w-full">
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${Math.min(
              5,
              providedOddFields.length
            )}, 1fr)`,
          }}
        >
          {providedOddFields.map((providedOddField, oIndex) => (
            <div key={`${providedOddField.id}-${providerIndex}`}>
              <div className="flex flex-col">
                <div className="relative">
                  <Input
                    // className="[&_input]:max-w-[5rem]"
                    {...register(
                      `providedOdds.${providerIndex}.odds.${oIndex}`,
                      {
                        valueAsNumber: true,
                        required: "This value is required and cannot be empty",
                      }
                    )}
                    min="0"
                    type="number"
                    placeholder="enter odd"
                  />
                  {providedOddFields.length > 2 && (
                    <button
                      type="button"
                      className="block absolute right-0 top-0 h-full px-2 text-zinc-300 border border-transparent hover:text-rose-500 hover:bg-rose-100 rounded-md hover:border-rose-200"
                      onClick={(e) => {
                        e.preventDefault();
                        const currentBiases = getValues("biasConfig");
                        if (currentBiases.length >= providedOddFields.length) {
                          const newBiases = Array.from(
                            new Array(providedOddFields.length - 1).keys()
                          ).map((newBias, index) => {
                            if (typeof currentBiases[index] === "number") {
                              return currentBiases[index];
                            }
                            return 100;
                          });

                          setValue("biasConfig", newBiases, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }
                        remove(oIndex);
                      }}
                    >
                      <AiOutlineCloseCircle />
                    </button>
                  )}
                </div>
                <ErrorMessage
                  errors={errors}
                  name={`providedOdds.${providerIndex}.odds.${oIndex}`}
                  render={({ message }) => (
                    <span className="text-rose-500 text-sm">{message}</span>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="block ml-2 top-0 p-2 h-f text-zinc-300 border border-transparent hover:text-emerald-500 hover:bg-emerald-100 rounded-md hover:border-emerald-200"
        onClick={(e) => {
          e.preventDefault();
          const currentBiases = getValues("biasConfig");
          if (currentBiases.length <= providedOddFields.length) {
            const newBiases = Array.from(
              new Array(providedOddFields.length + 1).keys()
            ).map((newBias, index) => {
              if (typeof currentBiases[index] === "number") {
                return currentBiases[index];
              }
              return 100;
            });

            setValue("biasConfig", newBiases, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }
          append(1);
        }}
      >
        <AiOutlinePlusCircle />
      </button>
    </div>
  );
}

export default ArbitrageOddFields;
