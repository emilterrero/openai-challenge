import './App.css';
import {useState} from 'react';

const App = () => {
    const [text, setText] = useState('');
    const [prompts, setPrompts] = useState([]);
    const [fullRes, setRes] = useState({});


    const formSubmit = (e) => {
        e.preventDefault()
        try {
            fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
                method: "POST",
                headers: {
                    "Access-Controll-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                },
                body: JSON.stringify({
                    prompt: `${text}`,
                    temperature: 0.5,
                    max_tokens: 64,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                }
                ),
            }
            )
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
            setText('')

        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="App">
        <h1>Open AI App</h1>

        <div className='input-field'>

        <form onSubmit={formSubmit} id='submit-form'>
        <textarea type='text' id='input' onChange={(e) => setText(e.currentTarget.value)} value={text} />
        <button className='submit=btn' type='submit'>Submit
        </button>
        </form>

        </div>
        <div className='responses'>
        </div>

        </div>
    );
}

export default App;
