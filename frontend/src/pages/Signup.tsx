import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Signup : React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>)  => {
    navigate('/dashboard')
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <div className='text-3xl font-black py-2'>
            Create an account
        </div>
        <div className='text-sm font-medium py-1'>
            <p>Already have an aqccount? Log in</p>
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
            <Button label="Sign up" onClick={handleClick}/>
        </div>

    </div>
  );
};

export default Signup;
