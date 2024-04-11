import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';
import SignUp from './pages/SignUp';
import AddPhoto from './pages/AddPhoto';
import AddRole from './pages/AddRole';
import Verify from './pages/Verify';
import { GoDotFill } from 'react-icons/go';
import { useSelector } from 'react-redux';

function App() {
  const [dotCount, setDotCount] = useState(1);
  const loader = useSelector(state => state.info.loader);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotCount(count => (count === 3 ? 1 : count + 1));
    }, 300); // Change the interval as needed

    return () => clearInterval(intervalId);
  }, []);

  const renderDots = () => {
    switch (dotCount) {
      case 1:
        return <GoDotFill size={24} color='white' />;
      case 2:
        return (
          <>
            <GoDotFill size={24} color='white' />
            <GoDotFill size={24} color='white' />
          </>
        );
      case 3:
        return (
          <>
            <GoDotFill size={24} color='white' />
            <GoDotFill size={24} color='white' />
            <GoDotFill size={24} color='white' />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <TransitionGroup>
        <CSSTransition
          key={window.location.key}
          classNames="page"
          timeout={500}
        >
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/addPhoto" element={<AddPhoto />} />
            <Route path="/addRole" element={<AddRole />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/verify/:emailToken" element={<Verify />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      {loader && (
        <div className="fixed inset-0 flex justify-center bg-white bg-opacity-5">
          <div className='flex gap-2 px-3 h-fit py-1 bg-[#cea028] rounded-b-lg z-[70]'>
          {renderDots()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;