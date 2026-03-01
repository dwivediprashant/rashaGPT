import { RotatingLines } from "react-loader-spinner";

export default function Loader7() {
  return (
    <div>
      <RotatingLines
        visible={true}
        height="30"
        width="30"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
