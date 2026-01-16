import { useState } from 'react';

const BLOCKS = [
  {
    id: 1,
    title: 'Contesto',
    question: 'Perché stai decidendo adesso?',
    options: [
      { label: 'Non è urgente', score: 0 },
      { label: 'È utile ma non decisivo', score: 1 },
      { label: 'È urgente e va deciso', score: 2 },
    ],
  },
  {
    id: 2,
    title: 'Dati',
    question: 'Quanto sono solidi i dati che hai?',
    options: [
      { label: 'Sono incompleti', score: 0 },
      { label: 'Sono sufficienti', score: 1 },
      { label: 'Sono verificati', score: 2 },
    ],
  },
  {
    id: 3,
    title: 'Alternative',
    question: 'Hai alternative reali pronte?',
    options: [
      { label: 'No', score: 0 },
      { label: 'Sì, ma vaghe', score: 1 },
      { label: 'Sì, comparabili', score: 2 },
    ],
  },
  {
    id: 4,
    title: 'Vincoli',
    question: 'I vincoli principali sono chiari?',
    options: [
      { label: 'No', score: 0 },
      { label: 'Parzialmente', score: 1 },
      { label: 'Sì, definiti', score: 2 },
    ],
  },
  {
    id: 5,
    title: 'Rischio',
    question: 'Qual è il costo di una decisione sbagliata?',
    options: [
      { label: 'Basso', score: 0 },
      { label: 'Medio', score: 1 },
      { label: 'Alto', score: 2 },
    ],
  },
  {
    id: 6,
    title: 'Azione',
    question: 'Se il verdetto fosse "procedere", cosa faresti entro 7 giorni?',
    options: [
      { label: 'Nulla di concreto', score: 0 },
      { label: "Un'azione sola", score: 1 },
      { label: 'Un piano chiaro', score: 2 },
    ],
  },
];

const VERDICTS = {
  low: {
    label: 'NON PROCEDERE',
    motivation: [
      'I presupposti attuali non supportano una decisione informata.',
      'Il rischio di errore supera il vantaggio di agire ora.',
      'Meglio raccogliere più elementi prima di procedere.',
    ],
    next: [
      'Rivedi i dati mancanti e le alternative disponibili.',
      'Ripeti la valutazione quando il quadro sarà più chiaro.',
    ],
  },
  mid: {
    label: 'PROCEDERE CON RISERVA',
    motivation: [
      'Alcuni elementi sono presenti, altri restano incerti.',
      'È possibile procedere, ma con attenzione ai punti deboli.',
      'Monitorare gli sviluppi prima di impegnarsi del tutto.',
    ],
    next: [
      'Identifica le aree di incertezza residua.',
      'Definisci un punto di controllo entro 14 giorni.',
    ],
  },
  high: {
    label: 'PROCEDERE',
    motivation: [
      'Il quadro decisionale è sufficientemente solido.',
      'I rischi sono noti e gestibili.',
      "Le condizioni supportano un'azione concreta.",
    ],
    next: [
      "Avvia l'azione pianificata entro 7 giorni.",
      "Documenta l'esito per valutazioni future.",
    ],
  },
};

function getVerdict(total) {
  if (total <= 4) return VERDICTS.low;
  if (total <= 8) return VERDICTS.mid;
  return VERDICTS.high;
}

export default function App() {
  const [currentBlock, setCurrentBlock] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showVerdict, setShowVerdict] = useState(false);

  const handleSelect = (blockId, score) => {
    setAnswers((prev) => ({ ...prev, [blockId]: score }));
  };

  const canAdvance = answers[BLOCKS[currentBlock]?.id] !== undefined;

  const handleNext = () => {
    if (!canAdvance) return;
    if (currentBlock < BLOCKS.length - 1) {
      setCurrentBlock((prev) => prev + 1);
    } else {
      setShowVerdict(true);
    }
  };

  const handleBack = () => {
    if (currentBlock > 0) {
      setCurrentBlock((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentBlock(0);
    setAnswers({});
    setShowVerdict(false);
  };

  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const verdict = getVerdict(totalScore);

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#fff',
      color: '#000',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '2rem',
      borderBottom: '1px solid #000',
      paddingBottom: '1rem',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 700,
      marginBottom: '0.5rem',
      letterSpacing: '0.05em',
    },
    motto: {
      fontSize: '0.875rem',
      color: '#666',
    },
    progress: {
      fontSize: '0.75rem',
      color: '#666',
      marginBottom: '1.5rem',
    },
    blockTitle: {
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '0.5rem',
      color: '#666',
    },
    question: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '1.5rem',
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginBottom: '2rem',
    },
    option: {
      padding: '1rem',
      border: '1px solid #000',
      cursor: 'pointer',
      transition: 'background 0.15s',
    },
    optionSelected: {
      background: '#000',
      color: '#fff',
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
    },
    button: {
      padding: '0.75rem 1.5rem',
      border: '1px solid #000',
      background: '#fff',
      color: '#000',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    buttonPrimary: {
      background: '#000',
      color: '#fff',
    },
    buttonDisabled: {
      opacity: 0.3,
      cursor: 'not-allowed',
    },
    verdictContainer: {
      textAlign: 'center',
    },
    verdictLabel: {
      fontSize: '1.5rem',
      fontWeight: 700,
      marginBottom: '2rem',
      padding: '1rem',
      border: '2px solid #000',
    },
    verdictSection: {
      textAlign: 'left',
      marginBottom: '2rem',
    },
    verdictSectionTitle: {
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '0.75rem',
      color: '#666',
    },
    verdictText: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      marginBottom: '0.5rem',
    },
    verdictList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    verdictListItem: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      marginBottom: '0.5rem',
      paddingLeft: '1rem',
      position: 'relative',
    },
  };

  if (showVerdict) {
    return (
      <main style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>PRIMA DEL MERCATO</h1>
          <p style={styles.motto}>
            Métron non mette in contatto. Valuta prima se il contatto ha senso.
          </p>
        </header>

        <div style={styles.verdictContainer}>
          <div style={styles.verdictLabel}>{verdict.label}</div>

          <div style={styles.verdictSection}>
            <h2 style={styles.verdictSectionTitle}>Motivazione</h2>
            {verdict.motivation.map((line, i) => (
              <p key={i} style={styles.verdictText}>
                {line}
              </p>
            ))}
          </div>

          <div style={styles.verdictSection}>
            <h2 style={styles.verdictSectionTitle}>Cosa succede ora</h2>
            <ul style={styles.verdictList}>
              {verdict.next.map((item, i) => (
                <li key={i} style={styles.verdictListItem}>
                  — {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            style={{ ...styles.button, ...styles.buttonPrimary }}
            onClick={handleReset}
          >
            Chiudi
          </button>
        </div>
      </main>
    );
  }

  const block = BLOCKS[currentBlock];
  const selectedScore = answers[block.id];

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>PRIMA DEL MERCATO</h1>
        <p style={styles.motto}>
          Métron non mette in contatto. Valuta prima se il contatto ha senso.
        </p>
      </header>

      <p style={styles.progress}>
        Blocco {block.id} di {BLOCKS.length}
      </p>

      <h2 style={styles.blockTitle}>{block.title}</h2>
      <p style={styles.question}>{block.question}</p>

      <div style={styles.optionsContainer}>
        {block.options.map((opt, i) => (
          <div
            key={i}
            style={{
              ...styles.option,
              ...(selectedScore === opt.score ? styles.optionSelected : {}),
            }}
            onClick={() => handleSelect(block.id, opt.score)}
          >
            {opt.label}
          </div>
        ))}
      </div>

      <div style={styles.buttonContainer}>
        {currentBlock > 0 && (
          <button style={styles.button} onClick={handleBack}>
            Indietro
          </button>
        )}
        <button
          style={{
            ...styles.button,
            ...styles.buttonPrimary,
            ...(!canAdvance ? styles.buttonDisabled : {}),
          }}
          onClick={handleNext}
          disabled={!canAdvance}
        >
          {currentBlock === BLOCKS.length - 1 ? 'Vedi verdetto' : 'Avanti'}
        </button>
      </div>
    </main>
  );
}
