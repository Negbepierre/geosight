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
          <div
            style={{
              ...styles.bigScore,
              color: getScoreColor(visibility_summary.overall_score)
            }}
          >
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
                <p
                  style={{
                    ...styles.modelScore,
                    color: getScoreColor(stats.avg_score)
                  }}
                >
                  {stats.mention_rate}%
                </p>
                <p style={styles.modelLabel}>mention rate</p>
                <div style={styles.barTrack}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: `${stats.mention_rate}%`,
                      backgroundColor: getScoreColor(stats.mention_rate)
                    }}
                  />
                </div>
                <p style={styles.modelMeta}>
                  {stats.mentions} of {stats.total_queries} queries
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
      maxWidth: '720px',
      margin: '0 auto',
      padding: '0 20px 40px'
    },
    overallCard: {
      backgroundColor: '#fff',
      border: '1px solid #eee',
      borderRadius: '12px',
      padding: '32px',
      textAlign: 'center',
      marginBottom: '16px'
    },
    companyName: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '8px',
      margin: '0 0 8px'
    },
    bigScore: {
      fontSize: '72px',
      fontWeight: '700',
      lineHeight: '1',
      margin: '16px 0 8px'
    },
    outOf: {
      fontSize: '24px',
      fontWeight: '400',
      color: '#999'
    },
    scoreLabel: {
      fontSize: '16px',
      color: '#333',
      margin: '8px 0 4px'
    },
    meta: {
      fontSize: '13px',
      color: '#999',
      margin: '4px 0 0'
    },
    modelGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '12px'
    },
    modelCard: {
      backgroundColor: '#fff',
      border: '1px solid #eee',
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center'
    },
    modelName: {
      fontSize: '13px',
      fontWeight: '500',
      color: '#333',
      textTransform: 'capitalize',
      margin: '0 0 8px'
    },
    modelScore: {
      fontSize: '32px',
      fontWeight: '700',
      margin: '0 0 2px'
    },
    modelLabel: {
      fontSize: '11px',
      color: '#999',
      margin: '0 0 12px'
    },
    barTrack: {
      height: '6px',
      backgroundColor: '#f0f0f0',
      borderRadius: '3px',
      overflow: 'hidden',
      marginBottom: '8px'
    },
    barFill: {
      height: '100%',
      borderRadius: '3px',
      transition: 'width 0.4s ease'
    },
    modelMeta: {
      fontSize: '11px',
      color: '#999',
      margin: '0'
    }
  }
  
  export default ScoreCard