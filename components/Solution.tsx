import React from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  Calendar,
  ClipboardCheck,
  Factory,
  LineChart,
  Package,
  Shield,
  Truck,
  UserPlus,
  Wallet,
} from "lucide-react";

interface AutomateCardItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const AUTOMATION_ITEMS: AutomateCardItem[] = [
  {
    title: "Data Processing",
    description: "Validation and clean-up workflows.",
    icon: LineChart,
  },
  {
    title: "Financial Approvals",
    description: "Invoice and expense routing.",
    icon: Wallet,
  },
  {
    title: "System Transfers",
    description: "Cross-platform data synchronization.",
    icon: ArrowLeftRight,
  },
  {
    title: "Compliance Reporting",
    description: "Automated regulatory documentation.",
    icon: Shield,
  },
  {
    title: "Customer Onboarding",
    description: "Seamless entry systems for new clients.",
    icon: UserPlus,
  },
];

const OPTIMISATION_ITEMS: AutomateCardItem[] = [
  {
    title: "Production Workflows",
    description: "Manufacturing and shop-floor operations.",
    icon: Factory,
  },
  {
    title: "Approval Workflows",
    description: "Multi-stage sign-off and routing.",
    icon: ClipboardCheck,
  },
  {
    title: "Supply Chain",
    description: "Logistics and fulfilment operations.",
    icon: Truck,
  },
  {
    title: "Service Delivery",
    description: "End-to-end fulfilment processes.",
    icon: Package,
  },
  {
    title: "Workforce Scheduling",
    description: "Allocation and capacity planning.",
    icon: Calendar,
  },
];

function WhatWeAutomateGrid({
  heading,
  items,
}: {
  heading: string;
  items: AutomateCardItem[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase mb-4">
        {heading}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isLast = idx === items.length - 1;

          return (
            <div
              key={item.title}
              className={`flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm border border-slate-100/80 ${
                isLast ? "sm:col-span-2" : ""
              }`}
            >
              <div
                className="flex-shrink-0 w-11 h-11 rounded-lg bg-[#E0E7FF] flex items-center justify-center"
                aria-hidden
              >
                <Icon className="w-5 h-5 text-[#3730A3]" strokeWidth={2} />
              </div>
              <div className="min-w-0 pt-0.5">
                <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h4>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const Solution = () => {
  return (
    <div
      className="relative w-full py-24 px-6 md:px-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/our-solutions-background.png')" }}
    >
      <div className="relative max-w-7xl mx-auto space-y-32">
        {/* Process Automation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative w-full aspect-[4/3] float-image">
            <Image
              src="/images/automations.png"
              alt="Process Automation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#3E4095] mb-3">
                Process Automation
              </h2>
              <p className="text-sm font-medium text-blue-400">
                Remove Manual Friction. Increase Operational Velocity.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              As a process intelligence company for Uk enterprises, Databliz systematically reviews your
              operations to find where automation will deliver the greatest return, then implements
              solutions that fit your existing infrastructure.
            </p>

            <WhatWeAutomateGrid heading="What We Automate" items={AUTOMATION_ITEMS} />
          </div>
        </div>

        {/* Process Optimisation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#3E4095] mb-3">
                Process Optimisation
              </h2>
              <p className="text-sm font-medium text-blue-400">
                Identify Constraints. Engineer Throughput.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Performance limitations often originate from hidden bottlenecks within interconnected
              workflows.  Using process intelligence and simulation modelling, we analyse operational systems to
              pinpoint constraints and design measurable improvements before implementation.
            </p>

            <WhatWeAutomateGrid heading="What We Optimise" items={OPTIMISATION_ITEMS} />
          </div>

          {/* Image Right */}
          <div className="relative w-full aspect-[4/3] order-1 lg:order-2 float-image float-image-delayed">
            <Image
              src="/images/optimisations.png"
              alt="Process Optimisation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solution;
