interface Props {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const BaseInput = ({ label, error, children }: Props) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default BaseInput;
