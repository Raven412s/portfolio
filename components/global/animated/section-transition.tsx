"use client" // Ensure this is "use client" for Next.js
import gsap from 'gsap'
import React from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

function SectionTransition({ children, className }: { children?: React.ReactNode, className?: string }) {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      // Create a timeline for more control over the "exit" animation
      gsap.to(element, {
        scale: 0.6,   // Scale down
        rotateX: 17.8,  // Subtle 3D rotation
        skewY: 5,     // Skew effect
        y: -100,      // Move up as we scroll past
        opacity: 0.32,
        ease: "none", // Scrubbing feels better with no ease
        scrollTrigger: {
          trigger: element,
          start: "top top",     // Start when the top of section hits top of viewport
          end: "bottom top",    // End when the bottom of section hits top of viewport
          scrub: true,          // Syncs animation progress to scrollbar
          // markers: true,     // Uncomment this to debug the start/end points
        }
      });
    }, sectionRef); // Scope the selector to the ref

    return () => ctx.revert();
  }, []);

  return (
    // Added perspective to the wrapper to make rotateX look 3D
    <div style={{ perspective: "4800px" }} className='size-full'>
      <section 
        ref={sectionRef} 
        className={cn("w-full h-full will-change-transform", className)}
      >
        {children}
      </section>
    </div>
  )
}

export default SectionTransition