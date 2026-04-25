"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

/**
 * Tag configuration with labels and Tailwind colors
 */
const TAGS_LEFT = [
  { label: "Agility", color: "bg-emerald-500" },
  { label: "Speed", color: "bg-indigo-600" },
  { label: "Improve accuracy", color: "bg-rose-800" },
  { label: "Efficiency", color: "bg-slate-700" },
  { label: "Scalability", color: "bg-orange-500" },
  { label: "compliance", color: "bg-green-600" },
  { label: "Reduce costs", color: "bg-blue-600" },
];

const TAGS_RIGHT = [
  { label: "Fast", color: "bg-emerald-500" },
  { label: "Growth", color: "bg-indigo-600" },
  { label: "Strong", color: "bg-rose-800" },
  { label: "Pride", color: "bg-slate-700" },
  { label: "Price", color: "bg-orange-500" },
  { label: "Courage", color: "bg-green-600" },
  { label: "Determine", color: "bg-blue-600" },
  { label: "Method", color: "bg-purple-600" },
];

interface ThrowableSectionProps {
  title: string;
  description: string;
  tags: Array<{ label: string; color: string }>;
}

const ThrowableSection = ({ title, description, tags }: ThrowableSectionProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create());
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const tagBodiesRef = useRef<Matter.Body[]>([]);

  useEffect(() => {
    // Intersection Observer to detect when section comes into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !isVisible) return;

    const engine = engineRef.current;
    const world = engine.world;
    world.gravity.y = 1; // Gravity effect

    // Set up the renderer
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: sceneRef.current.clientHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    const width = render.options.width || sceneRef.current.clientWidth;
    const height = render.options.height || sceneRef.current.clientHeight;

    // Create boundaries (Floor below visible area, Walls)
    const floor = Matter.Bodies.rectangle(
      width / 2,
      height + 22,
      width,
      40,
      { isStatic: true }
    );
    const leftWall = Matter.Bodies.rectangle(-22, height / 2, 40, height * 2, {
      isStatic: true,
    });
    const rightWall = Matter.Bodies.rectangle(width + 22, height / 2, 40, height * 2, {
      isStatic: true,
    });

    // Create tag bodies
    const tagBodies = tags.map((tag, i) => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const tagWidth = isMobile 
        ? tag.label.length * 6 + 24
        : tag.label.length * 8 + 40;
      return Matter.Bodies.rectangle(
        Math.random() * (width - 80) + 40,
        -30 - i * 25,
        tagWidth,
        32,
        {
          restitution: 0.8,
          friction: 0.5,
          frictionAir: 0.02,
          chamfer: { radius: 20 },
          render: { fillStyle: "transparent" },
        }
      );
    });

    tagBodiesRef.current = tagBodies;

    // Add mouse interaction
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    // Add all bodies to the world
    Matter.World.add(world, [floor, leftWall, rightWall, ...tagBodies, mouseConstraint]);

    // Update loop to sync DOM elements with physics bodies
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    const updateLoop = () => {
      const elements = containerRef.current?.querySelectorAll(".physics-tag");
      if (elements) {
        tagBodies.forEach((body, i) => {
          const el = elements[i] as HTMLElement;
          if (el) {
            el.style.transform = `translate(${
              body.position.x - el.offsetWidth / 2
            }px, ${body.position.y - el.offsetHeight / 2}px) rotate(${
              body.angle
            }rad)`;
          }
        });
      }
      requestAnimationFrame(updateLoop);
    };

    const animationId = requestAnimationFrame(updateLoop);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationId);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      if (render.canvas.parentElement) {
        render.canvas.remove();
      }
    };
  }, [tags, isVisible]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Apply repulsive force to nearby bodies
    tagBodiesRef.current.forEach((body) => {
      const dx = body.position.x - x;
      const dy = body.position.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const force = (150 - distance) / 150;
        Matter.Body.applyForce(body, body.position, {
          x: (dx / distance) * force * 0.002,
          y: (dy / distance) * force * 0.002,
        });
      }
    });
  };

  return (
    <div className="flex-1 bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100 flex flex-col min-h-[500px] md:min-h-[650px]">
      <div className="text-center mb-6 md:mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-[#3d418e] mb-3 md:mb-4">{title}</h3>
        <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>

      {/* Physics Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative flex-grow bg-[#f1f1f3] rounded-3xl overflow-hidden cursor-crosshair min-h-[250px] md:min-h-[350px]"
      >
        <div ref={sceneRef} className="absolute inset-0 z-0 pointer-events-none" />
        {tags.map((tag, i) => (
          <div
            key={i}
            className={`physics-tag absolute top-0 left-0 px-3 md:px-5 py-1.5 md:py-2 rounded-full text-white text-xs md:text-sm font-semibold select-none whitespace-nowrap z-10 transition-shadow hover:shadow-lg ${tag.color}`}
            style={{ willChange: "transform" }}
          >
            {tag.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-[#3d418e] mb-4">
            Design Intelligent Processes.
          </h1>
          <h2 className="text-5xl font-bold text-[#3d418e] mb-10">
            Deliver Measurable Impact
          </h2>
          <div className="space-y-2 text-slate-500 text-lg">
            <p>Databiz helps organisations analyse, automate, and optimise their operational systems with precision.</p>
            <p>We combine structured process analysis, simulation modelling, and automation technologies to engineer sustainable performance improvements.</p>
          </div>
        </div>

        {/* Interactive Sections */}
        <div className="grid lg:grid-cols-2 gap-10">
          <ThrowableSection
            title="Process Automation"
            description="We identify repetitive, rule-based tasks embedded within your operations and design automation solutions that eliminate manual friction."
            tags={TAGS_LEFT}
          />
          <ThrowableSection
            title="Process Optimization"
            description="We analyse end-to-end workflows to identify constraints, inefficiencies, and performance gaps. Through simulation modelling, we test improvement scenarios."
            tags={TAGS_RIGHT}
          />
        </div>
      </div>
    </main>
  );
}