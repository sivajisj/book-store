import { Button, Box, Heading } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Box minH={'100vh'}>
        {/* Navbar */}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/create" element={<CreatePage />} />
          {/* <Route path="/edit" element={<EditPage />} /> */}
        </Routes>
       
      </Box>
    </>
  );
}