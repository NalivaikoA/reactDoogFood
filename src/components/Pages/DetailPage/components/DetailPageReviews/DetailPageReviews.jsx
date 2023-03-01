import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getIniteState } from '../../../../../redux/initState'
import { Loader } from '../../../../Loader/Loader'
import { Modal } from '../../../../Modal/Modal'
import { ModalDeleteReviewInner } from '../ModalDeleteReviewInner/ModalDeleteReviewInner'
import styles from './detailPageReviews.module.css'

export function DetailPageReviews({ dataReview, userId, productId }) {
  const navigate = useNavigate()

  const idAuthor = dataReview.author

  const {
    user: { token },
  } = getIniteState()

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false)
  }

  const openDeleteModalHandler = (e) => {
    e.preventDefault()
    setIsDeleteModalOpen(true)
  }

  const getQueryUserInfoByIdKey = (id) => ['detailPage', id]

  const {
    data, isLoading, isError,
  } = useQuery({
    queryKey: getQueryUserInfoByIdKey(idAuthor),
    queryFn: () => fetch(`https://api.react-learning.ru/v2/sm9/users/${idAuthor}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json()),
    enabled: !!token,
  })

  if (isLoading) return <Loader />
  if (isError) return <h1>Error happend</h1>

  const options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const date = new Date(dataReview.created_at).toLocaleDateString('ru', options)

  return (
    <>
      <div className={styles.wr}>
        <div className={styles.topBlock}>
          <p>{data.name}</p>
          <p>{date}</p>
        </div>
        <div className={styles.rating}>
          <i className={classNames('bi bi-star-fill', styles.gradient)} />
          <p className={styles.gradient}>{dataReview.rating}</p>
        </div>
        <Modal
          isOpen={isDeleteModalOpen}
          closeHandler={closeDeleteModalHandler}
        >
          <ModalDeleteReviewInner
            dataReview={dataReview}
            closeDeleteModalHandler={closeDeleteModalHandler}
            token={token}
            productId={productId}
          />
        </Modal>
        <div className={styles.bottomBlock}>
          <p className={styles.text}>{dataReview.text}</p>
          {userId === dataReview.author ? (
            <div className={styles.linkWr}>
              {' '}
              <Link
                className={styles.link}
                onClick={openDeleteModalHandler}
                to="/#"
              >
                <i className="bi bi-trash3" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <hr />
    </>
  )
}
