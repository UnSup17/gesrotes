interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  required?: boolean;
}

export function Select({ label, required, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium flex gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...props}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {props.children}
      </select>
    </div>
  );
}
