export default function ModernOperations() {
  const leftPoints = [
    "Manual tasks slow execution.",
    "Bottlenecks restrict throughput.",
    "Disconnected workflows reduce visibility.",
  ];

  const rightPoints = [
    "Capacity constraints limit scalability.",
    "Operational complexity is inevitable.",
    "Operational inefficiency is not.",
  ];

  return (
    <section className="relative w-full py-20 md:py-32 lg:px-0 px-6 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <img src="/images/target.png" alt="Target Icon" className="h-12 w-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a1560] mb-6">
            The Reality of <br></br><span className="text-[#0a3d99] font-black">Modern Operations</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Organisations today operate within interconnected systems where small inefficiencies create significant
            performance drag.
          </p>
        </div>

        {/* Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-center justify-items-center">
          {/* Left Points */}
          <div className="flex flex-col gap-8 w-full">
            {leftPoints.map((point, idx) => (
              <div
                key={idx}
                className="bg-white px-5 py-3 rounded-full text-sm md:text-base text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 before:content-['•'] before:mr-2 before:text-[#0a1560] before:font-bold"
              >
                {point}
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center w-full">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
              <img src="/images/mordern-operation.png" alt="Modern Operations" className="w-full h-auto block" />
            </div>
          </div>

          {/* Right Points */}
          <div className="flex flex-col gap-8 w-full">
            {rightPoints.map((point, idx) => (
              <div
                key={idx}
                className="bg-white px-5 py-3 rounded-full text-sm md:text-base text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 before:content-['•'] before:mr-2 before:text-[#0a1560] before:font-bold"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
