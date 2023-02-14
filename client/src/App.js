import './App.css';
import GetTodos from './components/GetTodos';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App col-lg-8 col-md-10 col-sm-12 bg-light p-4">
      <GetTodos/>
    </div>
  );
}

export default App;
