export default function Error({ errorMsg }) {
  return (
    <div className="w-[100%]">
      <span className="text-red-500">{errorMsg}</span>
    </div>
  );
}
