import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';
import Register from './Pages/Register';

function App() {

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'authToken') {
        // Handle changes in the authToken value
        const newAuthToken = event.newValue;
        console.log('Updated authToken:', newAuthToken);
        // Perform actions based on the updated authToken
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  return (
    <div className="App">
      <Register />
    </div>
  );
}

export default App;