import star from "../../../public/star.png"
interface PropsType {
  multi: string | number | undefined;
  amount: string | number | undefined;
}
const CashoutPopup: React.FC<PropsType> = ({ multi, amount }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 animate-fadeIn">
      {/* Backdrop inside board */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl" />

      {/* Card */}
      <div className="relative w-[320px] max-w-[90%] mx-auto transform animate-slideUp">
        <div className="bg-[#323738] border-[10px] border-[#3a4142] rounded-2xl p-6 shadow-2xl text-center relative">

          <div className="text-5xl font-extrabold text-[#4aed9b] drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]">
            {multi}x
          </div>
           <img src={star} alt="star" className="absolute  opacity-60  top-[35px] left-[20px] " />
              <img src={star} alt="star" className="absolute  top-[45px] left-[50px] " />
               <img src={star} alt="star" className="absolute opacity-60  top-[35px] right-[20px] " />
              <img src={star} alt="star" className="absolute  top-[45px] right-[50px] " />

          <div className="mt-3 px-3 py-4 rounded-md bg-[#3a4142] text-gray-100 text-sm">
            ₹{amount}             <span> 🇮🇳</span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CashoutPopup;
