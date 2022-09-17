import Layout from '../components/layouts/layout';
import TodoContainer from '../components/todo/todoContainer';

import ProfileDescription from '../profileDescription/profileDescription';

import { TodoSort } from '../components/todo/todoSort';
import { Pagination } from '../components/pagination/pagination';

export default function Home() {
  return (
    <Layout>
      <>
        <ProfileDescription />
        <TodoSort />
        <TodoContainer />
        <Pagination />
      </>
    </Layout>
  );
}
