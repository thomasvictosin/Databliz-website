import React from 'react'
import Image from 'next/image'

interface SolutionItem {
  tag: string;
}

interface BenefitItem {
  text: string;
}

const Solution = () => {
  const automationTags: SolutionItem[] = [
    { tag: 'Precision Over Assumption' },
    { tag: 'Financial and Invoice workflows' },
    { tag: 'Customer onboarding systems' },
    { tag: 'Customer onboarding systems' },
    { tag: 'Customer onboarding systems' },
  ];

  const automationBenefits: BenefitItem[] = [
    { text: 'Lower operational cost' },
    { text: 'Faster turnaround times' },
    { text: 'Improved accuracy' },
    { text: 'Enhanced scalability' },
    { text: 'Automation is all about reducing people. It is about redistributing talent toward higher-value work.' },
  ];

  const optimisationTags: SolutionItem[] = [
    { tag: 'Production and Manufacturing workflows' },
    { tag: 'Service delivery systems' },
    { tag: 'Supply chain processes' },
    { tag: 'Workflow allocation models' },
    { tag: 'Multi-stage approval systems' },
  ];

  const optimisationBenefits: BenefitItem[] = [
    { text: 'Increased throughput' },
    { text: 'Reduced cycle time' },
    { text: 'Improved capacity planning' },
    { text: 'Reduced operational risk' },
    { text: 'Optimization without simulation is assumption. We remove assumption from the equation.' },
  ];

  return (
    <div
      className="relative w-full py-24 px-6 md:px-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/our-solutions-background.png')" }}
    >
     
     {/* Content */}
      <div className="relative max-w-7xl mx-auto space-y-32">
        
        {/* Process Automation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Left */}
          <div className="relative w-full aspect-[4/3]">
            <Image
              src="/images/automation.png"
              alt="Process Automation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>

          {/* Content Right */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#3E4095] mb-3">
                Process Automation
              </h2>
              <p className="text-lg font-semibold text-blue-400">
                Remove Manual Friction. Increase Operational Velocity.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Many organisations rely on manual workflows that consume time and introduce avoidable errors.
            </p>

            <p className="text-gray-700 leading-relaxed">
              We systematically assess your operations to identify high-impact automation opportunities and implement solutions that integrate seamlessly into your existing systems.
            </p>

            {/* What We Automate */}
            <div>
              <h3 className="text-[#3E4095] font-bold mb-4">What We Automate</h3>
              <div className="grid grid-cols-2 gap-3">
                {automationTags.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 border border-white/20 text-[#3E4095] px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {item.tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Business Outcomes */}
            <div>
              <h3 className="text-[#3E4095] font-bold mb-4">Business Outcomes</h3>
              <ul className="space-y-2 text-gray-700">
                {automationBenefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-blue-300 mt-1">•</span>
                    <span className="text-sm leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Process Optimisation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content Left */}
          <div className="space-y-6 order-2 lg:order-1">
            <div>
              <p className="text-sm text-blue-400 mb-2">Our Solution</p>
              <h2 className="text-4xl md:text-5xl font-black text-[#3E4095] mb-3">
                Process Optimisation
              </h2>
              <p className="text-lg font-semibold text-blue-400">
                Identify Constraints. Engineer Throughput.
              </p>
            </div>

            <p className="text-gray-900 leading-relaxed">
              Performance limitations often originate from hidden bottlenecks within interconnected workflows.
            </p>

            <p className="text-gray-900 leading-relaxed">
              Using process intelligence and simulation modelling, we analyse operational systems to pinpoint constraints and design measurable improvements before implementation.
            </p>

            {/* What We Automate */}
            <div>
              <h3 className="text-[#3E4095] font-bold mb-4">What We Automate</h3>
              <div className="grid grid-cols-2 gap-3">
                {optimisationTags.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 border border-white/20 text-[#3E4095] px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {item.tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Business Outcomes */}
            <div>
              <h3 className="text-[#3E4095] font-bold mb-4">Business Outcomes</h3>
              <ul className="space-y-2 text-[#3E4095]">
                {optimisationBenefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span className="text-sm leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image Right */}
          <div className="relative w-full aspect-[4/3] order-1 lg:order-2">
            <Image
              src="/images/optimisation.png"
              alt="Process Optimisation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Solution