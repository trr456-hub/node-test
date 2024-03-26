import { useState } from 'react';
import axios from 'axios';

export default function TestCase() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [gender, setGender] = useState('');

    const [userInfo, setUserInfo] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // 페이지 리로드 방지
        const post = { title, content };

        // 데이터를 백엔드로 전송
        try {
            const response = await axios.post('/posts', post);
            console.log('Post created successfully:', response.data);
            // 입력 필드 초기화
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('There was an error creating the post:', error);
        }
    };
    const radioChange = (e) => {
        setGender(e.target.value);
    };
    const userSubmit = async (e) => {
        e.preventDefault();
        const post = { id, pwd, gender };

        try {
            const response = await axios.post('/user', post);
            console.log('Post created successfully:', response.data);
            // 입력 필드 초기화
            setId('');
            setPwd('');
        } catch (error) {
            console.error('There was an error creating the post:', error);
        }
    };

    const getUser = async () => {
        await axios.get('/user').then((response) => {
            setUserInfo(response.data);
        });
    };
    console.log('userInfo : ', userInfo);

    // const getData = () => {
    //     axios.get('http://localhost:4000/posts').then(function (response) {
    //         console.log(response.data);
    //     });
    // };
    // const clk = () => {
    //     axios
    //         .get('http://localhost:4000/hipen')
    //         .then((response) => {
    //             setData(response.data);
    //             console.log(response.data);
    //         })
    //         .catch((error) => console.error(error));
    // };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
                <button type="submit">글 저장</button>
            </form>

            {/* <button onClick={getData}>btn</button> */}
            <form onSubmit={userSubmit}>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                <div>
                    <input type="radio" name="gender" value="M" onChange={radioChange} />M
                    <input type="radio" name="gender" value="F" onChange={radioChange} />F
                    <input type="radio" name="gender" value="O" onChange={radioChange} />O
                    <button type="submit">전송</button>
                </div>
            </form>
            <button onClick={getUser}>getuser</button>
            <div>
                {userInfo.map((v) => (
                    <div key={v.id}>
                        <span>{v.id}</span>
                        <span>{v.user_id}</span>
                        <span>{v.pwd}</span>
                        <span>{v.gender}</span>
                    </div>
                ))}
            </div>
        </>
    );
}
