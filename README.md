# React Dropdown Select

A customizable dropdown select component for React applications.

## Installation

```bash
npm install @ingirorhaun/oc-react-dropdown-select
```

## Usage

```javascript
import DropdownSelect from "@ingirorhaun/oc-react-dropdown-select";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
];

function App() {
  const handleSelect = (e) => {
    console.log("Selected:", e.target.value);
  };

  return (
    <DropdownSelect
      options={options}
      onSelect={handleSelect}
      id="my-dropdown"
    />
  );
}
```
