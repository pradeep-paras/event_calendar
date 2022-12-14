import logo from './logo.svg';
import './App.css';

// components
import CustomCalendar from './components/CustomCalendar';
import EventCalendar from './components/EventCalendar';

function App() {
  return (
    <div className="App">
      {/* <CustomCalendar /> */}
      <EventCalendar />
    </div>
  );
}

export default App;
