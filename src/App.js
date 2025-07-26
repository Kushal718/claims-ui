import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ClaimsOptionCard from './components/ClaimsOptionCard';
import initialOptions from './data/initialOptions.json';
import './App.css';

function App() {
  const [options, setOptions] = useState(initialOptions);

  const handleDataChange = (id, field, value) => {
    setOptions(prevOptions =>
      prevOptions.map(opt =>
        opt.id === id ? { ...opt, [field]: value } : opt
      )
    );
  };

  const handleClone = (id) => {
    const optionToClone = options.find(opt => opt.id === id);

    if (options.length === 1 && !optionToClone.isCloneable) {
      const newCard = {
        id: Date.now(),
        label: `Option 1`,
        isCloneable: true,
        familyDefinition: "EMP",
        employees: 100,
        dependents: 100,
        sumInsuredOption: "200000",
        sumInsured: 200000,
        sumInsuredMode: "Uniform",
        sumInsuredType: "Family Floater",
        comments: ""
      };
      setOptions([...options, newCard]);
    } else {
     
      const optionNumbers = options
        .map(opt => {
          if (opt.label.startsWith('Option ')) {
            return parseInt(opt.label.substring(7), 10);
          }
          return null;
        })
        .filter(num => num !== null);
      
     
      const maxNumber = optionNumbers.length > 0 ? Math.max(...optionNumbers) : 0;
      
     
      const newLabel = `Option ${maxNumber + 1}`;

      const newOption = {
        ...optionToClone,
        id: Date.now(),
        label: newLabel,
      };
      setOptions([...options, newOption]);
    }
  };

  const handleDelete = (id) => {
    if (options.length > 1) {
      setOptions(options.filter(opt => opt.id !== id));
    } else {
      alert("Cannot delete the last card.");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Claims Information
      </Typography>
      <Grid container spacing={2}>
        {options.map((option) => (
          <Grid item key={option.id} xs={6} md={6} lg={4}>
            <ClaimsOptionCard
              optionData={option}
              onDataChange={handleDataChange}
              onClone={handleClone}
              onDelete={handleDelete}
              totalCards={options.length}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
