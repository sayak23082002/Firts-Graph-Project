import { useState, useEffect } from 'react'
import { createClient } from 'urql';
import './App.css'

function App() {

  const [tokens, setTokens] = useState([]);

  const QueryURL = `https://gateway.thegraph.com/api/${import.meta.env.VITE_SUBGRAPH}/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7`;

  const query = `{
    tokens(first: 5) {
      id
      name
      symbol
      decimals
    }
  }`;

  const client = createClient({url: QueryURL});

  useEffect(() => {
    const getTokens = async () => {
      const {data} = await client.query(query).toPromise();
      setTokens(data.tokens);
    }
    getTokens()
  }, [])

  return (
    <>
      Toekns Info: {
        tokens !== null && tokens.length > 0 && tokens.map((token) =>{
          return(
            <div>
              <div>{token.id},</div>
              <div>{token.name}</div>
              <div>{token.symbol},</div>
              <div>{token.decimals}</div>
            </div>
          )
        })
      }
    </>
  )
}

export default App

//229ebc65d935c41ea1f3b07733caae59