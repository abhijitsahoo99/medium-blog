import Logo from '../assets/logo.svg'

function Appbar() {
    return (
      <>
        <nav className="py-3 px-28 border-b-[2px] bg-white">
            <div className="flex justify-between items-center">
                <div className="flex items-center font-black text-2xl gap-3 ">
                <img className="w-18 h-14" src={Logo} alt="Brand Image"></img>
                    Medium
                </div>
                <div className="font-normal text-sm space-x-6">
                    <span className="text-black cursor-pointer">Our Story</span>
                    <span className="text-black cursor-pointer">Membership</span>
                    <span className="text-black cursor-pointer">Write</span>
                    <span className="text-black cursor-pointer">Sign in</span>
                    <button className="border-solid border-1 rounded-3xl bg-black text-white font-normal px-4 py-2">
                        Get Started
                    </button>
                </div>

            </div>
        </nav>
      </>
    )
  }
  
  export default Appbar;