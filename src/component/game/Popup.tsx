const Popup: React.FC<{ message: string; subMessage?: string }> = ({ message, subMessage }) => (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-8 rounded-2xl text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">{message}</h2>
          {subMessage && <p className="text-gray-300">{subMessage}</p>}
        </div>
      </div>
    );

    export default Popup;