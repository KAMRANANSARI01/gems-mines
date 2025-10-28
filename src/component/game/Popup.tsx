const Popup: React.FC<{ message: string; subMessage?: string }> = ({ message, subMessage }) => (
      <div className="absolute inset-0 flex items-center justify-center z-50 animate-fadeIn">
         {/* Backdrop inside board */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl" />

      <div className="relative w-[320px] max-w-[90%] mx-auto transform animate-slideUp">
        <div className="bg-[#2f3436] border border-gray-700 rounded-2xl p-6 shadow-2xl text-center">
 <h2 className="text-3xl font-bold mb-4">{message}</h2>
          {subMessage && <p className="text-gray-300">{subMessage}</p>}
          
        </div>
      </div>
      </div>
    );

    export default Popup;