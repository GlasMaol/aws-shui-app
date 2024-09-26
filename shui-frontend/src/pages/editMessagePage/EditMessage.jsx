import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../pages/editMessagePage/editMessage.css';
import Header from '../../components/header/Header';
import FooterEdit from '../../components/footerEdit/FooterEdit';
import { useParams, useNavigate } from 'react-router-dom';
import sendImg from '../../assets/send-message-btn.svg';

function EditMessage() {
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
      const response = await axios.put(`https://0y81swt2hg.execute-api.eu-north-1.amazonaws.com/api/messages/${MessageID}`, {
        Text: text,
        UserName: userName,
      });

      if (response.data.success) {
        setSuccessMessage('Message updated successfully.');
        navigate('/');
      }
    } catch (error) {
      const errorMsg = error.response && error.response.data ? error.response.data.message : 'Could not update message.';
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
                onChange={(e) => setText(e.target.value)}
                required
                className='textInput'
                rows="20"
              ></textarea>
              <div className='inputContainer'>
                <input
                  type="text"
                  value={userName || ''}
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
      <FooterEdit />
    </div>
  );
}

export default EditMessage;
