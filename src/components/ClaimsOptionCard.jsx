import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const SectionLabel = ({ children }) => (
  <Grid item xs={4}>
    <Box
      sx={{
        bgcolor: '#3b82f6',
        color: 'white',
        p: 1.5,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 1,
      }}
    >
      <Typography variant="body2">{children}</Typography>
    </Box>
  </Grid>
);

const sumInsuredValues = [
  '100000',
  '200000',
  '300000',
  '400000',
  '500000',
  '750000',
];

const familyDefinitionDescriptions = {
  EMP: 'EMP - Employee Only',
  ESC: 'ESC - Employee, Spouse, Children',
  'ESCP/I': 'ESCP/I - Employee, Spouse, Children, Parents / In-laws',
  Specify: 'Specify - Custom definition',
};

const ClaimsOptionCard = ({
  optionData,
  onDataChange,
  onClone,
  onDelete,
  totalCards,
}) => {
  const { id, label, isBase, isCloneable } = optionData;

  const handleSumInsuredChange = (event) => {
    const value = event.target.value;
    onDataChange(id, 'sumInsuredOption', value);
    if (sumInsuredValues.includes(value)) {
      onDataChange(id, 'sumInsured', parseInt(value, 10));
      onDataChange(id, 'sumInsuredMode', 'Uniform');
    }
  };

  const handleManualSumInsuredChange = (event) => {
    onDataChange(id, 'sumInsured', event.target.value);
  };

  const selectedButtonStyle = {
    backgroundColor: '#16a34a',
    color: 'white',
    '&:hover': {
      backgroundColor: '#15803d',
    },
  };

  return (
    <Card
      sx={{
        width: '100%', // ✅ makes card fill grid column
        display: 'flex',
        flexDirection: 'column',
        flex: 1,       // ✅ makes card height flexible
      }}
    >
      <CardHeader
        title={label}
        action={
          <>
            {(isCloneable || totalCards === 1) && (
              <IconButton onClick={() => onClone(id)}>
                <FileCopyIcon />
              </IconButton>
            )}
            {totalCards > 1 && !isBase && (
              <IconButton onClick={() => onDelete(id)}>
                <DeleteIcon />
              </IconButton>
            )}
          </>
        }
        sx={{
          backgroundColor: isBase ? '#e0e0e0' : '#1e3a8a',
          color: isBase ? 'black' : 'white',
          '& .MuiIconButton-root': { color: isBase ? 'black' : 'white' },
        }}
      />
      <CardContent sx={{ p: 1 }}>
        <Grid container spacing={1} mb={1} alignItems="flex-start">
          <SectionLabel>Family Definition</SectionLabel>
          <Grid item xs={8}>
            <ToggleButtonGroup
              value={optionData.familyDefinition}
              exclusive
              fullWidth
              onChange={(e, newValue) => {
                if (newValue) onDataChange(id, 'familyDefinition', newValue);
              }}
            >
              <ToggleButton value="EMP" sx={{ '&.Mui-selected': selectedButtonStyle }}>
                EMP
              </ToggleButton>
              <ToggleButton value="ESC" sx={{ '&.Mui-selected': selectedButtonStyle }}>
                ESC
              </ToggleButton>
              <ToggleButton value="ESCP/I" sx={{ '&.Mui-selected': selectedButtonStyle }}>
                ESCP/I
              </ToggleButton>
              <ToggleButton value="Specify" sx={{ '&.Mui-selected': selectedButtonStyle }}>
                Specify
              </ToggleButton>
            </ToggleButtonGroup>
            <Typography variant="caption" display="block" ml={1}>
              {familyDefinitionDescriptions[optionData.familyDefinition] || ' '}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1} mb={1} alignItems="flex-start">
          <SectionLabel>Breakup of Lives</SectionLabel>
          <Grid item xs={8}>
            <TextField
              variant="standard"
              fullWidth
              value="Lives"
              InputProps={{ readOnly: true }}
              sx={{ mb: 1 }}
            />
            <TextField
              variant="standard"
              fullWidth
              placeholder="No. of Employees"
              value={optionData.employees}
              onChange={(e) => onDataChange(id, 'employees', e.target.value)}
            />
            <TextField
              variant="standard"
              fullWidth
              placeholder="No. of Dependents"
              value={optionData.dependents}
              onChange={(e) => onDataChange(id, 'dependents', e.target.value)}
            />
            <TextField
              variant="standard"
              fullWidth
              placeholder="Total Lives"
              value={Number(optionData.employees) + Number(optionData.dependents)}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} mb={1} alignItems="flex-start">
          <SectionLabel>Sum Insured</SectionLabel>
          <Grid item xs={8}>
            <ToggleButtonGroup
              value={optionData.sumInsuredMode}
              exclusive
              sx={{ mb: 1 }}
              onChange={(e, newValue) => {
                if (!newValue) return;
                onDataChange(id, 'sumInsuredMode', newValue);

                if (newValue === 'Specify') {
                  onDataChange(id, 'sumInsuredOption', 'specify');
                  onDataChange(id, 'sumInsured', 0);
                } else {
                  const defaultSum = sumInsuredValues[0];
                  onDataChange(id, 'sumInsuredOption', defaultSum);
                  onDataChange(id, 'sumInsured', parseInt(defaultSum, 10));
                }
              }}
            >
              <ToggleButton value="Uniform" sx={{ '&.Mui-selected': selectedButtonStyle }}>
                Uniform
              </ToggleButton>
              <ToggleButton value="Various SI" sx={{ '&.Mui-selected': selectedButtonStyle }}>
                Various SI
              </ToggleButton>
              <ToggleButton value="Specify" sx={{ '&.Mui-selected': selectedButtonStyle }}>
                Specify
              </ToggleButton>
            </ToggleButtonGroup>

            <Typography variant="caption" display="block" ml={1}>
              {optionData.sumInsuredMode}
            </Typography>

            <RadioGroup value={optionData.sumInsuredOption} onChange={handleSumInsuredChange}>
              <Grid container>
                {sumInsuredValues.map((val) => (
                  <Grid item xs={6} key={val}>
                    <FormControlLabel
                      value={val}
                      control={<Radio />}
                      label={Number(val).toLocaleString('en-IN')}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>

            <TextField
              variant="standard"
              fullWidth
              placeholder="Enter Sum Insured"
              value={optionData.sumInsuredOption === 'specify' ? optionData.sumInsured : ''}
              onChange={handleManualSumInsuredChange}
              disabled={optionData.sumInsuredOption !== 'specify'}
            />
            <TextField
              variant="standard"
              fullWidth
              placeholder="Add Comment"
              sx={{ mt: 1 }}
            />
            <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
              Rs. {Number(optionData.sumInsured).toLocaleString('en-IN')}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1} alignItems="flex-start">
          <SectionLabel>Sum Insured Type</SectionLabel>
          <Grid item xs={8}>
            <ToggleButtonGroup
              value={optionData.sumInsuredType}
              exclusive
              fullWidth
              onChange={(e, newValue) => {
                if (newValue) onDataChange(id, 'sumInsuredType', newValue);
              }}
            >
              <ToggleButton value="Family Floater" sx={{ '&.Mui-selected': selectedButtonStyle }}>
                Family Floater
              </ToggleButton>
              <ToggleButton value="Individual" sx={{ '&.Mui-selected': selectedButtonStyle }}>
                Individual
              </ToggleButton>
              <ToggleButton value="Specify" sx={{ '&.Mui-selected': selectedButtonStyle }}>
                Specify
              </ToggleButton>
            </ToggleButtonGroup>
            <Typography variant="caption" display="block" ml={1}>
              {optionData.sumInsuredType}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ClaimsOptionCard;
