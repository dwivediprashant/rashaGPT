import { Triangle } from "react-loader-spinner";

export default function Loader3() {
  return (
    <div>
      <Triangle
        visible={true}
        height="220"
        width="220"
        color="#08e7089d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
