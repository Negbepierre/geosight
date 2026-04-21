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
    <div style={{ fontFamily: 'inherit', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>

      <div style={{
        borderBottom: '1px solid #eeeeee',
        padding: '16px 20px',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#111111' }}>
          GEOsight
        </h1>
        {report && (
          <button
            onClick={handleReset}
            style={{
              fontSize: '13px',
              padding: '8px 16px',
              border: '1.5px solid #dddddd',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              color: '#333333',
              fontWeight: '500'
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
        <p style={{
          textAlign: 'center',
          color: '#dc2626',
          marginTop: '20px',
          fontSize: '14px',
          padding: '0 20px'
        }}>
          {error}
        </p>
      )}

      {report && (
        <div style={{ paddingTop: '24px', paddingBottom: '40px' }}>
          <ScoreCard report={report} />
          <QueryBreakdown queryBreakdown={report.query_breakdown} />
          <ActionPlan actionPlan={report.action_plan} />
        </div>
      )}

    </div>
  )
}

export default App