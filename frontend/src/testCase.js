import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TestCase() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // 페이지 리로드 방지
        const post = { title, content };

        // 데이터를 백엔드로 전송
        try {
            const response = await axios.post('http://localhost:4000/posts', post);
            console.log('Post created successfully:', response.data);
            // 입력 필드 초기화
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('There was an error creating the post:', error);
        }
    };

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
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
            <button type="submit">글 저장</button>
        </form>
    );
}
