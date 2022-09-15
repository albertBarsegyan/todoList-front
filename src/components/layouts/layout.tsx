import Footer from './footer'
import Header from './header'
import { useAuth } from '../../hooks/useAuth'

import { ReactElement } from 'react'

export default function Layout ({
  children,
  hasLogout
}: {
  children: ReactElement
  hasLogout?: boolean
}) {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="relative flex flex-col items-center w-full mx-auto md:w-5/6">
      {hasLogout
        ? (
        <div className="absolute position right-10 top-10">
          <button
            className="px-4 py-2 text-purple-500 duration-75 border border-purple-600 rounded-md hover:text-white hover:bg-purple-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
          )
        : null}

      <Header />
      {children}
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  hasLogout: false
}
