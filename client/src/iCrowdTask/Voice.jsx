import React, { useState, useEffect } from 'react'
import './CrowdTask.css'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const speechRecongition = new SpeechRecognition()

speechRecongition.continuous = true
speechRecongition.interimResults = true
speechRecongition.lang = 'en-US'

function App() {

    const date = new Date().toTimeString()
    const [Listening, setListening] = useState(false)
    const [text, setText] = useState(null)
    const [time, setTime] = useState([])

    const [savedTexts, setSavedTexts] = useState([])

    useEffect(() => {
        handleListen()
    },
        [Listening])

    const handleListen = () => {
        if (Listening) {
            speechRecongition.start()
            speechRecongition.onend = () => {
                console.log('recording')
                speechRecongition.start()
            }
        } else {
            speechRecongition.stop()
            speechRecongition.onend = () => {
                console.log('Stopped speechRecongition on Click')
            }
        }
        speechRecongition.onstart = () => {
            console.log('speechRecongitions on')
        }

        speechRecongition.onresult = (e) => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
            console.log(transcript)
            setText(transcript)
            speechRecongition.onerror = (e) => {
                console.log(e.error)
            }
        }
    }

    const handleSaveText = () => {
        setSavedTexts([...savedTexts, text])
        setTime([...time, date])
        //Clear the recording area
        setText('  ')
        // setTime(date)
    }
    const handleSaving = (e) => {
        console.log(savedTexts.length, 123, text)
        const length = savedTexts.length
        fetch('http://localhost:5000/text', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                text: savedTexts[length - 1],
                time: time[length - 1]
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => {
                console.log("Error:" + err)
            })
    }

    return (
        <div className='Voice'>


            <button onClick={() => setListening(prevState => !prevState)}>
                Start or Stop
          </button>
            <button onClick={handleSaveText} disabled={!text}>
                Finish
          </button>
            <div className='record_status'>
                {Listening ? <p>Recording</p> : <p>Waiting</p>}
            </div>
            <p>{text}</p>
            <br />
            <div className='record_status'>
                <p>Texts below</p>
            </div>
            <br />
            {savedTexts.map(sentence => (
                <p value={sentence}>{sentence}</p>
            ))}
            {/* <p>{savedTexts}-{time}</p> */}
            <button onClick={handleSaving}>Save texts</button>
        </div>
    )
}

export default App
