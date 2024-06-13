import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import TodoPage from "./pages/TodoPage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home sendUser={setUser} />} />
        <Route path="/tasks/" element={<TodoPage user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;