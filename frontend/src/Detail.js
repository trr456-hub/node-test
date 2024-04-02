import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Detail() {
    const [text_title, setTitle] = useState('');
    const [text, setContent] = useState('');
    const [user_name, setUserName] = useState('');
    const [toggle, setToggle] = useState(false);

    const state = useLocation().state;

    const navigation = useNavigate();

    const delete_board = async () => {
        const id = state.id;
        console.log(id);
        try {
            const result = await axios.post('/del', { id: id });
            console.log(result);
            navigation('/');
        } catch (err) {
            console.log(err);
        }
    };
    const update_board = () => {
        toggle ? setToggle(false) : setToggle(true);
    };
    const update_data = async (e) => {
        e.preventDefault();
        const id = state.id;
        const post = { text, user_name, text_title, id };
        console.log(post);
        try {
            const result = await axios.post('/update', post);
            console.log(result);
            navigation('/');
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <div>
                <h2>{state.text_title}</h2>
                <h3>{state.text}</h3>
                <h4>{state.user_name}</h4>
            </div>
            {toggle ? (
                <form onSubmit={update_data}>
                    <input value={text_title} onChange={(e) => setTitle(e.target.value)} type="text" />
                    <textarea value={text} onChange={(e) => setContent(e.target.value)} />
                    <input value={user_name} onChange={(e) => setUserName(e.target.value)} type="text" />
                    <button type="submit">수정</button>
                </form>
            ) : (
                ''
            )}
            <button onClick={delete_board}>삭제</button>
            <button onClick={update_board}>수정</button>
        </div>
    );
}
