import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { storeUserData } from '../handlers/authHandler';
import Loading from '../components/Loading';

interface signupPropsTypes {
  setShowSignUp: Function;
  setShowSignIn: Function;
  setAuthenticated?: Function;
}

const Signup  = ({setShowSignUp, setShowSignIn}: signupPropsTypes) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  const signupHandler = async (e:any) => {
    setLoading(true);
    try {
      e.preventDefault();
      const user = await storeUserData(email, username, password);
      if(!user) throw Error;
      navigate('/home')
    } catch (error) {
      console.error("Error while signing up.")
    } finally {
      setLoading(false)
    }

  };

  if(loading) return <Loading />

  return (
    <div className="flex flex-col items-center p-5 h-[80vh] w-screen bg-white bg-opacity-95 absolute z-10">
        <div className='text-3xl font-black py-2'>
            Join Medium
        </div>
        <div className='pt-4'>
        <div className='py-2'>
            <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </div>
        <div className='py-2'>
            <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>
        <div className='py-2'>
            <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        </div>
        <div className='py-2'>
            <Button label="Sign up" onClick={signupHandler}/>
        </div>

        <div className='text-sm font-medium py-1'>
            <p>Already have an account? <span className='text-base font-bold text-black cursor-pointer' onClick={() => {setShowSignIn(true); setShowSignUp(false)}} >Log in</span></p>
        </div>

    </div>
  );
};

export default Signup;
