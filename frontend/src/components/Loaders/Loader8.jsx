import { RotatingLines } from "react-loader-spinner";

export default function Loader8() {
    return (
        <div>
            <RotatingLines
                visible={true}
                height="17"
                width="17"
                color="white"
                strokeWidth="2"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}
