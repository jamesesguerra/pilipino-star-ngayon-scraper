import { useState } from 'react';
import './App.css';
import { ExportToCsv } from 'export-to-csv';
import axios from 'axios';
import './App.css';

const App = () => {
  const [articleData, setArticleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('bansa');
  const [numOfPages, setNumOfPages] = useState(0);

  const fetchData = async() => {
    setIsLoading(true);
    const url = `https://powerful-wave-68939.herokuapp.com/api/articles?category=${category}&pages=${numOfPages}`;
    const response = await axios.get(url);
    await setArticleData(response.data);
    setIsLoading(false);
  }

  const downloadCSV = () => {
    const options = {
      fieldSeparator: ',',
      filename: `PSN-${category}`,
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      title: `PSN-${category}`,
      useTextFile: false,
      useBom: false,
      headers: ['title', 'article_text', 'article_date', 'source']
    }

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(articleData);
  }

  return(
    <div className='App'>
      <div>
        <h1>Pilipino Star Ngayon</h1>
        {isLoading !== true || <p>fetching...</p>}
        <h2>Category: <span style={{color: 'red'}}>{category}</span></h2>
        <button onClick={() => setCategory('bansa')}>Bansa</button>
        <button onClick={() => setCategory('metro')}>Metro</button>
        <button onClick={() => setCategory('probinsiya')}>Probinsiya</button>
        <button onClick={() => setCategory('opinyon')}>Opinyon</button>
        <button onClick={() => setCategory('palaro')}>Palaro</button>
      </div>
      <div>
        <h2>Num of pages to fetch:</h2>
        <input type='text' value={numOfPages} onChange={(e) => setNumOfPages(e.target.value)} />
      </div>
      <div>
        <button onClick={fetchData}>Fetch data</button>
        <button onClick={downloadCSV}>Download CSV</button>
      </div>
    </div>
  )
}

export default App;
