import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const FamilyDefinitionSelector = ({ value, onChange }) => {
  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="family definition"
    >
      <ToggleButton value="EMP" aria-label="employee only">
        EMP
      </ToggleButton>
      <ToggleButton value="ESC" aria-label="esc">
        ESC
      </ToggleButton>
      <ToggleButton value="ESCP/I" aria-label="escp/i">
        ESCP/I
      </ToggleButton>
       <ToggleButton value="Specify" aria-label="specify">
        Specify
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default FamilyDefinitionSelector;