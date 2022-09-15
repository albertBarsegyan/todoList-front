import React from 'react'

export default function CheckIcon ({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke={color}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

CheckIcon.defaultProps = {
  color: '#22c55e'
}
