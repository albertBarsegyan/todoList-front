import { useAuth } from '../hooks/useAuth';
import { SliceStatuses } from '../constants/slice.constants';
import { useAppSelector } from '../hooks/store.hooks';
import { selectTodos } from '../slices/todos.slice';

export default function ProfileDescription() {
  const { user, loading } = useAuth();
  const { status } = useAppSelector(selectTodos);

  const userInfo = user && user.data?.isAdmin ? 'Admin' : 'Regular user';

  return (
    <div className="w-full py-5 relative">
      <div className="flex flex-col items-center justify-center w-1/2 py-4 mx-auto my-5 overflow-hidden shadow-md gap-y-3">
        <p className="text-2xl text-purple-500">{loading ? 'Loading' : userInfo}</p>
      </div>
      <div className="text-center h-5px shadow-sm absolute top-auto left-1/2 -translate-x-1/2">
        {status === SliceStatuses.loading && <span className="text-2xl text-purple-600">Loading...</span>}
      </div>
    </div>
  );
}
