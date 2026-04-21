function AuditForm({ onSubmit, loading }) {

    const [formData, setFormData] = useState({
      company_name: '',
      industry: '',
      location: '',
      use_case: ''
    })
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(formData)
    }
  
    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
  
          <div style={styles.hero}>
            <h2 style={styles.title}>AI Visibility Audit</h2>
            <p style={styles.subtitle}>
              Find out if your business appears when people ask ChatGPT, Claude,
              or Gemini about your industry
            </p>
          </div>
  
          <form onSubmit={handleSubmit} style={styles.form}>
  
            <div style={styles.field}>
              <label style={styles.label}>Company Name</label>
              <input
                style={styles.input}
                type="text"
                name="company_name"
                placeholder="e.g. British Airways"
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
                placeholder="e.g. airline"
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
                placeholder="e.g. United Kingdom"
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
                placeholder="e.g. long haul flights"
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
      </div>
    )
  }
  
  import { useState } from 'react'
  
  const styles = {
    wrapper: {
      minHeight: 'calc(100vh - 57px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px'
    },
    container: {
      width: '100%',
      maxWidth: '480px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '32px 24px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
    },
    hero: {
      marginBottom: '28px'
    },
    title: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#111111',
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: '14px',
      color: '#666666',
      lineHeight: '1.6'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '18px'
    },
    field: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    },
    label: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#333333'
    },
    input: {
      padding: '11px 14px',
      fontSize: '15px',
      border: '1.5px solid #e0e0e0',
      borderRadius: '10px',
      outline: 'none',
      color: '#111111',
      backgroundColor: '#ffffff',
      width: '100%'
    },
    button: {
      padding: '13px',
      fontSize: '15px',
      fontWeight: '600',
      backgroundColor: '#111111',
      color: '#ffffff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      marginTop: '4px',
      width: '100%'
    },
    buttonDisabled: {
      padding: '13px',
      fontSize: '15px',
      fontWeight: '600',
      backgroundColor: '#999999',
      color: '#ffffff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'not-allowed',
      marginTop: '4px',
      width: '100%'
    }
  }
  
  export default AuditForm