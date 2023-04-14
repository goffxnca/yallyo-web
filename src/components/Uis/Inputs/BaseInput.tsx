interface Props {
  label: string;
  emitChange: Function;
  children: React.ReactNode;
}

const BaseInput = ({ label, emitChange, children }: Props) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default BaseInput;
