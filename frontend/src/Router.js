import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestCase from './testCase';
import Insert from './Insert';
import Detail from './Detail';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TestCase />} />
                <Route path="/insert" element={<Insert />} />
                <Route path="/:id" element={<Detail />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
