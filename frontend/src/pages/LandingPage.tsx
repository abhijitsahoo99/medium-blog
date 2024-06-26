import LandingImage from '../assets/landing_page.png'
import Footer from '../components/Footer';
import Signup from './Signup';
import Signin from './Signin';

interface landingPageType {
  showSignIn : boolean;
  showSignUp: boolean;
  setShowSignUp: Function;
  setShowSignIn: Function;
  setAuthenticated?: Function;
}
function LandingPage({showSignIn, showSignUp, setShowSignIn, setShowSignUp}: landingPageType) {

  return (
    <>
      <div className="flex items-center h-[83vh] w-screen">
      {showSignUp && !showSignIn && <Signup setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} />}
      {!showSignUp && showSignIn && <Signin setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />}
        <div className="flex flex-col pl-32">
          <p className="text-7xl font-black text-bold ">
            Human 
          </p>
          <p className="text-7xl font-black text-bold mt-1">
          stories & ideas
          </p>
          <p className="mt-6 text-lg">
            A place to read, write, and deepen your understanding
          </p>
          <button className="mt-8 border-solid border-2 border-black rounded-3xl py-2 w-40 bg-black text-white font-normal">
            Get Started
          </button>
        </div>
          <img className='absolute h-screen w-1/2 -z-10 right-0 top-3' src={LandingImage} alt="landing-page" />
      </div>
      <Footer  />
    </>
  )
}

export default LandingPage;
