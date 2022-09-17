import LoginForm from '../components/forms/login.form';
import Introduction from '../components/introduction/introduction';
import Layout from '../components/layouts/layout';

export default function Login() {
  return (
    <Layout>
      <>
        <LoginForm />
        <Introduction text="Please Login to start actions" />
      </>
    </Layout>
  );
}
