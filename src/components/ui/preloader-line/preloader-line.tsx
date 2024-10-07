import s from './preloader-line.module.scss'

export const PreloaderLine = () => {
  return (
    <div className={s.PreloaderLine}>
      <div className={s.PreloaderLineLoader}></div>
    </div>
  )
}
