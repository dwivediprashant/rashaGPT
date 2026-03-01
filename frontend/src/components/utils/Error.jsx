export default function Error({ errorMsg }) {
  return (
    <div>
      <span className="text-red-500">{errorMsg}</span>
    </div>
  );
}
