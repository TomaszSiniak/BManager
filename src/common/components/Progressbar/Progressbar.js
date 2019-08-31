import React, { Component } from 'react';
import styles from './progressbar.scss';

class ProgressBar extends Component {
  state = {
    percentage: 0,
  }

  componentDidMount () {
    this.progress();
  }

  progress = () => {
    let counter = 5;
    let progress = 25;
    let id = setInterval(() => {
      if (progress == 500 && counter == 100) {
        clearInterval(id)
      } else {
        progress += 5;
        counter += 1;
        this.setState({
          percentage: counter
        })
      }
    }, 20);
  }

  render () {
    return (
      <div className={styles.ProgressBarWrapper}>
        <div className={styles.ProgressTitle}>Processing...</div>
        <div className={styles.ProgressBar}>
          <div className={styles.PercentageProgress}>{this.state.percentage}%</div>
          <div className={styles.Progress} style={{ width: this.state.percentage * 2.8 + 'px' }}></div>
        </div>
      </div>
    )
  }
}

export default ProgressBar;
