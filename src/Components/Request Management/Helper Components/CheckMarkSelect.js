import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';

export default function CheckMarkSelect() {
  const [checked, setChecked] = useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleCheck} />}
        label="Select this option"
      />
    </div>
  );
}
