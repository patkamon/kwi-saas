import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function CreateNovelStepper({ steps = ['Create Novel', 'Create Main Characters', 'Configuration', 'Preview'], activeStep = 0 }: { steps?: string[], activeStep?: number }) {
    return (
        <div className="mx-24">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}