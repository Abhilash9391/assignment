import { useEffect } from 'react';
import { nameAtom, fetchedatom } from './assets/atoms.js';
import './App.css';
import { useRecoilState, useRecoilValue, useSetRecoilState ,RecoilRoot} from 'recoil';

function App() {
  

  return (
    <>
    <RecoilRoot>
      <Inputname />
      <Gitcard />
      <Fetching/>
      </RecoilRoot>
    </>
  );
}
function Fetching(){
  const [name, setname] = useRecoilState(nameAtom);
  const [fetcheddata, setfetcheddata] = useRecoilState(fetchedatom);

  useEffect(() => {
    if (name) {
      fetch(`https://api.github.com/users/${name}`)
        .then(async (res) => {
          if (!res.ok) throw new Error('User not found');
          const jsoninfo = await res.json();
          setfetcheddata(jsoninfo);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setfetcheddata(null); 
        });
    }
  }, [name, setfetcheddata]);

}


function Inputname() {
  const setname = useSetRecoilState(nameAtom);
  
  return (
    <>
      <input
        type="text"
        placeholder="Enter GitHub username"
        onChange={(e) => setname(e.target.value)}
      />
    </>
  );
}

function Gitcard() {
  const fetcheddata = useRecoilValue(fetchedatom);

  if (!fetcheddata) {
    return <p>No data available or user not found.</p>;
  }

  return (
    <div>
      <h3>Username: {fetcheddata.login}</h3>
      <img src={fetcheddata.avatar_url} alt="Avatar" width={100} />
      <p>Location: {fetcheddata.location}</p>
      <p>Followers: {fetcheddata.followers}</p>
      
    </div>
  );
}
export default App;