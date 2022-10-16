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
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        {...inputProps}
        className="border rounded-md py-1 px-3 block placeholder:text-zinc-300/50 w-full bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-600"
        ref={ref}
      />
    </span>
  );
});

export default Input;
