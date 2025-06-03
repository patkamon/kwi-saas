'use client';
import Box from '@mui/material/Box';
import { useState } from 'react';

import CreateNovelStepper from '@/components/stepper/createNovelStepper';
import CreateNovelForm from '@/components/form/createNovelForm';
import CreateMainCharacterForm from '@/components/form/createMainCharacterForm';
import ConfigurationForm from '@/components/form/configurationForm';

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
        {
          activeStep == 0 ? // first step
            <CreateNovelForm steps={steps} completed={completed} activeStep={activeStep} setActiveStep={setActiveStep} />
            : activeStep == 1 ? // second step
              <CreateMainCharacterForm steps={steps} completed={completed} activeStep={activeStep} setActiveStep={setActiveStep} />
              : activeStep == 2 ?// third step
              <ConfigurationForm steps={steps} completed={completed} activeStep={activeStep} setActiveStep={setActiveStep} />
                :  // fourth step
                <div className="flex justify-center items-center h-full">4</div>
        }
      </Box>
    </div>
  );
}
