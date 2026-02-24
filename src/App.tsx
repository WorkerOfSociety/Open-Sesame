import { useState } from "react"

export default function App() {
  const [password, setPassword] = useState('') 

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #e3b4e5, #1c0f24)'
      }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
           color: '#3f2e5b',
           paddingTop: '10vh',
           fontSize: '60px', 
           fontFamily : 'Georgia, serif'
           }}>
            Open Sesamee
        </h1>
        <p style={{
           color: '#3f2e5b',
           marginTop: '-2vh',
           fontSize: '30px',
           fontFamily: 'Georgia, serif',
           paddingBottom: '3vh' 
           }}>
            a game not at all inspired by The Password Game
        </p >
        <label
        style={{
          paddingRight: '25vh',
          color: '#1c0f24',
          fontFamily: 'Georgia, serif',
          fontSize: '25px',
          marginBottom: '-8px',
          display: 'block'
        }} 
        htmlFor="typearea">Please enter your password:</label><br />
          <textarea 
            id="typearea"
            rows={1}
            value={password} 
            onChange={(typing) => setPassword(typing.target.value)}
            style={{

              minHeight: '30px',
              paddingTop: '5px',
              paddingBottom: '5px',
              paddingLeft: '5px',
              paddingRight: '5px',
              resize: 'none',
              overflow: 'hidden',
              width: '49vh',
              fontSize: '25px',
              border: '5px solid #1c0f24',
              borderRadius: '8px',
              boxSizing: 'border-box'
            }}
            onInput={(event) => {
              const el = event.target as HTMLTextAreaElement
              el.style.height = 'auto'
              el.style.height = el.scrollHeight + 'px'
            }}
          />
      </div>
    </div>
  )
}