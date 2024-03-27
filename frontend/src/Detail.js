import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Detail() {
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
    return (
        <div>
            <h2>{state.text_title}</h2>
            <h3>{state.text}</h3>
            <h4>{state.user_name}</h4>
            <button onClick={delete_board}>삭제</button>
        </div>
    );
}
