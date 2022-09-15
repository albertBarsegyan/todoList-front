import { RoutePaths } from '../constants/route.constants'
import React from 'react'

import { Link } from 'react-router-dom'

export default function ErrorPage () {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen overflow-scroll ">
      <p className="text-red-500 text-8xl"> Error 404</p>

      <div className="mt-5">
        <Link to={RoutePaths.LOGIN}>
          <button className="px-4 py-2 text-purple-500 duration-75 border border-purple-500 rounded-sm hover:bg-purple-600 hover:text-white">
            Go to login page
          </button>
        </Link>
      </div>
    </div>
  )
}
