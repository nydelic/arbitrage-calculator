import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function InputInner(
  { label, className, ...inputProps },
  ref
) {
  return (
    <span className={className}>
      {label && <label>{label}</label>}
      <input
        {...inputProps}
        className="border rounded-md py-1 px-3 block placeholder:text-slate-100/40 w-full"
        ref={ref}
      />
    </span>
  );
});

export default Input;
