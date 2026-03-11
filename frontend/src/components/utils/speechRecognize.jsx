
import { useContext, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import AudioLoader from "../../components/Loaders/AudioLoader";
import Loader8 from "../../components/Loaders/Loader8";
import MainContext from "../../context/MainContext"
export default function SpeechRecognize({ setPrompt, getReply, isReplying }) {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable
    } = useSpeechRecognition();

    const { showNotice } = useContext(MainContext);


    if (!browserSupportsSpeechRecognition) {
        showNotice({ msg: "Your browser doesn't support. Try using Chrome", type: "error" });
        return null;
    }

    const handleMicOpenClick = (e) => {
        e.preventDefault();
        if (!isMicrophoneAvailable) {
            showNotice({ msg: "Microphone is not permitted. Please check your browser settings.", type: "error" });
            return;
        }
        SpeechRecognition.startListening({ continuous: true });
    }

    useEffect(() => {
        if (transcript) {
            // console.log(typeof transcript)//string 
            setPrompt(transcript);
        }
    }, [transcript]);

    return (
        <div className="flex items-center gap-2 justify-center bg-neutral-950 p-2">
            <>
                {listening ?
                    <div className="flex items-center gap-2">
                        <AudioLoader />
                        <button type="button" onClick={async (e) => {
                            e.preventDefault();
                            SpeechRecognition.stopListening();
                            await getReply(e);
                            resetTranscript();
                        }}><i className="fa-solid fa-microphone-slash text-lg hover:text-gray-400"></i>
                        </button>
                    </div>
                    : isReplying ? <Loader8 /> : <button type="button" onClick={handleMicOpenClick}><i className="fa-solid fa-microphone text-lg hover:text-gray-400"></i></button>}
            </>

        </div>
    );
};
