import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Detail from './Detail';

export default function TestCase() {
    const [select, setSelect] = useState([]);

    const navigate = useNavigate();

    const passData = (data) => {
        navigate(`/${data.id}`, { state: data });
    };

    useEffect(() => {
        axios.get('/select').then((response) => {
            setSelect(response.data);
        });
    }, []);
    return (
        <div className="layout">
            <div>
                <span>제목</span>
                <span>작성자</span>
            </div>
            {select.map((data) => (
                <div key={data.id}>
                    <span onClick={() => passData(data)}>{data.text_title}</span>
                    <span>{data.user_name}</span>
                </div>
            ))}
            <button onClick={() => navigate('/insert')}>글쓰기</button>
        </div>
    );
}
