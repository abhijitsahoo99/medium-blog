import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { logInUser } from '../handlers/authHandler';


interface signinPropsTypes {
  setShowSignIn: Function;
  setShowSignUp: Function;
  setAuthenticated?: Function;
}

const Signin = ({setShowSignIn, setShowSignUp}: signinPropsTypes) => {

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  const signinHandler = async (e:any) => {
    setLoading(true);
    try {
      e.preventDefault();
      const user = await logInUser(email, password);
      if(!user) throw Error;
      navigate('/home')
    } catch (error) {
      console.error("Error while signing in.")
    } finally {
      setLoading(false)
    }

  };

  if(loading) return <Loading />
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <div className='text-3xl font-black py-2'>
            Welcome back !
        </div>
        <div className='pt-4'>
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
            <Button label="Sign in" onClick={signinHandler}/>
        </div>

        <span className=' text-sm font-light text-gray-500'>Don't have an account? <span className=' text-base font-bold  text-black cursor-pointer' onClick={() => {setShowSignIn(false); setShowSignUp(true)}}>Create One.</span></span>
    </div>
  );
};

export default Signin;
