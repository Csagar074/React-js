import { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  const [sourceLang, setSourceLang] = useState<string>("en");
  const [targetLang, setTargetLang] = useState<string>("es");

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "hi", name: "Hindi" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" }
  ];

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInput(output);
    setOutput(input);
  };

  const translateText = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post("https://deep-translate1.p.rapidapi.com/language/translate/v2",
        { q: input, source: sourceLang, target: targetLang },
        {
          headers: {
            "x-rapidapi-key": "b3717b74e3msh4264333bfc24c44p1e7809jsna2db0a915c11", 
            "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
            "Content-Type": "application/json"
          }   
        }
      );
      setOutput(response.data.data.translations.translatedText);
    } catch (error) {
      setOutput("Error: API limit reached or invalid key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.card}>
        <h1 style={styles.title}>GlobeTalk <span style={{fontSize: '0.6em', fontWeight: 300, color: '#ffcc00'}}>Translator</span></h1>
        
        <div style={styles.controls}>
          <select 
            style={styles.select}
            value={sourceLang} 
            onChange={(e) => setSourceLang(e.target.value)}
          >
            {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
          </select>

          <button onClick={swapLanguages} style={styles.swapBtn} title="Swap Languages">
            ⇄
          </button>

          <select 
            style={styles.select}
            value={targetLang} 
            onChange={(e) => setTargetLang(e.target.value)}
          >
            {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <textarea 
            placeholder="Type text to translate..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            style={styles.textarea}
          />
          
          <div style={styles.divider}></div>

          <div style={{position: 'relative'}}>
            <textarea 
              placeholder="Translation will appear here..." 
              value={output} 
              readOnly 
              style={{...styles.textarea, ...styles.outputArea}}
            />
            {loading && <div style={styles.loaderOverlay}>Translating...</div>}
          </div>
        </div>

        <button 
          onClick={translateText} 
          disabled={loading || !input} 
          style={{
            ...styles.translateBtn, 
            opacity: (loading || !input) ? 0.6 : 1,
            cursor: (loading || !input) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? "Processing..." : "Translate Now"}
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundImage: `url('https://picjumbo.com/wp-content/uploads/oil-painting-of-a-beach-with-palm-trees-at-sunset-free-photo.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // इमेज को थोड़ा डार्क करने के लिए ताकि टेक्स्ट दिखे
    zIndex: 1,
  },
  card: {
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glassmorphism प्रभाव
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    width: '100%',
    maxWidth: '700px',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
    padding: '40px',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '2.5rem',
    textShadow: '2px 2px 10px rgba(0,0,0,0.5)',
    marginTop: 0,
    marginBottom: '30px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '25px',
    gap: '15px'
  },
  select: {
    flex: 1,
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.4)',
    fontSize: '16px',
    outline: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#333',
    fontWeight: '600',
  },
  swapBtn: {
    padding: '10px',
    fontSize: '24px',
    border: 'none',
    backgroundColor: 'rgba(255, 204, 0, 0.9)',
    color: '#000',
    cursor: 'pointer',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '25px'
  },
  textarea: {
    width: '100%',
    height: '160px',
    padding: '20px',
    borderRadius: '18px',
    border: '1px solid rgba(255,255,255,0.2)',
    fontSize: '18px',
    resize: 'none',
    boxSizing: 'border-box',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#1a1a1a',
    boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)',
  },
  outputArea: {
    backgroundColor: 'rgba(240, 240, 240, 0.9)',
    color: '#000',
    fontWeight: '500',
  },
  divider: {
    height: '2px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    margin: '5px 0'
  },
  translateBtn: {
    width: '100%',
    padding: '18px',
    backgroundColor: '#ffcc00',
    color: '#000',
    border: 'none',
    borderRadius: '14px',
    fontSize: '20px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    transition: 'all 0.2s',
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '18px',
    color: '#ff6600',
    fontWeight: 'bold',
    fontSize: '20px'
  }
};

export default App;