import React from 'react';
import style from './findForm.module.css';

function FindForm() {
  return (
    <div className={style.div}>
      <form action="" method="post">
        {/* <ul></ul> */}
        <textarea className={style.textarea} placeholder="Опишите себя и свой стиль игры..." />
        <button type="submit">Опубликовать заявку</button>
      </form>
    </div>
  );
}

export default FindForm;
