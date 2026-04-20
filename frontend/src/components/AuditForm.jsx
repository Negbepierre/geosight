import { useState } from 'react'

function AuditForm({ onSubmit, loading }) {

  const [formData, setFormData] = useState({
    company_name: '',
    industry: '',
    location: '',
    use_case: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Run an AI Visibility Audit</h2>
      <p style={styles.subtitle}>
        Find out if your business appears when people ask AI assistants 
        about your industry
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>

        <div style={styles.field}>
          <label style={styles.label}>Company Name</label>
          <input
            style={styles.input}
            type="text"
            name="company_name"
            placeholder="e.g. Future"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Industry</label>
          <input
            style={styles.input}
            type="text"
            name="industry"
            placeholder="e.g. video production"
            value={formData.industry}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Location</label>
          <input
            style={styles.input}
            type="text"
            name="location"
            placeholder="e.g. London"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Primary Use Case</label>
          <input
            style={styles.input}
            type="text"
            name="use_case"
            placeholder="e.g. corporate brand films"
            value={formData.use_case}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          style={loading ? styles.buttonDisabled : styles.button}
          disabled={loading}
        >
          {loading ? 'Running Audit...' : 'Run Audit'}
        </button>

      </form>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '520px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#111'
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '32px',
    lineHeight: '1.5'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#333'
  },
  input: {
    padding: '10px 14px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    color: '#111'
  },
  button: {
    padding: '12px',
    fontSize: '15px',
    fontWeight: '500',
    backgroundColor: '#111',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '8px'
  },
  buttonDisabled: {
    padding: '12px',
    fontSize: '15px',
    fontWeight: '500',
    backgroundColor: '#999',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'not-allowed',
    marginTop: '8px'
  }
}

export default AuditForm