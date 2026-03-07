import { Audio } from 'react-loader-spinner'

export default function AudioLoader() {
    return (
        <div>
            <Audio
                height="20"
                width="20"
                color="#4fa94d"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
            />
        </div>
    )
}
