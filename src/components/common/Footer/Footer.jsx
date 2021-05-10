import React from "react"
import s from "./Footer.module.css"

const Footer = props => {
  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <span>Информация</span>
        <span>Блог</span>
        <span>Вакансии</span>
        <span>Помощь</span>
        <span>API</span>
        <span>Конфиденциальность</span>
        <span>Условия</span>
        <span>Популярные аккаунты</span>
        <span>Хэштеги</span>
        <span>Места</span>
      </div>
      <div className={s.bot}>
        <span>Языки</span>
        <span>©Mosset от Facebook, 2021</span>
      </div>
    </footer>
  )
}
export default Footer
