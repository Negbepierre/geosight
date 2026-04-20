import { useState } from 'react'
import AuditForm from './components/AuditForm'
import ScoreCard from './components/ScoreCard'
import QueryBreakdown from './components/QueryBreakdown'
import ActionPlan from './components/ActionPlan'
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

  const handleReset = () => {
    setReport(null)
    setError(null)
  }

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>

      <div style={{
        borderBottom: '1px solid #eee',
        padding: '16px 40px',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>GEOsight</h1>
        {report && (
          <button
            onClick={handleReset}
            style={{
              fontSize: '13px',
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#fff',
              cursor: 'pointer',
              color: '#333'
            }}
          >
            New Audit
          </button>
        )}
      </div>

      {!report && (
        <AuditForm onSubmit={handleSubmit} loading={loading} />
      )}

      {error && (
        <p style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
          {error}
        </p>
      )}

      {report && (
        <div style={{ paddingTop: '32px' }}>
          <ScoreCard report={report} />
          <QueryBreakdown queryBreakdown={report.query_breakdown} />
          <ActionPlan actionPlan={report.action_plan} />
        </div>
      )}

    </div>
  )
}

export default App