import { useEffect, useState } from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'

function App() {
  const [ pronouncements, setPronouncements ] = useState([])
  const [ pronounce, setPronounce ] = useState()
  const [ audio, setAudio ] = useState()
  const [ inputValue, setInputValue ] = useState('')


  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl} = useReactMediaRecorder({audio: true })

  const savePronounce = () => {
    const pronounceData = {
      audio,
      name: inputValue
    }

    setPronouncements(p => [...p, pronounceData])
    setInputValue('')
    setAudio(null)
    clearBlobUrl()
  }

  useEffect(() => {
    if(mediaBlobUrl) setAudio(mediaBlobUrl)
  }, [mediaBlobUrl])


  const onRecord = () => {
   
      if(status === 'recording') stopRecording()
      else startRecording()
  }

  const onLoad = (e) => {
    setPronounce(e.name)
    setAudio(e.audio)
  }

  return (
    <div className="App">
      <div>
        <input onChange={e => setInputValue(e.target.value)} value={inputValue}></input>
        <button onClick={() => savePronounce()}>save</button>
        <audio src={audio} controls/>

        <button onClick={onRecord} >{status === 'recording' ? 'stop' : 'start'}</button>
      </div>
      { pronouncements.map(e => 
        <div>{e.name} <button onClick={() => onLoad(e)}>load</button></div> 
      )}
    </div>
  );
}

export default App;
