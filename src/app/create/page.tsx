'use client';
import Box from '@mui/material/Box';
import { useState } from 'react';

import CreateNovelStepper from '@/components/stepper/createNovelStepper';
import CreateNovelForm from '@/components/form/createNovelForm';
import CreateMainCharacterForm from '@/components/form/createMainCharacterForm';
import ConfigurationForm from '@/components/form/configurationForm';
import PreviewForm from '@/components/form/previewForm';
import CreateChapterForm from '@/components/form/createChapterForm';

export default function CreateNovelPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [windowState, setWindowState] = useState("novel"); // can be 'novel', 'chapter', or 'character'
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    image_id: undefined,
  });

  const steps = [
    'Create Novel',
    'Create Main Characters',
    'Configuration',
    'Preview',
  ];

  const getClass = (origin: string) => {
    if (origin == windowState) {
      return 'border-l-2 border-gray-100 bg-white';
    }
    return 'bg-gray-200 text-gray-400';
  }

  return (
    <div className='mt-8 px-6 pb-8'>
      <Box sx={{ width: '100%' }}>
        {windowState == "novel" && <CreateNovelStepper steps={steps} activeStep={activeStep} />}
        <div className="flex-1 flex justify-center pb-4 pt-8 px-4">
          {
            windowState == "novel" && (activeStep == 0 ? // first step
              <CreateNovelForm formData={formData} setFormData={setFormData} steps={steps} completed={completed} activeStep={activeStep} setActiveStep={setActiveStep} />
              : activeStep == 1 ? // second step
                <CreateMainCharacterForm steps={steps} completed={completed} activeStep={activeStep} setActiveStep={setActiveStep} />
                : activeStep == 2 ?// third step
                  <ConfigurationForm steps={steps} completed={completed} activeStep={activeStep} setActiveStep={setActiveStep} />
                  :  // fourth step
                  <PreviewForm steps={steps} completed={completed} activeStep={activeStep} setActiveStep={setActiveStep} />)
          }
          {
            windowState == "chapter" && <CreateChapterForm />
          }
          {
            windowState == "character" && <CreateMainCharacterForm steps={steps} completed={completed} activeStep={activeStep} setActiveStep={setActiveStep} />
          }
          <div className="h-fit relative flex flex-col">
            <button onClick={() => { setWindowState("novel") }} className={`h-32 w-8 whitespace-nowrap rounded-tr-md ${getClass("novel")} flex justify-center items-center hover:cursor-pointer hover:bg-pink-200`}>
              <p className="md:rotate-90">นิยาย</p>
            </button>
            <button onClick={() => { setWindowState("chapter") }} className={`h-32 w-8 whitespace-nowrap ${getClass("chapter")} flex justify-center items-center hover:cursor-pointer hover:bg-pink-200`}>
              <p className="md:rotate-90">ตอน</p>
            </button>
            <button onClick={() => { setWindowState("character") }} className={`h-32  w-8 rounded-br-md whitespace-nowrap ${getClass("character")} flex justify-center items-center hover:cursor-pointer hover:bg-pink-200`}>
              <p className="md:rotate-90">ตัวละคร</p>
            </button>
          </div>
        </div>
      </Box>
    </div>
  );
}
