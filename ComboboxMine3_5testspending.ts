import React, { useState, useRef, useEffect } from 'react';
import countries from './countries';

type Option = {
  code: string;
  label: string;
};

interface ComboBoxProps {
  options?: Option[];
  onChange?: (value: Option) => void;
}

const ComboBox = ({ options = countries, onChange }: ComboBoxProps) => {
  const [inputValue, setInputValue] = useState('');
  const [filtered, setFiltered] = useState<Option[]>(options);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setFiltered(
      options.filter((c) =>
        c.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, options]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && event.key !== 'Escape') setOpen(true);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((prev) =>
          prev === null ? 0 : Math.min(prev + 1, filtered.length - 1)
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((prev) =>
          prev === null ? 0 : Math.max(prev - 1, 0)
        );
        break;
      case 'Enter':
        event.preventDefault(); // ✅ prevent bubbling to parent
        if (activeIndex !== null) {
          const selected = filtered[activeIndex];
          setInputValue(selected.label);
          onChange?.(selected); // ✅ call onChange callback
          setOpen(false);
        }
        break;
      case 'Escape':
        setOpen(false);
        break;
    }
  };

  const handleSelect = (option: Option) => {
    setInputValue(option.label);
    onChange?.(option);
    setOpen(false);
  };

  return (
    <div style={{ position: 'relative', maxWidth: 400 }}>
      <input
        ref={inputRef}
        type="text"
        role="combobox" // ✅ Required for accessibility and testing
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setActiveIndex(null);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setOpen(true)}
        aria-autocomplete="list"
        aria-controls="combo-listbox"
        aria-activedescendant={
          activeIndex !== null ? `combo-option-${activeIndex-1}` : undefined
        }
        aria-expanded={open}
        style={{
          width: '100%',
          padding: '8px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: 4,
        }}
      />

      {open && filtered.length > 0 && (
        <ul
          id="combo-listbox"
          role="listbox"
          ref={listRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            zIndex: 1000,
            padding: 0,
            margin: 0,
            listStyle: 'none',
          }}
        >
          {filtered.map((option, index) => (
            <li
              key={option.code}
              id={`combo-option-${index}`}
              role="option"
              aria-selected={activeIndex === index}
              onMouseDown={() => handleSelect(option)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                backgroundColor:
                  activeIndex === index ? '#e0f7fa' : 'transparent',
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
