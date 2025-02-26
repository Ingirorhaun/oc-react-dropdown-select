import { useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import { useState } from "react";
import styles from './DropdownSelect.module.css';
/**
 * Dropdown select component
 * @param {Object[]} options - An array of options to be displayed in the dropdown
 * @param {Function} onChange - A callback function to be called when the selected option changes
 * @param {string} id - The id to assign to the element
 * @returns {JSX.Element} - The rendered dropdown select component
 */

export default function DropdownSelect({ options, onSelect, id }) {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (e) => {
    setInputValue(e.target.label);
    setSelectedOption(e.target);
    setIsOpen(false);
    onSelect(e);
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setFilteredOptions(
      options.filter((option) => {
        return option.label
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      })
    );
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.dropdownContent}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Select..."
            autoComplete="none"
            value={selectedOption?.label || ""}
            readOnly
            onFocus={() => {
              setFilteredOptions(options);
              setIsOpen(true);
            }}
            {...(id ? { id: id } : {})}
          />
          <span className={`${styles.dropdownArrow} ${isOpen ? styles.open : ""}`}>▼</span>
        </div>
        {isOpen && filteredOptions.length === 0 && (
          <div className={styles.dropdownOptions}>No results found</div>
        )}
        {isOpen && filteredOptions.length > 0 && (
          <div className={styles.dropdownOptions}>
            <input
              type="search"
              autoComplete="none"
              placeholder="Search..."
              value={inputValue}
              onChange={handleInput}
              className={styles.searchInput}
            />
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className={styles.dropdownOption}
                onClick={() => {
                  handleSelect({
                    target: {
                      value: option.value,
                      label: option.label,
                      name: name,
                    },
                  });
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

//define proptypes
DropdownSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  id: PropTypes.string,
};
