import React, { useState } from 'react';
import '../components/WorkflowAccordion.css'; 
const steps = [
  {
    title: 'Requirements Analysis',
    content: 'Understand client needs, gather and define all project requirements clearly.',
  },
  {
    title: 'Ask About Deadlines and Restrictions',
    content: 'Clarify timelines, delivery constraints, and any technology restrictions.',
  },
  {
    title: 'Setting Up the Environment',
    content: 'Prepare dev environment, install dependencies, version control setup.',
  },
  {
    title: 'Programming',
    content: 'Write clean, modular, maintainable code while following best practices.',
  },
  {
    title: 'Testing My Results',
    content: 'Run tests, debug, and ensure everything works as expected across scenarios.',
  },
  {
    title: 'Supporting and Scaling My Code',
    content: 'Optimize performance and plan for future updates or scalability.',
  },
];

const WorkflowAccordion = () => {
  //  console.log("🛠 WorkflowAccordion Rendered"); // 
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="workflow-wrapper">
      <div className="workflow-left">
        <p className="workflow-heading">MY WORKFLOW</p>
        <div className="arrow-icon">↘</div>
      </div>

      <div className="workflow-right">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`accordion-item ${openIndex === index ? 'open' : ''}`}
            onClick={() => toggle(index)}
          >
            <div className="accordion-header">
              <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="step-title">{step.title}</span>
            </div>
            <div className="accordion-content">
              <p>{step.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowAccordion;
