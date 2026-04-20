function ActionPlan({ actionPlan }) {

    const priorityColors = {
      high: { bg: '#fee2e2', color: '#dc2626' },
      medium: { bg: '#fef9c3', color: '#ca8a04' },
      low: { bg: '#dcfce7', color: '#16a34a' }
    }
  
    const effortColors = {
      'quick win': { bg: '#dcfce7', color: '#16a34a' },
      'medium term': { bg: '#dbeafe', color: '#2563eb' },
      'long term': { bg: '#f3e8ff', color: '#7c3aed' }
    }
  
    return (
      <div style={styles.container}>
  
        <h3 style={styles.title}>Action Plan</h3>
        <p style={styles.subtitle}>
          What to do to improve your AI visibility
        </p>
  
        <div style={styles.list}>
          {actionPlan.map((action, index) => (
            <div key={index} style={styles.card}>
  
              <div style={styles.cardHeader}>
                <span style={styles.number}>{index + 1}</span>
                <p style={styles.actionTitle}>{action.title}</p>
                <div style={styles.badges}>
                  <span style={{
                    ...styles.badge,
                    backgroundColor: priorityColors[action.priority]?.bg || '#f3f4f6',
                    color: priorityColors[action.priority]?.color || '#333'
                  }}>
                    {action.priority}
                  </span>
                  <span style={{
                    ...styles.badge,
                    backgroundColor: effortColors[action.effort]?.bg || '#f3f4f6',
                    color: effortColors[action.effort]?.color || '#333'
                  }}>
                    {action.effort}
                  </span>
                </div>
              </div>
  
              <p style={styles.description}>{action.description}</p>
  
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
      padding: '0 20px 60px'
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
    card: {
      backgroundColor: '#fff',
      border: '1px solid #eee',
      borderRadius: '12px',
      padding: '20px'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '10px'
    },
    number: {
      width: '24px',
      height: '24px',
      backgroundColor: '#111',
      color: '#fff',
      borderRadius: '50%',
      fontSize: '12px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      marginTop: '1px'
    },
    actionTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#111',
      margin: '0',
      flex: 1
    },
    badges: {
      display: 'flex',
      gap: '6px',
      flexShrink: 0
    },
    badge: {
      fontSize: '11px',
      fontWeight: '500',
      padding: '2px 8px',
      borderRadius: '4px',
      textTransform: 'capitalize'
    },
    description: {
      fontSize: '13px',
      color: '#555',
      margin: '0 0 0 36px',
      lineHeight: '1.6'
    }
  }
  
  export default ActionPlan