interface Props {
  title: string;
  count?: number;
  active: boolean;
  onEmitSelect: Function;
}
const PillItem = ({ title, count, active, onEmitSelect }: Props) => {
  return (
    <div
      className={`border px-4 py-1 my-1 text-sm select-none rounded-full mx-1 cursor-pointer  text-white hover:text-accent2 delay-100 transition-all ${
        active && "bg-accent1 scale-105"
      }`}
      onClick={() => {
        onEmitSelect(title);
      }}
    >
      {title}
      {count && <span className="ml-2">{count}</span>}
    </div>
  );
};

export default PillItem;
