function QueryBreakdown({ queryBreakdown }) {
    return (
      <div style={styles.container}>
  
        <h3 style={styles.title}>Query Results</h3>
        <p style={styles.subtitle}>
          How each AI model responded to queries about your industry
        </p>
  
        <div style={styles.list}>
          {queryBreakdown.map((item, index) => (
            <div key={index} style={styles.queryCard}>
  
              <p style={styles.queryText}>{item.query}</p>
  
              <div style={styles.modelRow}>
                {item.results.map((result, i) => (
                  <div key={i} style={styles.modelResult}>
                    <span style={styles.modelName}>{result.model}</span>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: result.mentioned ? '#dcfce7' : '#fee2e2',
                      color: result.mentioned ? '#16a34a' : '#dc2626'
                    }}>
                      {result.mentioned ? 'Mentioned' : 'Not mentioned'}
                    </span>
                    {result.mentioned && (
                      <span style={styles.position}>
                        {result.position} • {result.sentiment}
                      </span>
                    )}
                  </div>
                ))}
              </div>
  
            </div>
          ))}
        </div>
  
      </div>
    )
  }
  
  const styles = {
    container: {
      maxWidth: '720px',
      margin: '0 auto',
      padding: '0 20px 40px'
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      margin: '0 0 4px',
      color: '#111'
    },
    subtitle: {
      fontSize: '13px',
      color: '#666',
      margin: '0 0 20px'
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    queryCard: {
      backgroundColor: '#fff',
      border: '1px solid #eee',
      borderRadius: '12px',
      padding: '16px 20px'
    },
    queryText: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#111',
      margin: '0 0 12px'
    },
    modelRow: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    },
    modelResult: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    modelName: {
      fontSize: '12px',
      color: '#666',
      textTransform: 'capitalize',
      width: '64px'
    },
    badge: {
      fontSize: '11px',
      fontWeight: '500',
      padding: '2px 8px',
      borderRadius: '4px'
    },
    position: {
      fontSize: '11px',
      color: '#999',
      textTransform: 'capitalize'
    }
  }
  
  export default QueryBreakdown