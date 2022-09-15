import RegularPopup from '../components/popups/regular.popup'
import { RegularPopupVariants } from '../constants/componentVariants.constants'
import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState
} from 'react'

interface IPopupProviderProps {
  children: ReactElement
}

type TPopupContext = ReturnType<typeof useProvidePopupData>

export interface IPopupState {
  isVisible: boolean
  popupVariant: RegularPopupVariants
  text: string
  customStyle: string
  timeOutToHide: number
}
const initialState = {
  isVisible: false,
  popupVariant: RegularPopupVariants.PRIMARY,
  text: '',
  customStyle: '',
  timeOutToHide: 3
}

const useProvidePopupData = () => {
  const [popupSettings, setPopupSettings] = useState<IPopupState>(initialState)
  const { isVisible, timeOutToHide } = popupSettings

  useEffect(() => {
    let showTimeout: ReturnType<typeof setTimeout>

    if (isVisible && timeOutToHide > 0) {
      showTimeout = setTimeout(() => {
        setPopupSettings((prev: IPopupState) => ({
          ...prev,
          isVisible: false
        }))
      }, timeOutToHide * 1000)
    }

    if (timeOutToHide > 0) {
      return () => {
        clearTimeout(showTimeout)
      }
    }
  }, [isVisible, timeOutToHide])

  const providePopupSettings = (settings: Partial<IPopupState>) => {
    setPopupSettings((prev: IPopupState) => ({
      ...prev,
      isVisible: true,
      ...settings
    }))
  }

  return { providePopupSettings, popupSettings }
}

const popupContext = createContext<TPopupContext>({
  providePopupSettings: () => {},
  popupSettings: initialState
})

export const usePopup = (): TPopupContext => useContext(popupContext)

export function PopupProvider ({ children }: IPopupProviderProps) {
  const popupData = useProvidePopupData()
  const { popupVariant, text } = popupData.popupSettings

  return (
    <popupContext.Provider value={popupData}>
      <>
        {popupData?.popupSettings?.isVisible
          ? (
          <RegularPopup popupVariant={popupVariant} text={text} />
            )
          : null}
        {children}
      </>
    </popupContext.Provider>
  )
}
