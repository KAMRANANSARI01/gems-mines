interface propsType{
      multi : string |number |undefined;
      amount : string |number |undefined

}

const CashoutPopup:React.FC<propsType> =({multi , amount})=>{
      
            return (
                  <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
                    {/* backdrop */}
                    <div
                      className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    />
              
                    {/* card */}
                    <div className="relative w-[320px] max-w-[90%] mx-auto transform animate-popup-in">
                      <div className="bg-[#2f3436] border border-gray-700 rounded-2xl p-6 shadow-2xl text-center">
                        <div className="mb-3">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#1b8b5a]/30 to-[#34d399]/20">
                            <span className="text-xs text-green-300 font-semibold">CASHOUT</span>
                          </div>
                        </div>
              
                        <div className="text-5xl font-extrabold text-[#4aed9b] drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]">
                          {multi}x
                        </div>
              
                        <div className="mt-3 px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 text-sm">
                          ₹{amount}
                        </div>
                      </div>
              
                      {/* decorative floating sparkle / stars */}
                      <div className="pointer-events-none">
                        <span className="absolute -top-4 -left-6 w-8 h-8 animate-sparkle">
                          <svg viewBox="0 0 24 24" className="w-full h-full opacity-90">
                            <path fill="#34d399" d="M12 2l1.8 4.6L18.9 8l-4.6 1.8L12 14l-1.3-4.2L6 8l5.1-1.4z" />
                          </svg>
                        </span>
                        <span className="absolute -bottom-6 right-6 w-6 h-6 animate-sparkle-slow opacity-90">
                          <svg viewBox="0 0 24 24" className="w-full h-full">
                            <path fill="#a78bfa" d="M12 2l1.8 4.6L18.9 8l-4.6 1.8L12 14l-1.3-4.2L6 8l5.1-1.4z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                );
      
}

export default CashoutPopup;