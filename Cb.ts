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
