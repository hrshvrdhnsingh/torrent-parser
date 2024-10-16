import {Routes, Route} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Search from './pages/Search';
import './App.css';

function App() {
    const user = localStorage.getItem("user")
    return (
        <div className='flex items-center justify-center w-screen min-h-screen'>
            <div className="waveWrapper waveAnimation w-full">
                <div className="waveWrapperInner bgTop">
                    <div className="wave waveTop" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-top.png')" }}></div>
                </div>
                <div className="waveWrapperInner bgMiddle">
                    <div className="wave waveMiddle" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-mid.png')" }}></div>
                </div>
                <div className="waveWrapperInner bgBottom">
                    <div className="wave waveBottom" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-bot.png')" }}></div>
                </div>
            </div>
            <Routes>
                {user && <Route path="/search" element={<Search />} />}
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>

    );
}

export default App;
