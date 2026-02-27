import { Puff } from "react-loader-spinner";

export default function Loader6() {
  return (
    <div>
      <Puff
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
