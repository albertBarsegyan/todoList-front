import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { getTodosThunk, selectTodos } from '../../slices/todos.slice';
import { convertTodosPages, TodoPageConverterVariant } from '../../helpers/todo.helpers';
import { TodoPaginationConstants } from '../../constants/todo.constants';

interface IPageButtonProps {
  pageData: { id: number; text: number };
  handlePage: (pageNumber: number) => () => void;
  currentPage: number;
}

interface IPageMoreTenProps {
  allPagesNumber: number;
  handlePage: (pageNumber: number) => () => void;
  currentPage: number;
}

const PageButton = ({ pageData, handlePage, currentPage }: IPageButtonProps) => {
  const getPageButtonStyle = (data: { text: number; id: number }) =>
    classNames({
      'p-3 m-1': true,
      'border hover:bg-green-600 hover:text-white border-green-600 text-green-600': data.text - 1 === currentPage,
      'border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white': data.text - 1 !== currentPage,
    });

  return (
    <button
      type="button"
      onClick={handlePage(pageData.text)}
      className={getPageButtonStyle(pageData)}
      key={pageData.id}
    >
      {pageData.text}
    </button>
  );
};

const PagesLisMoreLimit = ({ allPagesNumber, handlePage, currentPage }: IPageMoreTenProps) => {
  const { pagesData, firstShowPage, lastShowPage } = convertTodosPages(
    {
      currentPage,
      allPagesNumber,
    },
    TodoPageConverterVariant.MoreLimit,
  );

  return (
    <div>
      {firstShowPage !== 1 && (
        <>
          <PageButton pageData={{ id: 1, text: 1 }} handlePage={handlePage} currentPage={currentPage} />
          <span>...</span>
        </>
      )}

      {pagesData.map(pageData => {
        return <PageButton pageData={pageData} key={pageData.id} handlePage={handlePage} currentPage={currentPage} />;
      })}

      {lastShowPage !== allPagesNumber && (
        <>
          <span>...</span>
          <PageButton
            pageData={{ id: allPagesNumber, text: allPagesNumber }}
            handlePage={handlePage}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export function Pagination() {
  const { page: currentPage, allPages: allPagesNumber, sortBy, sortOrder } = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  const { pagesData } = convertTodosPages(
    {
      allPagesNumber,
    },
    TodoPageConverterVariant.MoreLimit,
  );

  const handlePage = (pageNumber: number) => () => {
    if (currentPage !== pageNumber - 1) {
      dispatch(getTodosThunk({ page: pageNumber - 1, sortBy, sortOrder }));
    }
  };

  if (allPagesNumber <= 1) {
    return null;
  }

  return (
    <div>
      {allPagesNumber >= TodoPaginationConstants.TodoPagesLimit ? (
        <PagesLisMoreLimit allPagesNumber={allPagesNumber} handlePage={handlePage} currentPage={currentPage} />
      ) : (
        pagesData.map(pageData => {
          return <PageButton pageData={pageData} key={pageData.id} handlePage={handlePage} currentPage={currentPage} />;
        })
      )}
    </div>
  );
}
