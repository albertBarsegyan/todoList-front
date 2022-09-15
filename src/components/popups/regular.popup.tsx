import { RegularPopupVariants } from '../../constants/componentVariants.constants'
import React from 'react'

import classNames from 'classnames'

export default function RegularPopup ({
  popupVariant,
  text
}: {
  popupVariant: RegularPopupVariants
  text: string
}) {
  const popupContainerStyles = classNames({
    'text-white font-bold rounded-t px-4 py-2 w-full': true,
    'bg-red-500': popupVariant === RegularPopupVariants.ERROR,
    'bg-darkest': popupVariant === RegularPopupVariants.SUCCESS,
    'bg-gray-500': popupVariant === RegularPopupVariants.PRIMARY
  })

  const popupTextContainerStyles = classNames({
    'border border-t-0 rounded-b px-4 py-3 w-full': true,
    'border-red-400 bg-red-100 text-red-700':
      popupVariant === RegularPopupVariants.ERROR,
    'border-darkest bg-primary text-white':
      popupVariant === RegularPopupVariants.SUCCESS,
    'border-gray-500 bg-gray-100 text-gray-700':
      popupVariant === RegularPopupVariants.PRIMARY
  })

  return (
    <div role="alert" className="fixed z-20 w-1/3 top-5 right-5">
      <div className={popupContainerStyles}>-</div>
      <div className={popupTextContainerStyles}>
        <p>{text}</p>
      </div>
    </div>
  )
}
