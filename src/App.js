import 'antd/dist/reset.css';
import './App.css';
import { ToastContainer} from 'react-toastify';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <div className="App">
        <ToastContainer/>
        <Dashboard/>
    </div>
  );
}

export default App;
