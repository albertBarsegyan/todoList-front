import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '../icons/check.icon';
import EditIcon from '../icons/edit.icon';

import { ITodo, TodoStatusVariants } from '../../interfaces/todo.interfaces';
import { usePopup } from '../../hooks/usePopup';
import { useAppDispatch } from '../../hooks/store.hooks';
import { editTodoThunk } from '../../slices/todos.slice';
import { IResponse, ResponseStatus } from '../../interfaces/response.interfaces';
import { RegularPopupVariants } from '../../constants/componentVariants.constants';
import { TodoStatuses } from '../../constants/todo.constants';
import { useAuth } from '../../hooks/useAuth';
import { getDataFromStorage } from '../../helpers/storage.helpers';
import { localStorageKeys } from '../../constants/localStorage.constants';
import { RoutePaths } from '../../constants/route.constants';

export const AdminControllers = ({
  toggleEdit,
  statusId,
  todoId,
}: {
  todoId: number;
  statusId: number;
  toggleEdit: () => void;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { providePopupSettings } = usePopup();

  const handleStatus = async () => {
    const tokenFromStorage = getDataFromStorage(localStorageKeys.userToken);
    if (tokenFromStorage) {
      const dispatchResponse = await dispatch(editTodoThunk({ id: todoId, statusId: Number(!statusId) }));
      const { status, message } = (dispatchResponse.payload as IResponse<ITodo | null>) ?? {};
      const isResponseSuccess = status === ResponseStatus.Success;
      providePopupSettings({
        text: message,
        popupVariant: isResponseSuccess ? RegularPopupVariants.SUCCESS : RegularPopupVariants.ERROR,
      });
      return;
    }
    providePopupSettings({
      text: 'You must Login',
      popupVariant: RegularPopupVariants.ERROR,
    });
    navigate(RoutePaths.login);
  };

  return (
    <div className="flex flex-row justify-end w-1/3 flex-end">
      <button type="button" onClick={toggleEdit}>
        <EditIcon />
      </button>
      <button type="button" onClick={handleStatus}>
        <CheckIcon />
      </button>
    </div>
  );
};

export default function TodoRow({ data }: { data: ITodo }) {
  const [isEditable, setIsEditable] = useState(false);
  const { user } = useAuth();
  const { id, email, username, text, statusId, isEdited } = data;
  const [content, setContent] = useState(text);
  const { providePopupSettings } = usePopup();
  const dispatch = useAppDispatch();
  const initialText = useRef(text);
  const navigate = useNavigate();

  const rowStyles = classNames({
    'flex flex-row justify-between items-center px-5 py-4 rounded-sm shadow-sm my-4 shadow-md': true,
    'border-b border-green-500': statusId === TodoStatusVariants.done,
    'border-b border-purple-500': statusId === TodoStatusVariants.inProgress,
  });

  const textStyles = classNames({
    'px-4 py-2 border-b-0 text-left w-1/2': true,
    'text-purple-500': statusId === TodoStatusVariants.inProgress,
    'text-green-500': statusId === TodoStatusVariants.done,
  });

  const getAuthError = () => {
    providePopupSettings({
      text: 'You must Login',
      popupVariant: RegularPopupVariants.ERROR,
    });
  };

  const handleEnterKey = async (e: any) => {
    const inputValue = e.target.value;
    if (e.key === 'Enter') {
      setIsEditable(false);
      const tokenFromStorage = getDataFromStorage(localStorageKeys.userToken);
      if (tokenFromStorage) {
        const dispatchResponse = await dispatch(
          editTodoThunk({
            id,
            text: content,
          }),
        );
        const { status, message } = (dispatchResponse.payload as IResponse<ITodo | null>) ?? {};
        const isResponseSuccess = status === ResponseStatus.Success;

        if (isResponseSuccess) {
          setContent(inputValue);
          initialText.current = inputValue;
        }

        providePopupSettings({
          text: message,
          popupVariant: isResponseSuccess ? RegularPopupVariants.SUCCESS : RegularPopupVariants.ERROR,
        });
        return;
      }
      getAuthError();
      setContent(initialText.current);
      navigate(RoutePaths.login);
    }
  };

  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    setContent(inputValue);
  };
  const toggleEdit = () => {
    setIsEditable(prev => !prev);
  };

  const isUserAdmin = user?.data && user?.data.isAdmin;

  return (
    <div className={rowStyles}>
      <div className="flex flex-row items-center justify-center w-full">
        <div className={textStyles}>
          <p className="text-gray-700"> Username </p>
          <p>{username}</p>
        </div>

        <div className={textStyles}>
          <p className="text-gray-700"> Email </p>
          <p>{email}</p>
        </div>

        <div className={textStyles}>
          <p className="text-gray-700"> Status </p>
          {isEdited ? <p>Edited by Admin</p> : null}
          <p>{TodoStatuses[statusId].text}</p>
        </div>

        <div className={textStyles}>
          <p className="text-gray-700"> Todo </p>
          {isEditable ? (
            <input
              className="block w-full text-purple-500 border-b focus:outline-none border-b-purple-500"
              type="text"
              onChange={handleChange}
              value={content}
              onKeyDown={handleEnterKey}
            />
          ) : (
            <p>{content}</p>
          )}
        </div>
      </div>

      {isUserAdmin && <AdminControllers todoId={id} statusId={statusId} toggleEdit={toggleEdit} />}
    </div>
  );
}
