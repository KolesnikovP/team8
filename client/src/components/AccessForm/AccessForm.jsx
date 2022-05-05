import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Container, Typography } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from '@mui/system';
import style from './AccessForm.module.css';
import { setUserGames } from '../../redux/thunk/userProfile';

function AccessForm() {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => state.userReducer);
  const { profGames } = useSelector((state) => state.profileReducer);
  const [spinner, setSpinner] = useState(true);
  const [hasGames, setGames] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stopSpin = () => {
    setSpinner(false);
  };
  const userHasntGame = () => {
    setGames(false);
  };
  useEffect(() => {
    dispatch(setUserGames(user?.steamId, stopSpin, userHasntGame));
  }, [user]);
  function setPublic() {
    window.open(`${user.steamProfileLink}edit/settings`);
  }
  return (
    <Container>
      <Typography variant="h4">
        Добро пожаловать на
        <Typography component="span" variant="h4" sx={{ marginLeft: '1rem' }}>
          Team8
        </Typography>
      </Typography>
      <Typography variant="h5" sx={{ marginTop: '1rem' }}>
        Для дальнейшей работы желательно сделать свой аккаунт публичным.
      </Typography>
      <Box>
        <Button type="Button" className={style.btn} onClick={() => setPublic()}>
          Сделать пyбличным
        </Button>
        <Button type="Button" onClick={() => setVisible((prev) => !prev)}>
          Открыть инструкцию
        </Button>
      </Box>
      {spinner ? (
        <Box>
          <img className={style.spinner} src="./pngwing.com.png" alt="loading-png" />
        </Box>
      ) : (
        <Box sx={{ marginTop: '2rem', textAlign: 'center' }}>
          <Typography sx={{ marginTop: '2rem', textAlign: 'center' }} variant="h5">
            {hasGames
              ? 'Данные игры и их статистика будут отображаться у вас в профиле'
              : 'К сожалению в вашем аккаунте мы не нашли подходящих игр ('}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
            {profGames.map((game) => (
              <Box>
                <img
                  src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.gameSteamId}/header.jpg?t=1650992920`}
                  alt={`appIcon_${game.gameSteamId}`}
                  width="80%"
                  key={Date.now()}
                />
                <Typography>Количество часов: {game.userGameHours}</Typography>
              </Box>
            ))}
          </Box>
          <Button
            type="Button"
            variant="outlined"
            color="success"
            size="large"
            onClick={() => navigate('/')}
            sx={{ marginTop: '1rem' }}
          >
            Старт
          </Button>
        </Box>
      )}

      {visible ? (
        <Box>
          <Typography>Перейдите на официальный сайт steamcommunity.com.</Typography>
          <Typography>
            Жмите на кнопку «Войти» справа вверху и авторизуйтесь под своим логином и паролем.
          </Typography>
          <Typography>Кликните на ник справа вверху.</Typography>
          <Typography>Жмите на кнопку «Открыть профиль»</Typography>
          <Box>
            <img src="/img/profileSet/1.jpeg" alt="SettingsProfile" />
          </Box>
          <Typography>Кликните на кнопку «Редактировать …» с правой стороны.</Typography>
          <Box>
            <img src="/img/profileSet/2.jpeg" alt="SettingsProfile" />
          </Box>
          <Typography>В левом меню выберите пункт «Приватность».</Typography>
          <Box>
            <img src="/img/profileSet/3.jpeg" alt="SettingsProfile" />
          </Box>
          <Typography>
            На этом этапе можно сделать профиль Стим открытым, если до этого он был запрещен для
            входа другим пользователям. Система сразу предупреждает, что доступ к основным данным
            всегда публичен и закрыть его не получится. При этом имя и аватар профиля легко увидеть
            на странице. Также они применяются в многопользовательских играх, и скрыть их не выйдет.
            После входа в указанное выше меню легко разобраться, как открыть аккаунт Стим. Для этого
            в разделе «Мой профиль» установите пункт «Открытый». В этом случае в учетной записи
            показывается описание, список друзей, значки, уровень, комментарии, витрины и группы.
          </Typography>
        </Box>
      ) : (
        ''
      )}
    </Container>
  );
}

export default AccessForm;
