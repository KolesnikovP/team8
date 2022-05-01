/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListGameRadio from '../ListGameRadio/ListGameRadio';
import style from './AccessForm.module.css';
import { setUserGames } from '../../redux/thunk/userProfile';

function AccessForm() {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => state.userReducer);
  const { profGames } = useSelector((state) => state.profileReducer);
  const [spinner, setSpinner] = useState(true);
  const dispatch = useDispatch();
  const stopSpin = () => {
    setSpinner(false);
  };
  useEffect(() => {
    dispatch(setUserGames(user?.[0]?.id, stopSpin));
  }, [user]);
  function setPublic() {
    window.open(`${user?.[0]?._json.profileurl}edit/settings`);
  }
  return (
    <div className={style.container}>
      <h3 className={style.title}>
        Для дальнейшей работы с <span>Team8</span> сделайте ваш аккаунт Steam публичным.
      </h3>
      <div className={style.buttonGroup}>
        <button type="button" className={style.btn} onClick={setPublic}>
          Сделать пyбличным
        </button>
        <button type="button" onClick={() => setVisible((prev) => !prev)}>
          Открыть инструкцию
        </button>
      </div>
      {spinner ? (
        <div>
          <img className={style.spinner} src="./pngwing.com.png" alt="hui" />
        </div>
      ) : (
        profGames.map((el) => <ListGameRadio key={el.gameSteamId} game={el} />)
      )}

      {visible ? (
        <div className={style.settingsBlock}>
          <ul>
            <li>Перейдите на официальный сайт steamcommunity.com.</li>
            <li>
              Жмите на кнопку «Войти» справа вверху и авторизуйтесь под своим логином и паролем.
            </li>
            <li>Кликните на ник справа вверху.</li>
            <li>Жмите на кнопку «Открыть профиль»</li>
          </ul>
          <div className={style.imgCont}>
            <img src="/img/profileSet/1.jpeg" alt="SettingsProfile" />
          </div>
          <li>Кликните на кнопку «Редактировать …» с правой стороны.</li>
          <div className={style.imgCont}>
            <img src="/img/profileSet/2.jpeg" alt="SettingsProfile" />
          </div>
          <li>В левом меню выберите пункт «Приватность».</li>
          <div className={style.imgCont}>
            <img src="/img/profileSet/3.jpeg" alt="SettingsProfile" />
          </div>
          <p>
            На этом этапе можно сделать профиль Стим открытым, если до этого он был запрещен для
            входа другим пользователям. Система сразу предупреждает, что доступ к основным данным
            всегда публичен и закрыть его не получится. При этом имя и аватар профиля легко увидеть
            на странице. Также они применяются в многопользовательских играх, и скрыть их не выйдет.
            После входа в указанное выше меню легко разобраться, как открыть аккаунт Стим. Для этого
            в разделе «Мой профиль» установите пункт «Открытый». В этом случае в учетной записи
            показывается описание, список друзей, значки, уровень, комментарии, витрины и группы.
          </p>
        </div>
      ) : (
        ''
      )}
      <div>
        <h3>Выберете любимые игры:</h3>
        {/* <div className="radio-form">
          {games.map((game) => {
            return <ListGameRadio key={game.id} game={game} />;
          })}
        </div> */}
      </div>
    </div>
  );
}

export default AccessForm;
