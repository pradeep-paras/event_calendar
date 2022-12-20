import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';

// components
import CustomCalendar from './components/CustomCalendar';
import EventCalendar from './components/EventCalendar';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <EventCalendar />
      </div>
    </Provider>
  );
}

export default App;
