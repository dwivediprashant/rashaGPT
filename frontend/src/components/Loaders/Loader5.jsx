import { CirclesWithBar } from "react-loader-spinner";

export default function Loader5() {
  return (
    <div>
      <CirclesWithBar
        height="100"
        width="1000"
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
