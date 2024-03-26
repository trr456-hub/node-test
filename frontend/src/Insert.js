import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Insert() {
    const [text_title, setTitle] = useState('');
    const [text, setContent] = useState('');
    const [user_name, setUserName] = useState('');

    const navigation = useNavigate();

    const submit_start = async (e) => {
        e.preventDefault();
        const post = { text_title, text, user_name };

        try {
            const response = await axios.post('http://localhost:3050/insert', post);
            console.log(response);
            setTitle('');
            setContent('');
            setUserName('');
            navigation('/');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form onSubmit={submit_start}>
            <input value={text_title} onChange={(e) => setTitle(e.target.value)} type="text" />
            <textarea value={text} onChange={(e) => setContent(e.target.value)} />
            <input value={user_name} onChange={(e) => setUserName(e.target.value)} type="text" />
            <button type="submit">글쓰기</button>
        </form>
    );
}
