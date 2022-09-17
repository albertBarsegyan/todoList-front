import { useState } from 'react';
import classNames from 'classnames';

export interface IOption<T = string> {
  id: number;
  nameId: T;
  title: string;
}

export function Select<T>({
  optionsList,
  handleSelect,
  defaultItem,
}: {
  optionsList: IOption<T>[];
  handleSelect: (param: IOption<T>) => void;
  defaultItem: IOption<T>;
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultItem);

  const getStyles = (id: number) =>
    classNames({
      'bg-white border shadow-lg': true,
      'border-gray-100': selectedItem.id !== id,
      'border-purple-600 text-purple-600': selectedItem.id === id,
    });

  const handleDisplayList = () => {
    setShowOptions(prev => !prev);
  };

  const handleOptionClick = (optionData: IOption<T>) => () => {
    handleSelect(optionData);
    setSelectedItem(optionData);
    setShowOptions(false);
  };

  return (
    <div className="w-full relative">
      <button
        type="button"
        className="border border-purple-600 text-purple-600 px-3 py-1 w-full"
        onClick={handleDisplayList}
      >
        {selectedItem.title}
      </button>
      {showOptions && (
        <ul className="absolute top-10 w-full">
          {optionsList.map(option => {
            return (
              <li key={option.id} className={getStyles(option.id)}>
                <button type="button" className="block w-full h-full py-2" onClick={handleOptionClick(option)}>
                  {option.title}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
