import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestCase from './testCase';
import Insert from './Insert';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TestCase />} />
                <Route path="/insert" element={<Insert />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
