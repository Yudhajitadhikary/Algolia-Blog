import './App.css';
import { useState, useEffect } from 'react'
import { getAlgoliaResults,getAlgoliaSearchResults } from './adapter/algolia.adapter';

function App() {
  const [data,setData] = useState([]);
  const[loading,setLoading]=useState(true);
  const [inputQuery,setInputQuery]=useState('');
  useEffect(() => {
    const loadData = async () => {

        // Till the data is fetch using API 
        // the Loading page will show.
        setLoading(true);

        // Await make wait until that 
        // promise settles and return its result
        const data = await getAlgoliaResults()

        // After fetching data stored it in posts state.
        setData(data);

        // Closed the loading page
        setLoading(false);
    }

    // Call the function
    loadData();
}, []);
const searchResult= async()=>{
setLoading(true)
const data= await getAlgoliaSearchResults({},inputQuery)
setData(data)
document.getElementById('search').value=''
setLoading(false)
}
const handleSort=async(name)=>{
  setLoading(true);
const sortedData=await getAlgoliaResults({},name)
setData(sortedData)
setLoading(false)

}
const handleInputChange= event=>{
  const {value}=event.target
  const searchValue=value
  setInputQuery(searchValue)
}
const SelectProduct1 = async(request)=>{
  setLoading(true);
  const dataSorted=await getAlgoliaResults({
facets:[
  "*","facetCollection"
],
facetFilters:[
`facetCollection:${request}`
]
  })
  setData(dataSorted);
  setLoading(false);
}

  return (
    <div className="App">
      <h1>Product Listing:</h1>
      <div style={{display:'flex'}}>
        <h5>ALGOLIA SEARCH:</h5>
      <input id='search' style={{width: '240px',margin:'0px 286px 0px 476px'}} type="text" value={inputQuery} onChange={e=>handleInputChange(e)} placeholder='Search...'/>
      <button onClick={()=>searchResult()}>Search</button>
      </div>
      <div style={{display:'flex'}}>
        <h5>ALGOLIA FILTER:</h5>
      <button onClick={()=>SelectProduct1('Shirt')} style={{margin:'0px 0px 0px 100px',width:'100px'}}>Shirt</button>
      <button onClick={()=>SelectProduct1('Sneaker')} style={{margin:'0px 0px 0px 100px',width:'100px'}}>Sneaker</button>
      <button onClick={()=>SelectProduct1('Bag')} style={{margin:'0px 0px 0px 100px',width:'100px'}}>Bag</button>
      <button onClick={()=>SelectProduct1('Watch')} style={{margin:'0px 0px 0px 100px',width:'100px'}}>Watch</button>
      <button onClick={()=>SelectProduct1('Kefiah')} style={{margin:'0px 0px 0px 100px',width:'100px'}}>Kefiah</button>
      <button onClick={()=>SelectProduct1('All')} style={{margin:'0px 0px 0px 100px',width:'100px'}}>All</button>
      </div>
      <div>
      <div style={{display:'flex'}}>
        <h5>ALGOLIA SORT:</h5>
        <div>
          <button onClick={()=>handleSort('name')} style={{margin:'0px 0px 0px 100px',width:'100px'}}>A-Z</button>
          <button onClick={()=>handleSort('price')} style={{margin:'0px 0px 0px 100px'}}>Highest-Lowest Price</button>
        </div>

      </div>
      </div>

      {!loading ? <div>
      {data.hits.map((element,key)=>{
        return(
          <div>
            <img src={element.image} style={{height:'400px',width:'400px'}}/>
            <h5>
            Name:{element.name}
            </h5>
              <h6>
              Price:{element.price}
              </h6>
            </div>
        )
      
      })}</div>:''}
    </div>
  );
}

export default App;
