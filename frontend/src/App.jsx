import { useState } from 'react'
import AuditForm from './components/AuditForm'
import { runAudit } from './services/api'

function App() {

  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    setReport(null)

    try {
      const data = await runAudit(formData)
      setReport(data.report)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>

      <div style={{ borderBottom: '1px solid #eee', padding: '16px 40px', backgroundColor: '#fff' }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>GEOsight</h1>
      </div>

      <AuditForm onSubmit={handleSubmit} loading={loading} />

      {error && (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      )}

      {report && (
        <pre style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontSize: '12px' }}>
          {JSON.stringify(report, null, 2)}
        </pre>
      )}

    </div>
  )
}

export default App