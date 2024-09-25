import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterPostNew from '../../components/footerPostNew/FooterPostNew';
import Header from '../../components/header/Header';
import '../../pages/postMessagePage/postMessage.css';
import sendImg from '../../assets/send-message-btn.svg';
import axios from 'axios';

function PostMessage() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [userName, setUserName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageData = {
      message: {
        Text: text,
        UserName: userName,
      },
    };

    try {
      const response = await axios.post('https://0y81swt2hg.execute-api.eu-north-1.amazonaws.com/api/messages', messageData);
      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setText('');
        setUserName('');

        navigate('/');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Error adding message');
    }
  };

  return (
    <div className='postNewContainer'>
      <Header />
      <main className='postNewContent'>
        <section className='formSection'>
          <article className='messageContainer'>
            <form onSubmit={handleSubmit} className='messageForm'>
              <textarea
                placeholder="Enter message, max 500 characters...."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                className='textInput'
                rows="20"
              ></textarea>
              <div className='inputContainer'>
                <input
                  type="text"
                  placeholder="Enter name 5 to 10 characters....."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className='userInput'
                />
                <button type="submit" className='postBtn'>
                  <img src={sendImg} alt="Send Message" />
                </button>
              </div>
              {successMessage && <div className='successMessage'>{successMessage}</div>}
              {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
            </form>
          </article>
        </section>
      </main>
      <FooterPostNew />
    </div>
  );
}

export default PostMessage;
