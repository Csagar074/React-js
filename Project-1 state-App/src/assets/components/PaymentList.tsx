import { useState } from "react";
import Plan100 from "./Plan100";
import Plan200 from "./Plan200";
import Plan300 from "./Plan300";
import Plan400 from "./Plan400";
import Plan500 from "./Plan500";
import PaymentInfo from "./PaymentInfo";

const plans = [
  { component: Plan100, price: 100 },
  { component: Plan200, price: 200 },
  { component: Plan300, price: 300 },
  { component: Plan400, price: 400 },
  { component: Plan500, price: 500 },  
];

export default function PaymentList() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const CurrentPlan = plans[currentStep].component;
  const isFirst = currentStep === 0;
  const isLast = currentStep === plans.length - 1;

  return (
    <div className="wrapper">
      <h1 className="title">🚕 Choose Your Cab</h1>

      {/* Step indicator */}
      <div className="stepIndicator">
        {plans.map((_, i) => (
          <div key={i} className={`stepDot ${i === currentStep ? "activeDot" : ""} ${i < currentStep ? "doneDot" : ""}`} />
        ))}
      </div>

      {/* Single plan card */}
      <div className="cardArea" key={currentStep}>
        <CurrentPlan
          active={selectedPlan === currentStep}
          onClick={() => setSelectedPlan(currentStep)}
        />
      </div>

      {/* Prev / Next buttons */}
      <div className="navButtons">
        <button
          className="navBtn prevBtn"
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={isFirst}
        >
          ← Prev
        </button>

        <span className="stepCount">{currentStep + 1} / {plans.length}</span>

        <button
          className="navBtn nextBtn"
          onClick={() => setCurrentStep((s) => s + 1)}
          disabled={isLast}
        >
          Next →
        </button>
      </div>

      {/* Live info */}
      <PaymentInfo activePlan={selectedPlan} onCancel={() => setSelectedPlan(null)} />
    </div>
  );
}
