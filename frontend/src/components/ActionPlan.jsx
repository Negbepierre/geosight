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
        <p style={styles.subtitle}>What to do to improve your AI visibility</p>
  
        <div style={styles.list}>
          {actionPlan.map((action, index) => (
            <div key={index} style={styles.card}>
  
              <div style={styles.cardHeader}>
                <div style={styles.number}>{index + 1}</div>
                <p style={styles.actionTitle}>{action.title}</p>
              </div>
  
              <div style={styles.badges}>
                <span style={{
                  ...styles.badge,
                  backgroundColor: priorityColors[action.priority]?.bg || '#f3f4f6',
                  color: priorityColors[action.priority]?.color || '#333333'
                }}>
                  {action.priority}
                </span>
                <span style={{
                  ...styles.badge,
                  backgroundColor: effortColors[action.effort]?.bg || '#f3f4f6',
                  color: effortColors[action.effort]?.color || '#333333'
                }}>
                  {action.effort}
                </span>
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
      maxWidth: '680px',
      margin: '0 auto',
      padding: '0 16px 60px'
    },
    title: {
      fontSize: '18px',
      fontWeight: '700',
      margin: '0 0 4px',
      color: '#111111'
    },
    subtitle: {
      fontSize: '13px',
      color: '#888888',
      margin: '0 0 16px'
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    card: {
      backgroundColor: '#ffffff',
      border: '1px solid #eeeeee',
      borderRadius: '12px',
      padding: '18px 16px'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      marginBottom: '8px'
    },
    number: {
      width: '22px',
      height: '22px',
      minWidth: '22px',
      backgroundColor: '#111111',
      color: '#ffffff',
      borderRadius: '50%',
      fontSize: '11px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1px'
    },
    actionTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#111111',
      margin: '0',
      lineHeight: '1.4'
    },
    badges: {
      display: 'flex',
      gap: '6px',
      marginBottom: '10px',
      flexWrap: 'wrap'
    },
    badge: {
      fontSize: '11px',
      fontWeight: '600',
      padding: '3px 8px',
      borderRadius: '4px',
      textTransform: 'capitalize'
    },
    description: {
      fontSize: '13px',
      color: '#555555',
      margin: '0',
      lineHeight: '1.6'
    }
  }
  
  export default ActionPlan