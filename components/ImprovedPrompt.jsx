const ImprovedPrompt = ({ ogPrompt, improvedPrompt, id, handleDelete }) => {
  return (
    <div
      className="shadow-sm p-4"
      style={{
        width: "80% !important",
        margin: "0 auto",
      }}
    >
      <button
        className="items-center text-sm font-medium align-right text-gray-500 hover:text-gray-700"
        onClick={() => handleDelete()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
      <h5 className="text-gray-700 text-xs font-bold mb-2">
        Original Prompt: {ogPrompt}{" "}
      </h5>
      <h3 className="text-gray-700 text-xs mb-2">{improvedPrompt} </h3>
    </div>
  );
};

export default ImprovedPrompt;
