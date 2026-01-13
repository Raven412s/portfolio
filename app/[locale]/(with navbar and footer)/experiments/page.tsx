import ImageRipple from '@/components/visuals/image-ripple/ImageRipple';
import React, { ReactNode } from 'react';

interface ExperimentSectionProps {
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

const ExperimentSection = ({
  title = "Experiment Title",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit explicabo amet, nam magni perspiciatis cumque asperiores eum eos quos quam? Commodi assumenda aliquam ipsam ea ipsum similique quidem, magni neque nostrum optio temporibus laboriosam voluptate voluptas tempore provident delectus aperiam cumque!",
  className = '',
  children
}: ExperimentSectionProps) => {
  return (
    <section className={`group relative overflow-hidden rounded-3xl dark:bg-linear-to-br dark:from-neutral-900/90 dark:to-black/90 bg-linear-to-br from-white/95 to-neutral-100/95 backdrop-blur-sm border dark:border-neutral-800/50 border-neutral-200/70 shadow-2xl transition-all duration-500 dark:hover:border-cyan-500/30 hover:border-blue-400/50 dark:hover:shadow-cyan-500/10 hover:shadow-blue-500/20 ${className}`}>
      {/* Background Glow Effect */}
      <div className="absolute inset-0 dark:bg-linear-to-br dark:from-cyan-500/5 dark:to-purple-500/5 bg-linear-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 dark:bg-[linear-linear(rgba(255,255,255,0.03)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[linear-linear(rgba(0,0,0,0.05)_1px,transparent_1px),linear-linear(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-size-[50px_50px] opacity-30" />
      
      <div className="relative z-10 p-8 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full dark:bg-linear-to-r dark:from-cyan-500 dark:to-purple-500 bg-linear-to-r from-blue-600 to-indigo-600 animate-pulse" />
            <span className="text-sm font-medium dark:text-cyan-400/80 text-blue-600/80 tracking-wider uppercase">
              Interactive Experiment
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold dark:bg-linear-to-r dark:from-white dark:via-cyan-100 dark:to-white bg-linear-to-r from-neutral-900 via-blue-800 to-neutral-900 bg-clip-text text-transparent">
            {title}
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Description Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full dark:bg-cyan-500 bg-blue-600" />
                <h2 className="text-xl font-semibold dark:text-white/90 text-neutral-900">Experiment Description</h2>
              </div>
              <p className="dark:text-neutral-300/80 text-neutral-700/90 leading-relaxed text-lg">
                {description}
              </p>
            </div>

            {/* Stats or Metadata can go here */}
            <div className="flex gap-6 pt-4 dark:border-t dark:border-neutral-800/50 border-t border-neutral-200/70">
              <div className="text-center">
                <div className="text-2xl font-bold dark:text-cyan-400 text-blue-700">WebGL</div>
                <div className="text-sm dark:text-neutral-400 text-neutral-600">Rendering</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold dark:text-purple-400 text-indigo-700">Real-time</div>
                <div className="text-sm dark:text-neutral-400 text-neutral-600">Interaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold dark:text-green-400 text-emerald-700">Shader</div>
                <div className="text-sm dark:text-neutral-400 text-neutral-600">Effects</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button className="px-6 py-3 dark:bg-linear-to-r dark:from-cyan-600 dark:to-cyan-700 bg-linear-to-r from-blue-600 to-blue-700 dark:text-white text-white rounded-xl font-medium dark:hover:from-cyan-500 dark:hover:to-cyan-600 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 dark:hover:shadow-lg dark:hover:shadow-cyan-500/25 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95">
                Launch Experiment
              </button>
              <button className="px-6 py-3 dark:border dark:border-neutral-700 border border-neutral-300 dark:text-neutral-300 text-neutral-700 rounded-xl font-medium dark:hover:bg-neutral-800/50 hover:bg-neutral-100/70 dark:hover:border-neutral-600 hover:border-neutral-400 transition-all duration-300 active:scale-95">
                View Code
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full dark:bg-purple-500 bg-indigo-600" />
                <h2 className="text-xl font-semibold dark:text-white/90 text-neutral-900">Interactive Demo</h2>
              </div>
              
              {/* Children Content - ImageRipple will be passed here */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl dark:border dark:border-neutral-800/50 border border-neutral-300/70 dark:bg-linear-to-br dark:from-neutral-900 dark:to-black bg-linear-to-br from-white to-neutral-50 p-1 min-h-75 flex items-center justify-center">
                  {/* Interactive Hover Effect */}
                  <div className="absolute inset-0 dark:bg-linear-to-r dark:from-cyan-500/10 dark:to-purple-500/10 bg-linear-to-r from-blue-500/10 to-indigo-500/10 blur-xl opacity-50" />
                  
                  {/* Children Content */}
                  <div className="relative z-20 w-full h-full">
                    {children}
                  </div>
                  
                  <div className="absolute inset-0 dark:bg-linear-to-t dark:from-black/30 dark:to-transparent bg-linear-to-t from-white/30 to-transparent z-10 rounded-xl" />
                </div>
                
                {/* Interactive Hover Effect */}
                <div className="absolute -inset-4 dark:bg-linear-to-r dark:from-cyan-500/0 dark:via-cyan-500/10 dark:to-purple-500/0 bg-linear-to-r from-blue-500/0 via-blue-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700" />
              </div>
            </div>

            {/* Controls Panel */}
            <div className="p-4 rounded-xl dark:bg-neutral-900/50 bg-white/80 border dark:border-neutral-800/50 border-neutral-200/70 backdrop-blur-sm">
              <h3 className="text-lg font-semibold dark:text-white/90 text-neutral-900 mb-3">Experiment Controls</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm dark:text-neutral-400 text-neutral-600 mb-2">Ripple Intensity</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    defaultValue="5"
                    className="w-full h-2 dark:bg-neutral-700 bg-neutral-300 rounded-lg appearance-none cursor-pointer dark:[&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:bg-blue-600 dark:[&::-webkit-slider-thumb]:hover:bg-cyan-400 [&::-webkit-slider-thumb]:hover:bg-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm dark:text-neutral-400 text-neutral-600 mb-2">Wave Speed</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    defaultValue="3"
                    className="w-full h-2 dark:bg-neutral-700 bg-neutral-300 rounded-lg appearance-none cursor-pointer dark:[&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:bg-indigo-600 dark:[&::-webkit-slider-thumb]:hover:bg-purple-400 [&::-webkit-slider-thumb]:hover:bg-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperimentsPage = () => {
  return (
    <main className="min-h-screen w-full relative dark:bg-linear-to-b dark:from-neutral-950 dark:to-black bg-linear-to-b from-white to-neutral-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 dark:bg-cyan-500/5 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 dark:bg-purple-500/5 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full dark:bg-neutral-900/50 bg-white/80 border dark:border-neutral-800/50 border-neutral-300/70 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 rounded-full dark:bg-cyan-500 bg-blue-600 animate-pulse" />
              <span className="text-sm dark:text-cyan-400 text-blue-700 font-medium">Visual Experiments</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="dark:bg-linear-to-r dark:from-cyan-400 dark:via-white dark:to-purple-400 bg-linear-to-r from-blue-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Image Ripple
              </span>
              <span className="block text-2xl md:text-3xl dark:text-neutral-400 text-neutral-600 mt-4 font-normal">
                Interactive Water Ripple Simulation
              </span>
            </h1>
            
            <p className="text-xl dark:text-neutral-400 text-neutral-700 max-w-3xl mx-auto">
              Experience real-time water ripple effects on images using WebGL shaders. 
              Click and drag to create dynamic ripples that interact with your cursor.
            </p>
          </div>

          {/* Main Experiment Section */}
          <div className="space-y-8">
            <ExperimentSection
              title="Image Ripple Effect"
              description="A real-time water ripple simulation that transforms images with interactive wave patterns. This experiment uses WebGL shaders to create realistic ripple effects that respond to mouse interactions. The physics-based simulation calculates wave propagation, reflection, and damping to achieve natural-looking water surface dynamics."
            >
              {/* ImageRipple as children */}
              <ImageRipple
                src='/assets/images/bg-lines.webp'
                className="w-full h-75 md:h-100 object-cover rounded-xl shadow-2xl"
              />
            </ExperimentSection>

            {/* Additional Info Sections */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl dark:bg-linear-to-br dark:from-neutral-900/80 dark:to-black/80 bg-linear-to-br from-white/90 to-neutral-100/90 border dark:border-neutral-800/50 border-neutral-300/70 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-lg dark:bg-cyan-500/20 bg-blue-500/20 flex items-center justify-center mb-4">
                  <span className="dark:text-cyan-400 text-blue-600">⚡</span>
                </div>
                <h3 className="text-xl font-semibold dark:text-white text-neutral-900 mb-3">Real-time Performance</h3>
                <p className="dark:text-neutral-400 text-neutral-700">Optimized WebGL shaders running at 60 FPS for smooth interactions.</p>
              </div>
              
              <div className="p-6 rounded-2xl dark:bg-linear-to-br dark:from-neutral-900/80 dark:to-black/80 bg-linear-to-br from-white/90 to-neutral-100/90 border dark:border-neutral-800/50 border-neutral-300/70 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-lg dark:bg-purple-500/20 bg-indigo-500/20 flex items-center justify-center mb-4">
                  <span className="dark:text-purple-400 text-indigo-600">🎮</span>
                </div>
                <h3 className="text-xl font-semibold dark:text-white text-neutral-900 mb-3">Interactive Controls</h3>
                <p className="dark:text-neutral-400 text-neutral-700">Adjust ripple parameters in real-time for different visual effects.</p>
              </div>
              
              <div className="p-6 rounded-2xl dark:bg-linear-to-br dark:from-neutral-900/80 dark:to-black/80 bg-linear-to-br from-white/90 to-neutral-100/90 border dark:border-neutral-800/50 border-neutral-300/70 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-lg dark:bg-green-500/20 bg-emerald-500/20 flex items-center justify-center mb-4">
                  <span className="dark:text-green-400 text-emerald-600">🔧</span>
                </div>
                <h3 className="text-xl font-semibold dark:text-white text-neutral-900 mb-3">Customizable</h3>
                <p className="dark:text-neutral-400 text-neutral-700">Easily modify wave properties and integrate with different images.</p>
              </div>
            </div>

            {/* How It Works Section */}
            <div className="p-8 rounded-3xl dark:bg-linear-to-br dark:from-neutral-900/90 dark:to-black/90 bg-linear-to-br from-white/95 to-neutral-100/95 border dark:border-neutral-800/50 border-neutral-300/70 backdrop-blur-sm">
              <h2 className="text-3xl font-bold dark:text-white text-neutral-900 mb-6">How It Works</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold dark:text-cyan-400 text-blue-700 mb-4">Technical Implementation</h3>
                  <ul className="space-y-3 dark:text-neutral-400 text-neutral-700">
                    <li className="flex items-start gap-2">
                      <span className="dark:text-cyan-500 text-blue-600 mt-1">•</span>
                      Uses WebGL fragment shaders for pixel manipulation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="dark:text-cyan-500 text-blue-600 mt-1">•</span>
                      Physics simulation based on wave equation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="dark:text-cyan-500 text-blue-600 mt-1">•</span>
                      Real-time mouse tracking for interaction
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="dark:text-cyan-500 text-blue-600 mt-1">•</span>
                      GPU acceleration for optimal performance
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold dark:text-purple-400 text-indigo-700 mb-4">Features</h3>
                  <ul className="space-y-3 dark:text-neutral-400 text-neutral-700">
                    <li className="flex items-start gap-2">
                      <span className="dark:text-purple-500 text-indigo-600 mt-1">•</span>
                      Click and drag to create ripples
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="dark:text-purple-500 text-indigo-600 mt-1">•</span>
                      Adjustable wave properties
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="dark:text-purple-500 text-indigo-600 mt-1">•</span>
                      Support for various image types
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="dark:text-purple-500 text-indigo-600 mt-1">•</span>
                      Mobile touch support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExperimentsPage;