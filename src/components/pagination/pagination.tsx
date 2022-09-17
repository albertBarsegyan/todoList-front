import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { getTodosThunk, selectTodos } from '../../slices/todos.slice';

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

const PagesListMoreTen = ({ allPagesNumber, handlePage, currentPage }: IPageMoreTenProps) => {
  const pagesData = [];
  const pagesShowLimit = 3;
  const firstShowPage = currentPage - pagesShowLimit <= 1 ? 1 : currentPage - pagesShowLimit + 1;
  const lastShowPage =
    currentPage + pagesShowLimit >= allPagesNumber ? allPagesNumber : currentPage + pagesShowLimit + 1;

  for (let i = firstShowPage; i <= lastShowPage; i += 1) {
    pagesData.push({ id: i, text: i });
  }

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
  const pagesList = [];

  for (let i = 1; i <= allPagesNumber; i += 1) {
    pagesList.push({ id: i, text: i });
  }

  const handlePage = (pageNumber: number) => () => {
    if (currentPage !== pageNumber - 1) {
      dispatch(getTodosThunk({ page: pageNumber - 1, sortBy, sortOrder }));
    }
  };

  return (
    <div>
      {allPagesNumber > 10 ? (
        <PagesListMoreTen allPagesNumber={allPagesNumber} handlePage={handlePage} currentPage={currentPage} />
      ) : (
        pagesList.map(pageData => {
          return <PageButton pageData={pageData} key={pageData.id} handlePage={handlePage} currentPage={currentPage} />;
        })
      )}
    </div>
  );
}
