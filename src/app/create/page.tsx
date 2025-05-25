'use client';
import Box from '@mui/material/Box';
import { useState } from 'react';

import CreateNovelStepper from '@/components/stepper/createNovelStepper';
import CreateNovelForm from '@/components/form/createNovelForm';


export default function CreateNovelPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const steps = [
    'Create Novel',
    'Create Main Characters',
    'Configuration',
    'Preview',
  ];

  return (
    <div className='mt-8 px-6 pb-8'>
      <Box sx={{ width: '100%' }}>
        <CreateNovelStepper steps={steps} activeStep={activeStep} />
        <CreateNovelForm steps={steps} completed={completed} activeStep={activeStep} setActiveStep={setActiveStep} />
      </Box>
    </div>
  );
}
