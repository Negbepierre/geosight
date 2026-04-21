function ScoreCard({ report }) {

    const { visibility_summary, company_name } = report
  
    const getScoreColor = (score) => {
      if (score >= 60) return '#16a34a'
      if (score >= 30) return '#d97706'
      return '#dc2626'
    }
  
    const getScoreLabel = (score) => {
      if (score >= 60) return 'Strong'
      if (score >= 30) return 'Partial'
      return 'Invisible'
    }
  
    const models = ['claude', 'chatgpt', 'gemini']
  
    return (
      <div style={styles.container}>
  
        <div style={styles.overallCard}>
          <p style={styles.companyName}>{company_name}</p>
          <div style={{
            ...styles.bigScore,
            color: getScoreColor(visibility_summary.overall_score)
          }}>
            {visibility_summary.overall_score}
            <span style={styles.outOf}>/100</span>
          </div>
          <p style={styles.scoreLabel}>
            AI Visibility Score —{' '}
            <span style={{ color: getScoreColor(visibility_summary.overall_score) }}>
              {getScoreLabel(visibility_summary.overall_score)}
            </span>
          </p>
          <p style={styles.meta}>
            {visibility_summary.total_mentions} mentions across{' '}
            {visibility_summary.total_queries_run} queries
          </p>
        </div>
  
        <div style={styles.modelGrid}>
          {models.map((model) => {
            const stats = visibility_summary.by_model[model]
            return (
              <div key={model} style={styles.modelCard}>
                <p style={styles.modelName}>{model}</p>
                <p style={{
                  ...styles.modelScore,
                  color: getScoreColor(stats.avg_score)
                }}>
                  {stats.mention_rate}%
                </p>
                <p style={styles.modelLabel}>mention rate</p>
                <div style={styles.barTrack}>
                  <div style={{
                    ...styles.barFill,
                    width: `${stats.mention_rate}%`,
                    backgroundColor: getScoreColor(stats.mention_rate)
                  }} />
                </div>
                <p style={styles.modelMeta}>
                  {stats.mentions} of {stats.total_queries}
                </p>
              </div>
            )
          })}
        </div>
  
      </div>
    )
  }
  
  const styles = {
    container: {
      maxWidth: '680px',
      margin: '0 auto',
      padding: '0 16px 24px'
    },
    overallCard: {
      backgroundColor: '#ffffff',
      border: '1px solid #eeeeee',
      borderRadius: '16px',
      padding: '28px 24px',
      textAlign: 'center',
      marginBottom: '12px'
    },
    companyName: {
      fontSize: '13px',
      color: '#888888',
      marginBottom: '4px'
    },
    bigScore: {
      fontSize: '64px',
      fontWeight: '700',
      lineHeight: '1',
      margin: '12px 0 8px'
    },
    outOf: {
      fontSize: '22px',
      fontWeight: '400',
      color: '#aaaaaa'
    },
    scoreLabel: {
      fontSize: '15px',
      color: '#333333',
      margin: '6px 0 4px'
    },
    meta: {
      fontSize: '13px',
      color: '#aaaaaa',
      margin: '4px 0 0'
    },
    modelGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px'
    },
    modelCard: {
      backgroundColor: '#ffffff',
      border: '1px solid #eeeeee',
      borderRadius: '12px',
      padding: '16px 12px',
      textAlign: 'center'
    },
    modelName: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#333333',
      textTransform: 'capitalize',
      margin: '0 0 6px'
    },
    modelScore: {
      fontSize: '28px',
      fontWeight: '700',
      margin: '0 0 2px'
    },
    modelLabel: {
      fontSize: '10px',
      color: '#aaaaaa',
      margin: '0 0 10px'
    },
    barTrack: {
      height: '5px',
      backgroundColor: '#f0f0f0',
      borderRadius: '3px',
      overflow: 'hidden',
      marginBottom: '6px'
    },
    barFill: {
      height: '100%',
      borderRadius: '3px'
    },
    modelMeta: {
      fontSize: '11px',
      color: '#aaaaaa',
      margin: '0'
    }
  }
  
  export default ScoreCard