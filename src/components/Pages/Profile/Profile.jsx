/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import styles from './profile.module.css'
import { withQuery } from '../../HOCs/withQuery'
import { getIniteState } from '../../../redux/initState'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { addToken } from '../../../redux/slices/userSlice'

function ProfileInner({ data, outClickHandler }) {
  console.log('Рендерится компонент ProfileInner')
  if (!data) return <p>List is empty ...</p>

  return (
    <div className={styles.profileWr}>
      <div><img src={data.avatar} alt="Profile.jpg" /></div>
      <div className={styles.userInfo}>
        <p>
          Имя пользователя:
          &emsp;
          <i>{data.name}</i>
        </p>
        <p>
          О пользователе:
          &emsp;
          <i>{data.about}</i>
        </p>
        <p>
          Группа:
          &emsp;
          <i>{data.group}</i>
        </p>
        <p>
          E-mail:
          &emsp;
          <i>{data.email}</i>
        </p>
      </div>
      <div className={styles.outWr}>
        <Link className={styles.out} onClick={outClickHandler} to="/#">
          <p>Выйти</p>
          <i className={classNames(
            'bi bi-box-arrow-right',
            styles.icon,
          )}
          />
        </Link>
      </div>
    </div>
  )
}

const ProfileInnerWithQuery = withQuery(ProfileInner)

export function Profile() {
  console.log('Рендерится компонент Profile')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user: { token } } = getIniteState()

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['userInfo', token],
    queryFn: () => dogFoodApi.getProfileInfoByToken(token),
    enabled: !!token,
  })

  console.log({
    data, isLoading, isError, error, refetch,
  })

  const outClickHandler = (e) => {
    e.preventDefault()
    dispatch(addToken(''))
    navigate('/')
  }

  return (
    <ProfileInnerWithQuery
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
      outClickHandler={outClickHandler}
    />
  )
}
