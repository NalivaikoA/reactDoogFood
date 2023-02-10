import styles from './loader.module.css'

export function Loader() {
  return (
    <div className={styles.wr}>
      <div className={styles['lds-ring']}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
