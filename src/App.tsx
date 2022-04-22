import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './components/Profile'
import CreatePlaylist from './components/CreatePlaylist'
import Auth from "./components/Auth";
import { RootStateOrAny,useSelector } from "react-redux";
import MyPlaylist from "./components/MyPlaylist";

const App = ():JSX.Element => {
  const isAuth:boolean = useSelector((state:RootStateOrAny)=>state.auth.isAuth);
  return (
    <div className="App" data-testid="App">
      <Router>
      <Routes>
          {isAuth ? (
            <>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/my-playlist" element={<MyPlaylist/>}/>
            <Route path="/create-playlist" element={<CreatePlaylist/>}/>
            </>
          ) : (
            <Route path="/" element={<Auth />} />
          )}
          <Route path="/" element={<Auth />} />
          <Route path="*" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
