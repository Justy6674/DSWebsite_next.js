import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MedicalDisclaimerProps {
  compact?: boolean;
}

export const MedicalDisclaimer: React.FC<{
  children?: React.ReactNode;
}> = ({
  compact = false,
  children
}) => {
  if (compact) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
        <p className="text-blue-800">
          <AlertCircle className="inline h-4 w-4 mr-1" />
          This information is general in nature. Individual results may vary. Consult a healthcare professional for personalised medical advice.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-2">Medical Disclaimer</p>
          <p className="mb-2">
            The information provided on this website is for general informational purposes only and is not intended 
            as a substitute for professional medical advice, diagnosis, or treatment. Individual results may vary. 
            Always seek the advice of your physician or qualified healthcare provider with any questions you may have regarding a medical condition.
          </p>
          <p>
            Weight management programs should be undertaken with proper medical supervision. 
            Downscale Weight Loss Clinic provides services under the supervision of registered healthcare practitioners.
          </p>
        </div>
      </div>
    </div>
  );
};

export const YMYLNotice: React.FC<{
  children?: React.ReactNode;
}> = (
  {
    children
  }
) => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-6">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold mb-2">Important Health Information</p>
          <p>
            This content relates to health and medical topics. While we strive to provide accurate and up-to-date 
            information, it should not replace professional medical consultation. Our healthcare practitioners are 
            registered with AHPRA and follow evidence-based clinical guidelines. Individual results may vary.
          </p>
        </div>
      </div>
    </div>
  );
};