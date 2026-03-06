import './ModelsModal.css';
export default function ModelsModal({ setSelectedModel }) {

    const selectModel = (e) => {
        setSelectedModel(e.target.textContent);
    }
    return (
        <div className="selected-models w-[max-content] rounded-2xl bg-neutral-900 absolute bottom-8 px-4 py-2 -left-4 z-50 shadow-2xl">
            <div onClick={selectModel}>llama-3.3-70b-versatile</div>
            <div onClick={selectModel}>groq/compound</div>
            <div onClick={selectModel}>openai/gpt-oss-safeguard-20b</div>
            <div onClick={selectModel}>llama-3.1-8b-instant</div>
            <div onClick={selectModel}>moonshotai/kimi-k2-instruct</div>
            <div onClick={selectModel}>meta-llama/llama-4-maverick-17b-128e-instruct</div>
        </div>
    )
}
