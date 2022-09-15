import TodoRow from './todoRow'
import Input from '../inputs/input'
import {
  InputVariants,
  RegularPopupVariants
} from '../../constants/componentVariants.constants'
import { useAuth } from '../../hooks/useAuth'
import { deleteRequest, postRequest } from '../../services/request.service'
import { Endpoints } from '../../constants/endpoint.constants'
import { ITodo } from '../../interfaces/todo.interfaces'

import { usePopup } from '../../hooks/usePopup'
import { useState } from 'react'

export default function TodoContainer () {
  const { user } = useAuth()

  const [todoText, setToDoText] = useState('')
  const [todoList, setTodoList] = useState<ITodo[] | []>(user?.todos ?? [])

  const { providePopupSettings } = usePopup()

  const handleChange = (e: any) => {
    const inputValue = e.target.value
    setToDoText(inputValue)
  }

  const handleEnterKey = (e: any) => {
    if (e.key === 'Enter') {
      postRequest(Endpoints.todo(), { status_id: 2, text: todoText }).then(
        res => {
          const { data } = res.data

          setTodoList(prev => [...prev, data])
        }
      )

      setToDoText('')
    }
  }

  const deleteTodo = (id: number) => async () => {
    const deleteResponseData = await (
      await deleteRequest(Endpoints.todo(), { id })
    ).data

    const isResponseSuccess = deleteResponseData.status === 'success'

    if (isResponseSuccess) {
      setTodoList(prev => prev.filter(todo => todo?.id !== id))
    }
    providePopupSettings({
      text: deleteResponseData.message,
      popupVariant: isResponseSuccess
        ? RegularPopupVariants.SUCCESS
        : RegularPopupVariants.ERROR
    })
  }

  return (
    <div className="w-full mt-10 mb-5">
      <div>
        <div className="w-1/2 mx-auto">
          <Input
            placeholder="Provide todo"
            value={todoText}
            onKeyDown={handleEnterKey}
            onChange={handleChange}
            variant={InputVariants.REGULAR}
          />
        </div>

        <div className="mt-5">
          {todoList?.map((todo, index) => {
            return (
              <TodoRow
                id={todo?.id}
                text={todo?.text}
                status={todo?.status?.name}
                key={todo?.id ?? index}
                handleDelete={deleteTodo(todo?.id)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
