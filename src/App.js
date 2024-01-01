// import Spinner from 'react-spinner-material';
import Navbar from './components/Navbar/Navbar';
import AlbumList from './components/AlbumList/AlbumList';
import './App.css';

function App() {
  
  return (
    <>
      {/* <h1>App Here</h1> */}
      {/* <div className="loader">
          <Spinner radius={80} color={"blue"} stroke={5} visible={true} />
      </div> */}
      <Navbar/>
      <AlbumList/>
    </>
  );
}

export default App;
