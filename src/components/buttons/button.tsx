export default function Button ({
  children,
  type,
  onClick,
  ...props
}: { type: 'button' | 'submit' | 'reset' | undefined, children: JSX.Element[] | JSX.Element | string, onClick?: () => void }) {
  return (

    <button
      className="text-md border border-transparent px-3 py-2  hover:text-purple-400 hover:bg-transparent hover:border hover:border-purple-400 text-white bg-purple-400 duration-75 rounded-md"
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: 'button'
}
