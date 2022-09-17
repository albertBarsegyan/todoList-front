import RegularPopup from './regular.popup';
import { usePopup } from '../../hooks/usePopup';

const PopupProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { popupSettings } = usePopup();
  const { popupVariant, text, isVisible } = popupSettings;

  return (
    <div>
      {isVisible && <RegularPopup popupVariant={popupVariant} text={text} />}
      {children}
    </div>
  );
};

export default PopupProvider;
