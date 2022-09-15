import { useAuth } from '../hooks/useAuth'
import profilePicture from '../assets/images/profilePicture.jpg'

export default function ProfileDescription () {
  const { user } = useAuth()

  return (
    <div className="w-full">
      <div
        className="flex flex-col items-center justify-center w-1/2 py-4 mx-auto my-5 overflow-hidden shadow-md gap-y-3">
        <p className="text-2xl text-purple-500">
          {user?.first_name} {user?.last_name}
        </p>
        <span className="text-2xl text-blue-500">{user?.email}</span>
      </div>
      <div className="w-1/3 px-4 py-2 mx-auto overflow-hidden rounded-md shadow-md">
        <img alt='profile' src={user?.profile_picture ?? profilePicture}/>
      </div>
    </div>
  )
}
