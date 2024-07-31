import React, { useState, useRef } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Window, WindowHeader, WindowContent, Button, TextField } from 'react95';
import original from 'react95/dist/themes/original';
import { styleReset } from 'react95';
import DOMPurify from 'dompurify';

// Define global styles
const GlobalStyle = createGlobalStyle`
  ${styleReset}
  body {
    font-family: 'System', sans-serif;
  }
`;

const presetMessages = [
  "Hi! Me here. What you need?",
  "Ask me stuff. I pretend to know.",
  "Help? Me good at making things up.",
  "How's it? I'm just here to chat.",
  "Need info? Me no expert, but fun!",
  "Me talk to you. No reason, just bored.",
  "Questions? Me answer like crazy!",
  "Want help? Me not know much.",
  "Me here to chat. Maybe say silly stuff."
];

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isChatVisible, setIsChatVisible] = useState(true);

  const handleSend = () => {
    const sanitizedInput = DOMPurify.sanitize(input.trim());
    if (sanitizedInput) {
      setMessages([...messages, { type: 'user', text: sanitizedInput }]);
      setInput('');

      // Simulate AI response
      setTimeout(() => {
        let response;
        const lowercaseInput = sanitizedInput.toLowerCase();
        
        switch (true) {
          case lowercaseInput === "ca":
            response = "CA is updating...";
            break;
          case ["twitter", "twit", "x"].includes(lowercaseInput):
            response = "Check out our Twitter/X account @AGISOLANA for the latest updates and news!";
            break;
          case ["telegram", "tele", "tg"].includes(lowercaseInput):
            response = "Join our Telegram community https://t.me/AGIportalsol for real-time discussions and support!";
            break;
          default:
            response = presetMessages[Math.floor(Math.random() * presetMessages.length)];
        }
        
        setMessages(prevMessages => [...prevMessages, { type: 'ai', text: response }]);
      }, 500);
    }
  };

  return (
    <div className={`absolute top-4 -right-[17%] md:right-4 ${isChatVisible ? 'block' : 'hidden'} w-full sm:w-[60%] md:w-[300px]`}>
      <Window>
        <WindowHeader className='text-xl'>
          Chat
        </WindowHeader>
        <WindowContent className="flex flex-col h-[400px]">
          <div className="flex-1 overflow-y-auto mb-2">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 mb-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-4 py-2 rounded-lg ${msg.type === 'user' ? 'bg-[#05057F] text-white' : 'bg-gray-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex">
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{ flex: 1, marginRight: '4px' }}
            />
            <Button onClick={handleSend}>
              Send
            </Button>
          </div>
        </WindowContent>
      </Window>
    </div>
  );
}

function App() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setMuted(video.muted);
    }
  };

  return (
    <ThemeProvider theme={original}>
      <GlobalStyle />
      <div className="h-screen w-screen flex justify-center items-center relative">
        <div className='absolute bottom-3 right-3 flex space-x-1 items-center z-[50]'>
          <a href="https://x.com/AGISOLANA" className='transition ease-in-out duration-150'>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='w-10 h-10 md:w-12 md:h-12 md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer' fill="#cbd5e1" viewBox="0 0 50 50">
              <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
            </svg>
          </a>
          <a href="https://t.me/AGIportalsol" className='transition ease-in-out duration-150'>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='w-10 h-10 md:w-12 md:h-12 md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer' fill="#cbd5e1" viewBox="0 0 50 50">
              <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
            </svg>
          </a>
        </div>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ pointerEvents: 'none' }}
        >
          <source src={`${process.env.PUBLIC_URL}/vid.mp4`} type="video/mp4" />
        </video>
        <img src="agi.png" className='absolute bottom-0 left-0 w-[55%]' alt="AGI" />
        <Chat />
      </div>
    </ThemeProvider>
  );
}

export default App;