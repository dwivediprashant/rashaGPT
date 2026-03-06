import './ModelsModal.css';
export default function ModelsModal({ setSelectedModel, setShowModels, selectedModel }) {

    const selectModel = (e) => {
        setSelectedModel(e.target.textContent);
        setShowModels(false);
    }
    return (
        <ul className="selected-models w-[max-content] rounded-2xl bg-neutral-900 absolute bottom-8 px-4 py-2 -left-4 z-50 shadow-2xl">
            <li onClick={selectModel} className={selectedModel === "llama-3.3-70b-versatile" ? "text-green-600" : ""}>llama-3.3-70b-versatile</li>
            <li onClick={selectModel} className={selectedModel === "groq/compound" ? "text-green-600" : ""}>groq/compound</li>
            <li onClick={selectModel} className={selectedModel === "openai/gpt-oss-safeguard-20b" ? "text-green-600" : ""}>openai/gpt-oss-safeguard-20b</li>
            <li onClick={selectModel} className={selectedModel === "llama-3.1-8b-instant" ? "text-green-600" : ""}>llama-3.1-8b-instant</li>
            <li onClick={selectModel} className={selectedModel === "moonshotai/kimi-k2-instruct" ? "text-green-600" : ""}>moonshotai/kimi-k2-instruct</li>
            <li onClick={selectModel} className={selectedModel === "meta-llama/llama-4-maverick-17b-128e-instruct" ? "text-green-600" : ""}>meta-llama/llama-4-maverick-17b-128e-instruct</li>
        </ul>
    )
}
