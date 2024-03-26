import { useNavigate } from 'react-router-dom';

export default function TestCase() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/insert')}>글쓰기</button>
        </div>
    );
}
