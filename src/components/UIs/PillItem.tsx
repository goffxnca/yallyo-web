interface Props {
  title: string;
  count?: number;
  active: boolean;
  onEmitSelect: Function;
}
const PillItem = ({ title, count, active, onEmitSelect }: Props) => {
  return (
    <div
      className={`border px-4 py-1 my-1 text-sm select-none rounded-full mx-1 cursor-pointer hover:gray-500 delay-100 transition-all ${
        active && "border-4 scale-105"
      }`}
      onClick={() => {
        if (active) {
          onEmitSelect("");
        } else {
          onEmitSelect(title);
        }
      }}
    >
      {title}
      {count && <span className="ml-2">{count}</span>}
    </div>
  );
};

export default PillItem;
