import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../../../api/DogFoodApi'
import { Loader } from '../../../../Loader/Loader'

export function ModalDeleteInner({
  data, closeDeleteModalHandler, productId, token,
}) {
  const navigate = useNavigate()

  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: () => dogFoodApi.deleteProduct(productId, token),
  })

  if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>

  const deleteItemHandler = async () => {
    await mutateAsync()
    navigate('/products')
  }

  return (
    <>
      {' '}
      <p>
        Вы действительно хотите удалить
        {' '}
        <b>{data.name}</b>
        {' '}
        из списка продуктов?
      </p>
      <div className="d-flex justify-content-center">
        <button
          onClick={closeDeleteModalHandler}
          className={classNames(
            'btn',
            'btn-primary',
            'btn-sm',
            'me-3',
            'mt-3',
          )}
          type="button"
        >
          отмена
        </button>
        <button
          onClick={deleteItemHandler}
          className={classNames(
            'btn',
            'btn-danger',
            'btn-sm',
            'me-3',
            'mt-3',
          )}
          type="button"
        >
          Удалить
        </button>
      </div>
    </>
  )
}
