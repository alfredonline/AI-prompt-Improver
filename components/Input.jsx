const Input = ({ handleSubmit, setUserPrompt, userPrompt }) => {
  return (
    <form
      className="w-full max-w-lg mt-5"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-text"
          >
            Your prompt
          </label>
          <div
            className="flex gap-4 items-center"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-text"
              type="text"
              onChange={(e) => setUserPrompt(e.target.value)}
              value={userPrompt}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Improve
            </button>
          </div>
          <p className="text-gray-600 text-xs italic">
            Enter the prompt you want to improve.
          </p>
        </div>
      </div>
    </form>
  );
};

export default Input;
