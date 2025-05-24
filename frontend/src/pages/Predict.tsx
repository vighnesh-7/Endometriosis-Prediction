
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const featureNames = [
  "Chronic_Pain_Level",
  "BMI",
  "Age",
  "Hormone_Level_Abnormality",
  "Menstrual_Irregularity",
  "Infertility"
];

const booleanFields = ["Hormone_Level_Abnormality", "Menstrual_Irregularity", "Infertility"];

interface FeatureGuide {
  name: string;
  description: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
  isBoolean?: boolean;
}

const featureGuides: FeatureGuide[] = [
  {
    name: "Chronic_Pain_Level",
    description: "Rate your chronic pelvic pain level from 1 (mild) to 10 (severe)",
    min: 1,
    max: 10,
    step: 1
  },
  {
    name: "BMI",
    description: "Body Mass Index (weight in kg / height in m²)",
    min: 15,
    max: 45,
    step: 0.1,
    unit: "kg/m²"
  },
  {
    name: "Age",
    description: "Your current age",
    min: 12,
    max: 65,
    step: 1,
    unit: "years"
  },
  {
    name: "Hormone_Level_Abnormality",
    description: "Do you have hormone level abnormalities?",
    min: 0,
    max: 1,
    step: 1,
    isBoolean: true
  },
  {
    name: "Menstrual_Irregularity",
    description: "Do you experience menstrual irregularity?",
    min: 0,
    max: 1,
    step: 1,
    isBoolean: true
  },
  {
    name: "Infertility",
    description: "Have you experienced fertility issues?",
    min: 0,
    max: 1,
    step: 1,
    isBoolean: true
  }
];

const Predict: React.FC = () => {
  const [inputs, setInputs] = useState<string[]>(Array(featureNames.length).fill(""));
  const [sliderValues, setSliderValues] = useState<number[]>(
    featureGuides.map(guide => guide.isBoolean ? 0 : (guide.min + guide.max) / 2)
  );
  const [booleanValues, setBooleanValues] = useState<boolean[]>(
    featureGuides.map(guide => guide.isBoolean ? false : false)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  
  const handleChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    
    // Update slider if valid number and not a boolean field
    if (!featureGuides[index].isBoolean && !isNaN(Number(value))) {
      const newSliderValues = [...sliderValues];
      newSliderValues[index] = Number(value);
      setSliderValues(newSliderValues);
    }
  };
  
  const handleSliderChange = (index: number, value: number[]) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = value[0];
    setSliderValues(newSliderValues);
    
    const newInputs = [...inputs];
    newInputs[index] = String(value[0]);
    setInputs(newInputs);
  };
  
  const handleBooleanChange = (index: number, checked: boolean) => {
    const newBooleanValues = [...booleanValues];
    newBooleanValues[index] = checked;
    setBooleanValues(newBooleanValues);
    
    const newInputs = [...inputs];
    newInputs[index] = checked ? "1" : "0";
    setInputs(newInputs);
    
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = checked ? 1 : 0;
    setSliderValues(newSliderValues);
  };
  
  const handleSubmit = async () => {
    if (inputs.some(input => input === "")) {
      toast.error("Please fill all fields before prediction");
      return;
    }
    
    setIsLoading(true);
    try {
      const features = inputs.map(Number);
      const res = await axios.post("http://localhost:5000/predict", {
        features,
      });
      
      setResult(res.data.prediction);
      
      if (res.data.prediction === 1) {
        toast.warning("Prediction indicates a high risk of endometriosis. Please consult a healthcare professional.", {
          duration: 6000
        });
      } else {
        toast.success("Prediction indicates low risk of endometriosis.", {
          duration: 4000
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Error connecting to prediction service. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetForm = () => {
    setInputs(Array(featureNames.length).fill(""));
    setSliderValues(featureGuides.map(guide => guide.isBoolean ? 0 : (guide.min + guide.max) / 2));
    setBooleanValues(featureGuides.map(() => false));
    setResult(null);
  };
  
  const formatValue = (index: number, value: string | number): string => {
    const guide = featureGuides[index];
    if (guide.isBoolean) {
      return Number(value) === 1 ? "Yes" : "No";
    }
    if (guide.unit) {
      return `${value} ${guide.unit}`;
    }
    return String(value);
  };

  return (
    <div className="flex flex-col min-h-screen py-12 prediction-wrapper">
      <div className="container px-4 md:px-6 mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Endometriosis Risk Assessment</h1>
          <p className="text-muted-foreground">
            Complete the form below for an AI-powered analysis of endometriosis risk factors
          </p>
        </div>
        
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>
              Enter your health details accurately for the best prediction results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {featureGuides.map((guide, idx) => (
                <div key={idx} className="form-input-wrapper">
                  <Label htmlFor={`feature-${idx}`} className="form-label">
                    {guide.name.replace(/_/g, " ")}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    {guide.description}
                  </p>
                  
                  {guide.isBoolean ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">No</span>
                      <Switch
                        id={`feature-${idx}`}
                        checked={booleanValues[idx]}
                        onCheckedChange={(checked) => handleBooleanChange(idx, checked)}
                      />
                      <span className="text-sm">Yes</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_160px] gap-4 items-center">
                      <div className="space-y-2">
                        <Slider
                          value={[sliderValues[idx]]}
                          min={guide.min}
                          max={guide.max}
                          step={guide.step}
                          onValueChange={(value) => handleSliderChange(idx, value)}
                          className="py-4"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{guide.min}</span>
                          <span>{guide.max}</span>
                        </div>
                      </div>
                      <Input
                        id={`feature-${idx}`}
                        type="number"
                        min={guide.min}
                        max={guide.max}
                        step={guide.step}
                        value={inputs[idx]}
                        onChange={(e) => handleChange(idx, e.target.value)}
                        className="text-right"
                      />
                    </div>
                  )}
                  
                  <div className="mt-1 text-right text-sm">
                    Current value: <span className="font-medium">
                      {guide.isBoolean 
                        ? (booleanValues[idx] ? "Yes" : "No") 
                        : formatValue(idx, sliderValues[idx] || guide.min)}
                    </span>
                  </div>
                </div>
              ))}
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                <Button 
                  onClick={handleSubmit} 
                  disabled={isLoading}
                  className="bg-endo hover:bg-endo/90 text-white"
                >
                  {isLoading ? "Processing..." : "Get Prediction"}
                </Button>
                <Button onClick={resetForm} variant="outline" disabled={isLoading}>
                  Reset Form
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {result !== null && (
          <Card className={`animate-fade-in ${result === 1 ? 'border-red-300' : 'border-green-300'}`}>
            <CardHeader>
              <CardTitle className={result === 1 ? 'text-red-600' : 'text-green-600'}>
                Prediction Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  result === 1 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}>
                  {result === 1 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 9v4"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {result === 1 
                    ? "Endometriosis Positive Detected" 
                    : "Endometriosis Negative Detected"
                  }
                </h3>
                <p className="text-muted-foreground">
                  {result === 1 
                    ? "Based on the provided information, our model detects patterns consistent with endometriosis. We recommend consulting a healthcare professional for further evaluation." 
                    : "Based on the provided information, our model does not detect strong patterns associated with endometriosis. However, if you're experiencing symptoms, please consult a healthcare professional."
                  }
                </p>
                
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground">
                    Disclaimer: This prediction is based on machine learning and should not replace professional medical diagnosis.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Predict;
