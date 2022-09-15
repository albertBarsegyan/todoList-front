import Layout from '../components/layouts/layout'
import TodoContainer from '../components/todo/todoContainer'

import ProfileDescription from '../profileDescription/profileDescription'

export default function Home () {
  return (
    <Layout hasLogout>
      <>
        <ProfileDescription/>
        <TodoContainer/>
      </>
    </Layout>
  )
}
