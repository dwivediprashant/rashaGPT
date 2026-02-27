import { Whirl, Hairball, HairballPreset } from "react-loader-spinner";

export default function Loader4() {
  return (
    <div>
      {" "}
      <Whirl preset="rainbow" speedInSecond={2} width="100" height="100" />
    </div>
  );
}
