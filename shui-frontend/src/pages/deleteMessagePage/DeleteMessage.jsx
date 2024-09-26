import React from 'react'
import FooterDelete from '../../components/footerDelete/FooterDelete';
import Header from '../../components/header/Header';
import deleteImg from '../../assets/delete-message-btn.svg';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteMessage() {
  const { MessageID, UserName } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [userName, setUserName] = useState(UserName || '');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`https://0y81swt2hg.execute-api.eu-north-1.amazonaws.com/api/messages/message/${MessageID}`);
        const { Text, UserName: fetchedUserName } = response.data.messageDetails;
        setText(Text || '');
        setUserName(fetchedUserName || '');
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setErrorMessage('Could not fetch message');
        setLoading(false);
      }
    }
    fetchMessage();
  }, [MessageID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.delete(`https://0y81swt2hg.execute-api.eu-north-1.amazonaws.com/api/messages/${MessageID}`, {
        Text: text,
        UserName: userName,
      });

      if (response.data.success) {
        setSuccessMessage('Message deleted successfully.');
        navigate('/');
      }
    } catch (error) {
      const errorMsg = error.response && error.response.data ? error.response.data.message : 'Could not delete message.';
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='postNewContainer'>
      <Header />
      <main className='postNewContent'>
        <section className='formSection'>
          <article className='messageContainer'>
            <form onSubmit={handleSubmit} className='messageForm'>
              <textarea
                value={text}
                readOnly
                className='textInput'
                rows="20"
              ></textarea>
              <div className='inputContainer'>
                <input
                  type="text"
                  value={userName}
                  readOnly
                  className='userInput'
                />
                <button type="submit" className='postBtn'>
                  <img src={deleteImg} alt="Delete Message" />
                </button>
              </div>
              {successMessage && <div className='successMessage'>{successMessage}</div>}
              {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
            </form>
          </article>
        </section>
      </main>
      <FooterDelete />
    </div>
  );
}


export default DeleteMessage
