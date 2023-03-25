import axios from 'axios';


function App() {
  return (
   <button onClick={()=>{
     axios({
      url: `http://localhost:3000/api/products/get`,
      method: 'GET'
    });
   }}>asd</button>
  );
}

export default App;
