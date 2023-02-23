import {ConfigProvider} from 'antd';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ConfigProvider>
        <Dashboard/>
    </ConfigProvider>
  );
}

export default App;
