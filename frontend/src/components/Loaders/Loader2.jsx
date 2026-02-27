import { CirclesWithBar } from "react-loader-spinner";

export default function Loader2() {
  return (
    <div>
      <CirclesWithBar
        height="220"
        width="220"
        color="#ffffff"
        outerCircleColor="#ffffff"
        innerCircleColor="#ffffff"
        barColor="#ff00009d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
