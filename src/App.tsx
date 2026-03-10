import './styling.css'
import { useState, useEffect } from "react"
import { uppercase_exist, special_exist, minimum_8, greek_exist,
  country_exist, video_exist, remapKeys, contain_dev, spreadFire,
  number_exist } from "../lib/rules"
import { get_country_url } from "./utils"
const fullTitle = 'Open Sesamee'
const fullSubtitle = 'a game not at all inspired by The Password Game'
const fullLabel = 'Please enter your password:'

type Rule = {
  fn: (str: string) => boolean
  description: string
  showMap?: boolean
  finalRule?: boolean
}

export default function App() {  
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  
  const [label, setLabel] = useState('')
  const [password, setPassword] = useState('')
  const [typingDone, setTypingDone] = useState(false)

  const [onFire, setOnFire] = useState(false)
  const [fireDone, setFireDone] = useState(false)
  
  const [country, setCountry] = useState('')
  const [mapUrl, setMapUrl] = useState('')

  const [videoValid, setVideoValid] = useState(false)

  const [RulesFinished, setRulesFinished] = useState(1)

  // an array for each rules function and the description that appears in
  // the rules box on the site.
  const ruleDisplay: Rule[] = [
  { fn: minimum_8, description: 'Must be at least 8 characters' },
  { fn: uppercase_exist, description: 'Must contain an uppercase letter' },
  { fn: number_exist, description: 'Must contain a number'},
  { fn: special_exist, description: 'Must contain a special character' },
  { fn: greek_exist, description: 'Must contain a Greek letter' },
  { fn: (str: string) => country_exist(str, country), description: 'which of these countries is this map from? Brazil, Canada, Egypt, Japan, Sweden', showMap: true},
  { fn: contain_dev, description: 'Who do you like more? Felix, Isak, or Isaac?'},
  { fn: (_: string) => videoValid, description: 'Enter a youtube video link of 15 seconds at the end'},
  { fn: (_: string) => true, description: 'Your password is strong enough Well done!', finalRule: true }]

  // uses the video_exist function to check if the youtube link is valid
  // and is as long as we request.
  useEffect(() => {
  video_exist(password, 15).then(result => setVideoValid(result))
  }, [password])

  // randomizes which of the countries from the countries array that 
  // the map generates.
  useEffect(() => {
  const countries = ['Sweden', 'Brazil', 'Japan', 'Egypt', 'Canada']
  const picked = countries[Math.floor(Math.random() * countries.length)]!
  setCountry(picked)
  get_country_url(picked).then(url => setMapUrl(url))
  }, [])

  // takes out the rule function from ruleDisplay.
  // also checks if all rules up till the amount of rules finished are correct.
  useEffect(() => {
    const rules = ruleDisplay.map(rule => rule.fn)
    let identifier = true
    for (let i = 0; i < RulesFinished && i < rules.length; i++) {
      if (!rules[i]!(password)) {
        identifier = false
        break
      }
    }
    if (identifier && RulesFinished <= rules.length) {
      setRulesFinished(RulesFinished + 1)
    }
  }, [password, RulesFinished])

  // creates the typing animation for the text when site is launched and
  // keeps everything else invisible until the animation is done.
  useEffect(() => {
    const texts = [
      { set: setTitle, text: fullTitle, speed: 150 },
      { set: setSubtitle, text: fullSubtitle, speed: 75 },
      { set: setLabel, text: fullLabel, speed: 50 },
    ]
    function typeText(index: number) {
      if (index >= texts.length) return
      const { set, text, speed } = texts[index]!
      let i = 0
      const interval = setInterval(() => {
        if (i < text.length) {
          set(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          typeText(index + 1)
          if (index === 2) {
            setTypingDone(true)
          }
        }
      }, speed)
    }
    typeText(0)
  }, [])

  // triggers remapKeys when the 5th rule is completed.
  useEffect(() => {
    if (RulesFinished === 5) {
    setPassword(prev => remapKeys(prev))
    }
  }, [RulesFinished])

  // triggers the spreadFire rule when the 6th rule is completed and
  // if the fire hasnt been already done before.
  useEffect(() => {
    console.log('RulesFinished:', RulesFinished, 'fireDone:', fireDone)
    if (RulesFinished === 6 && !fireDone) {
      console.log('fire should start!')
      setOnFire(true)
      setPassword(prev => spreadFire(prev))
      setFireDone(true)
    }
  }, [RulesFinished])

  // uses the spreadFire function to spread the fire, and stops once the
  // fire has been put
  useEffect(() => {
    if (!onFire) return
    const interval = setInterval(() => {
      setPassword(prev => {
        setFireDone(false)
        if (prev.length === 0 || !prev.includes('🔥')) {
          clearInterval(interval)
          setOnFire(false)
          return prev
        }
        return spreadFire(prev)
      })
    }, 1000);
    return () => clearInterval(interval)
  }, [onFire])

  return (
    <div 
    style={{
      background: 'linear-gradient(to bottom, #e3b4e5, #1c0f24)',
      minHeight: '100vh'
      }}>
      <div style={{ textAlign: 'center' }}>
        <h1 id="gameTitle">
          {title}
        </h1>
        <p id="gameSubtitle">
          {subtitle}
        </p >

        <label
        id="passwordLabel"
        htmlFor="typearea">{label}</label><br />
          <textarea 
            id="typeArea"
            rows={1}
            value={password}
            onChange={(typing) => setPassword(typing.target.value)}
            style={{
              opacity: typingDone ? 1: 0,
              transition: 'opacity 0.75s ease-in'
            }}
            onInput={(event) => {
              const el = event.target as HTMLTextAreaElement
              el.style.height = 'auto'
              el.style.height = Math.max(el.scrollHeight, el.offsetHeight) + 'px'
            }}
          />
        </div>
        <div
          id='ruleField'
          style={{
          opacity: typingDone ? 1: 0
          }}>
        {ruleDisplay.slice(0, RulesFinished).reverse().map((rule) => (
        <div key={rule.description}>
          {rule.showMap && mapUrl && (
            <img src={mapUrl} alt="Guess the country" style={{ width: '300px', borderRadius: '8px', marginBottom: '8px' }} />
          )}
          <p className="ruleItem" style={{ 
            color: rule.finalRule ? '#3f2e5b' : rule.fn(password) ? 'green' : 'red',
            border: rule.finalRule ? '5px solid #3f2e5b' : rule.fn(password) ? '5px solid green' : '5px solid red',
            backgroundColor: rule.finalRule? '#e3b4e5' : rule.fn(password) ? '#9FFF96' : '#FFA696',
          }}>
            {rule.description}
          </p>
        </div>
        ))}
      </div>
    </div>
  )
}