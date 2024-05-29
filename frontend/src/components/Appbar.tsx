import Logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom';

function Appbar() {
    const navigate = useNavigate();
    return (
      <>
        <nav className="py-3 px-28 border-b-[2px] bg-white">
            <div className="flex justify-between items-center">
                <div className="flex items-center font-black text-2xl gap-3 ">
                <img className="w-18 h-14" src={Logo} alt="Brand Image"></img>
                    Medium
                </div>
                <div className="font-normal text-sm space-x-6">
                    <span className="text-black cursor-pointer hover:border-b-2">Our Story</span>
                    <span className="text-black cursor-pointer hover:border-b-2">Membership</span>
                    <span className="text-black cursor-pointer hover:border-b-2">Write</span>
                    <span className="text-black cursor-pointer hover:border-b-2" onClick={() => navigate('/signin')}>Sign in</span>
                    <button className="border-solid border-1 rounded-3xl bg-black text-white font-normal px-4 py-2" onClick={() => navigate('/signup')}>
                        Get Started
                    </button>
                </div>

            </div>
        </nav>
      </>
    )
  }
  
  export default Appbar;