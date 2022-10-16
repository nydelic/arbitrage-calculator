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
    <div className="relative">
      <div className="overflow-auto">
        <div className="flex flex-wrap -m-1">
          {providedOddFields.map((providedOddField, oIndex) => (
            <div
              key={`${providedOddField.id}-${providerIndex}`}
              className="m-1 flex-shrink flex-grow"
            >
              <div className="flex flex-col">
                <div className="relative">
                  <Input
                    {...register(
                      `providedOdds.${providerIndex}.odds.${oIndex}`,
                      {
                        valueAsNumber: true,
                        required: "This value is required and cannot be empty",
                      }
                    )}
                    type="number"
                    placeholder="enter odd"
                  />
                  <button
                    type="button"
                    className="block absolute right-0 top-0 h-full px-2 text-slate-300 border border-transparent hover:text-rose-500 hover:bg-rose-100 rounded-md hover:border-rose-200"
                    onClick={(e) => {
                      e.preventDefault();
                      remove(oIndex);
                    }}
                  >
                    <AiOutlineCloseCircle />
                  </button>
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
        className="block absolute left-full ml-2 top-0 p-2 text-slate-300 border border-transparent hover:text-emerald-500 hover:bg-emerald-100 rounded-md hover:border-emerald-200"
        onClick={(e) => {
          e.preventDefault();
          append(1);
        }}
      >
        <AiOutlinePlusCircle />
      </button>
    </div>
  );
}

export default ArbitrageOddFields;
