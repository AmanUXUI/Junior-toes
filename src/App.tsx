/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  Heart,
  Palette,
  Music,
  Puzzle,
  BookOpen,
  Star,
  Users,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Camera,
  Instagram,
  Facebook,
  Youtube,
  ShieldCheck,
  Lightbulb,
  Menu,
  X,
  Play
} from "lucide-react";

// --- Components ---

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 450 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);

  useEffect(() => {
    let lastSparkleTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Add sparkle even more frequently for a maximum fullness trail
      const now = Date.now();
      if (now - lastSparkleTime > 25) {
        const colors = ["#FAD3CD", "#0189A5", "#48C9B0", "#F7DC6F"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const newSparkle = {
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 2.8 + 1.2, // Slightly more size variation
          color: color,
        };
        setSparkles((prev) => [...prev.slice(-80), newSparkle]); // Much higher limit for a massive, full trail
        lastSparkleTime = now;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <>
      {/* Sparkles */}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.9, 0], // Higher max brilliance
              scale: [0, 1.3, 0.7],
              y: sparkle.y + (Math.random() - 0.5) * 65, // Wider spread for a more atmospheric trail
              x: sparkle.x + (Math.random() - 0.5) * 65,
              rotate: Math.random() * 360
            }}
            transition={{ duration: 2.2, ease: "easeOut" }} // Even longer tail for maximum persistence
            style={{
              position: "fixed",
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
              pointerEvents: "none",
              zIndex: 9998,
              borderRadius: "2px", // Square/star-like but micro
              boxShadow: `0 0 8px ${sparkle.color}`,
            }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          width: isHovered ? 64 : 24,
          height: isHovered ? 64 : 24,
          backgroundColor: isHovered ? "rgba(1, 137, 165, 0.1)" : "rgba(248, 180, 169, 0.4)",
          border: isHovered ? "2px solid rgba(1, 137, 165, 0.4)" : "2px solid rgba(248, 180, 169, 0.6)",
        }}
        className="fixed z-[9999] pointer-events-none rounded-full flex items-center justify-center backdrop-blur-[1px] hidden md:flex"
        transition={{
          width: { type: "spring", stiffness: 300, damping: 20 },
          height: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 0.3 : 1,
            backgroundColor: isHovered ? "#0189A5" : "#F8B4A9"
          }}
          className="w-1.5 h-1.5 rounded-full"
        />
        {/* Subtle Glow */}
        <div
          className={`absolute inset-0 rounded-full blur-md opacity-20 transition-colors duration-300 ${isHovered ? 'bg-brand-sky' : 'bg-brand-soft-peach'}`}
        />
      </motion.div>
    </>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-8 left-0 right-0 z-50 px-4 md:px-6 pointer-events-none">
      <nav className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-full border-4 border-white bubbly-card-white pointer-events-auto flex items-center justify-between px-4 md:px-8 py-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
        <div className="flex items-center">
          <img
            src="https://i.postimg.cc/L52b2JkV/Main-JT-logo.png"
            alt="Junior Toes Logo"
            className="h-9 w-auto rotate-0"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 font-black text-[10px] uppercase tracking-[0.2em] text-brand-dove-gray">
          <a href="#home" className="text-brand-sky hover:scale-110 transition-transform">Home</a>
          <a href="#programs-grid" className="hover:text-brand-sky hover:scale-110 transition-transform">Programs</a>
          <a href="#mentors" className="hover:text-brand-sky hover:scale-110 transition-transform">Mentors</a>
          <a href="#testimonials" className="hover:text-brand-sky hover:scale-110 transition-transform">Stories</a>

          <button className="soft-bubbly-peach px-8 py-3 text-[10px] uppercase tracking-widest shadow-lg">
            Enroll Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden w-12 h-12 bg-brand-offwhite rounded-full flex items-center justify-center text-brand-primary border-2 border-white bubbly-card" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="lg:hidden absolute top-24 left-6 right-6 bg-white rounded-[40px] border-4 border-white bubbly-card-white p-8 pointer-events-auto"
          >
            <div className="flex flex-col gap-6 font-black text-xs uppercase tracking-widest text-center">
              <a href="#home" className="text-brand-primary" onClick={() => setIsOpen(false)}>Home</a>
              <a href="#programs-grid" className="text-brand-primary" onClick={() => setIsOpen(false)}>Programs</a>
              <a href="#testimonials" className="text-brand-primary" onClick={() => setIsOpen(false)}>Stories</a>
              <button className="soft-bubbly-peach w-full py-5 text-xs">
                Enroll Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  const heroImage = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200";

  // Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-25, 25]);
  const bgTranslateX = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const bgTranslateY = useTransform(springY, [-0.5, 0.5], [30, -30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      className="pt-36 pb-24 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* Background blobs from brand palette */}
      <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-brand-pale-yellow rounded-full opacity-30 blur-3xl animate-pulse" />
      <div className="absolute bottom-[-100px] left-[100px] w-[500px] h-[500px] bg-brand-mint rounded-full opacity-20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-soft-peach rounded-full opacity-[0.05] blur-[120px]" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-warm-peach/20 text-brand-sky rounded-full text-[9px] font-black uppercase tracking-[0.3em]">
            <span className="w-2 h-2 bg-brand-sky rounded-full animate-ping" />
            Admission Open 2026-27
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-display font-black text-brand-primary leading-[1.1] tracking-tight">
              Every Big Dream <br />
              Starts with <br />
              <span className="text-brand-sky italic font-hand transform inline-block -rotate-2 ml-1">Tiny</span> Toes
            </h1>
          </div>
          <div className="space-y-4">
            <p className="text-base text-brand-dove-gray leading-relaxed max-w-md font-normal">
              Junior Toes International Preschool Indiranagar is where children aged 2 to 6 grow into curious, confident little humans. If you've been searching for the best preschool near you, welcome home.
            </p>
            <div className="text-xs font-black text-brand-sky uppercase tracking-widest bg-brand-sky/5 inline-block px-3 py-1 rounded-lg">
              Based on Antah Prerana- Way of Learning
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-3 md:gap-6 pt-4">
            <button className="flex-1 min-w-[280px] md:min-w-0 md:w-auto soft-bubbly-white px-10 py-5 text-xs uppercase tracking-widest shadow-lg">
              Explore Programs
            </button>
            <button className="flex-1 min-w-[280px] md:min-w-0 md:w-auto soft-bubbly-peach px-10 py-5 text-xs uppercase tracking-widest shadow-lg">
              Enroll Your Child
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex items-center lg:justify-start justify-center p-10 group/cutout"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Centerpiece Large PNG Cutout */}
          <motion.div
            style={{
              rotateX: rotateX,
              rotateY: rotateY,
              x: translateX,
              y: translateY,
              perspective: 1200,
              transformStyle: "preserve-3d"
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
            className="relative z-10 w-[85%] mx-auto"
          >
            <img
              src="https://i.postimg.cc/HsbTnFpz/Cutout.png"
              alt="Happy Children Playing"
              className="w-full h-auto drop-shadow-[0_40px_80px_rgba(17,17,17,0.15)] group-hover/cutout:drop-shadow-[0_60px_100px_rgba(17,17,17,0.25)] transition-all duration-500 scale-100"
              referrerPolicy="no-referrer"
            />

            {/* Dynamic Light Overlay for 3D feel */}
            <motion.div
              style={{
                opacity: useTransform(rotateX, [-10, 10], [0.2, 0]),
                background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 70%)"
              }}
              className="absolute inset-0 pointer-events-none rounded-full blur-2xl"
            />
          </motion.div>

          {/* Magical Background Glows and Shapes */}
          <motion.div
            style={{ x: bgTranslateX, y: bgTranslateY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-brand-sky/10 via-transparent to-brand-soft-peach/10 rounded-full blur-[120px] -z-10"
          />
          <motion.div
            style={{ x: bgTranslateX, y: bgTranslateY }}
            animate={{
              rotate: 360,
              borderColor: [
                "#0189A5", // brand-sky
                "#FEFACF", // brand-pale-yellow
                "#D2E6DB", // brand-mint
                "#F8B4A9", // brand-soft-peach
                "#0189A5"  // back to start
              ]
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              borderColor: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-4 border-dashed rounded-full -z-10 hidden lg:block"
          />

          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-4 right-24 text-[#0284c7] embossed-icon"
          >
            <Star size={64} fill="currentColor" className="opacity-100" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const SlidingRibbon = () => {
  const items = [
    { text: "Music & Dance", icon: <Music size={18} /> },
    { text: "Puzzle Play", icon: <Puzzle size={18} /> },
    { text: "Story Time", icon: <BookOpen size={18} /> },
  ];

  return (
    <div className="bg-[#111111] text-white py-6 overflow-hidden italic font-black text-xl relative border-y border-white/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-16">
            <span className="text-[#FF7043]">{item.icon}</span>
            <span className="uppercase tracking-tighter">{item.text}</span>
            <span className="text-[#FF7043] font-black opacity-40">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};



const WhyChooseTimeline = () => {
  const steps = [
    {
      title: "Holistic Development",
      desc: "We nurture cognitive, emotional, social and physical growth together, not in isolation.",
      bubblyClass: "bubbly-card-peach",
      icon: "🌱",
      color: "brand-soft-peach"
    },
    {
      title: "International Curriculum",
      desc: "Globally proven early years frameworks with a warm, rooted Indian cultural identity.",
      bubblyClass: "bubbly-card-sky",
      icon: "🌍",
      color: "brand-sky"
    },
    {
      title: "Future-Ready Learning",
      desc: "India's first preschool designed to build entrepreneurial thinking from the very beginning.",
      bubblyClass: "bubbly-card-mint",
      icon: "🚀",
      color: "brand-mint"
    },
    {
      title: "Scientific Design",
      desc: "Our Antah Prerana Way blends Montessori methods with experiential activity-based learning.",
      bubblyClass: "bubbly-card-yellow",
      icon: "🔬",
      color: "brand-pale-yellow"
    }
  ];

  return (
    <section id="why-choose" className="py-16 lg:py-24 px-4 md:px-8 lg:px-12 bg-[#F8FBFF] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-sky opacity-[0.03] blur-[100px] -translate-x-1/2" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-soft-peach opacity-[0.03] blur-[80px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Content Column */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-block px-5 py-2 bg-brand-sky/10 text-brand-sky rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-sky/20">Selection Guide</div>
              <h2 className="text-4xl lg:text-5xl font-display font-black text-brand-primary leading-tight tracking-tight">Why Choose <br />Junior Toes?</h2>
              <p className="text-base text-brand-dove-gray font-normal max-w-xl leading-relaxed">
                Small class sizes, caring teachers, and a curriculum that treats every child as an individual.
              </p>
            </div>

            <div className="space-y-8 relative">
              {/* Simplified Vertical Line for Desktop */}
              <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-brand-sky/5 hidden lg:block" />

              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start relative group"
                >
                  <div className="w-16 h-16 rounded-full bg-white bubbly-card flex items-center justify-center text-3xl shadow-xl z-20 shrink-0 border-4 border-brand-offwhite group-hover:scale-110 transition-transform duration-500">
                    {s.icon}
                  </div>
                  <div className="space-y-1 pt-1">
                    <h3 className="text-xl font-black text-brand-primary leading-tight">{s.title}</h3>
                    <p className="text-brand-dove-gray font-normal text-sm leading-relaxed max-w-sm">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Collage Column */}
          <div className="relative hidden lg:block h-[700px] w-full">
            {/* Main large image - NOW IN FRONT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
              viewport={{ once: true }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 aspect-[4/5] bg-white p-4 pb-16 shadow-[0_50px_120px_-20px_rgba(17,17,17,0.2)] rounded-sm rotate-[-1deg] z-40"
            >
              <img
                src="https://i.postimg.cc/9FGLmyJZ/DSC00331.jpg"
                alt="Main Learning"
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="mt-4 flex justify-between items-center px-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary/30 font-display italic">#FuturePioneers</span>
                <Star className="text-brand-pale-yellow fill-brand-pale-yellow" size={16} />
              </div>
            </motion.div>

            {/* Overlapping secondary image 1 - PUSHED BACK & FURTHER OUT */}
            <motion.div
              initial={{ opacity: 0, x: 60, y: -60, rotate: 12 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 12 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute top-[-5%] right-[-10%] w-3/5 aspect-square bg-white p-3 pb-12 shadow-[0_30px_60px_-15px_rgba(17,17,17,0.1)] rounded-sm rotate-[12deg] z-10 group"
            >
              <img
                src="https://i.postimg.cc/hGQPk412/DSC00744.jpg"
                alt="Exploration"
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Overlapping secondary image 2 - PUSHED BACK & FURTHER OUT */}
            <motion.div
              initial={{ opacity: 0, x: -60, y: 60, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: -10 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-[-5%] left-[-10%] w-1/2 aspect-square bg-white p-3 pb-10 shadow-[0_25px_50px_-12px_rgba(17,17,17,0.1)] rounded-sm rotate-[-10deg] z-10 group"
            >
              <img
                src="https://i.postimg.cc/13mfgZct/DSC00362.jpg"
                alt="Success"
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Programs = () => {
  const programs = [
    {
      name: "Playgroup (Sparklers)",
      age: "2 – 3 years",
      desc: "A gentle, loving introduction to group learning through sensory play, songs, and stories in a safe, familiar environment.",
      img: "https://i.postimg.cc/9FGLmyJZ/DSC00331.jpg",
      color: "border-[#FF4D6D]",
      textColor: "text-[#FF4D6D]",
      tags: ["Sensory Play", "Motor Skills", "Rhymes", "Social Engagement"]
    },
    {
      name: "Nursery (Seekers)",
      age: "3 – 4 years",
      desc: "Building language, motor skills, and social confidence through structured play, phonics, and creative activities.",
      img: "https://i.postimg.cc/hGQPk412/DSC00744.jpg",
      color: "border-[#4CC9F0]",
      textColor: "text-[#4CC9F0]",
      tags: ["Early Literacy", "Numerical Foundation", "Art & Flow", "Music"]
    },
    {
      name: "Prep 1 (Pathfinders)",
      age: "4 – 5 years",
      desc: "Developing early literacy and numeracy alongside critical thinking, teamwork, and emotional intelligence.",
      img: "https://i.postimg.cc/T3JgS9QC/DSC01254.jpg",
      color: "border-[#72EFDD]",
      textColor: "text-[#107E7D]",
      tags: ["Logical Thinking", "Phonics Master", "Creative Writing", "Team Play"]
    },
    {
      name: "Prep 2 (Pioneers)",
      age: "5 – 6 years",
      desc: "Preparing children fully for primary school with advanced reading, writing, logical reasoning, and leadership skills.",
      img: "https://i.postimg.cc/13mfgZct/DSC00362.jpg",
      color: "border-[#FFD166]",
      textColor: "text-[#E6B032]",
      tags: ["Primary Prep", "Literacy Pro", "Critical Thinking", "Self-Expression"]
    },
    {
      name: "Day Daycare",
      age: "Working Parents",
      desc: "Safe, nurturing early childhood daycare with structured learning, rest, meals, and outdoor play for working parents.",
      img: "https://i.postimg.cc/3NZ37dqS/DSC01310.jpg",
      color: "border-[#9B5DE5]",
      textColor: "text-[#9B5DE5]",
      tags: ["Nutritious Meals", "Secure Nap", "Outdoor Play", "Story Times"]
    },
    {
      name: "After-School Enrichment",
      age: "All Ages",
      desc: "Dance, art, music, and STEM clubs that extend the joy of learning well beyond regular school hours.",
      img: "https://i.postimg.cc/rpWXMD0z/DSC01081.jpg",
      color: "border-[#00BCB4]",
      textColor: "text-[#00BCB4]",
      tags: ["STEM Explorers", "Modern Dance", "Vocal Music", "Clay Art"]
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const playSwish = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.15;
    audio.play().catch(() => { });
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % programs.length);
    playSwish();
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + programs.length) % programs.length);
    playSwish();
  };

  return (
    <section id="programs-grid" className="py-16 px-4 md:px-8 lg:px-12 bg-[#ECF5FF] overflow-hidden relative">
      {/* Background Decorative Elemets */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-sky/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-soft-peach/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-display font-black text-brand-primary tracking-tight leading-tight">Our Programs</h2>
          <p className="text-base text-brand-dove-gray font-normal max-w-lg mx-auto italic font-display">
            Designed progressively for your child's developmental milestones.
          </p>
        </div>

        <div className="relative h-[550px] lg:h-[600px] flex items-center justify-center">
          {/* Navigation Arrows */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center z-40 px-2 lg:-mx-16">
            <button
              onClick={prev}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-xl border-4 border-white hover:scale-110 active:scale-90 transition-all cursor-pointer group"
            >
              <div className="group-hover:-translate-x-1 transition-transform">
                <ChevronLeft size={20} strokeWidth={3} />
              </div>
            </button>
            <button
              onClick={next}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-xl border-4 border-white hover:scale-110 active:scale-90 transition-all cursor-pointer group"
            >
              <div className="group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} strokeWidth={3} />
              </div>
            </button>
          </div>

          {/* Cards Stack */}
          <div className="relative w-full max-w-lg h-full flex items-center justify-center perspective-1000">
            <AnimatePresence mode="popLayout" initial={false}>
              {programs.map((p, i) => {
                const distance = i - activeIndex;
                const isCenter = distance === 0;
                const isLeft = distance === -1 || (activeIndex === 0 && i === programs.length - 1);
                const isRight = distance === 1 || (activeIndex === programs.length - 1 && i === 0);

                if (!isCenter && !isLeft && !isRight) return null;

                let x = "0%";
                let scale = 1;
                let zIndex = 20;
                let opacity = 1;
                let rotateY = 0;
                let filter = "blur(0px)";

                if (isCenter) {
                  x = "0%";
                  scale = 1.05; // More prominent
                  zIndex = 30;
                  opacity = 1;
                  rotateY = 0;
                  filter = "blur(0px)";
                } else if (isLeft) {
                  x = isMobile ? "-35%" : "-55%"; // Adjusted for smaller containers
                  scale = isMobile ? 0.7 : 0.8;
                  zIndex = 10;
                  opacity = 0.5;
                  rotateY = isMobile ? 15 : 25;
                  filter = "blur(4px)";
                } else if (isRight) {
                  x = isMobile ? "35%" : "55%"; // Adjusted for smaller containers
                  scale = isMobile ? 0.7 : 0.8;
                  zIndex = 10;
                  opacity = 0.5;
                  rotateY = isMobile ? -15 : -25;
                  filter = "blur(4px)";
                }

                return (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, scale: 0.5, x: 0 }}
                    animate={{
                      x,
                      scale,
                      zIndex,
                      opacity,
                      rotateY,
                      filter
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                      opacity: { duration: 0.2 }
                    }}
                    whileHover="hover"
                    className={`absolute w-full max-w-[320px] md:max-w-[400px] bg-white rounded-[40px] overflow-hidden border-[6px] ${p.color} ${isCenter ? 'shadow-[0_40px_80px_-20px_rgba(17,17,17,0.2)]' : 'shadow-[0_15px_30px_-10px_rgba(17,17,17,0.1)]'} flex flex-col cursor-pointer transition-shadow group`}
                    onClick={() => {
                      if (!isCenter) {
                        setActiveIndex(i);
                        playSwish();
                      }
                    }}
                  >
                    <div className="h-56 w-full overflow-hidden relative shadow-md">
                      <motion.img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        variants={{
                          hover: { scale: 1.15 }
                        }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>

                    <div className="px-7 pb-7 pt-5 flex-grow space-y-4">
                      <div className="inline-block px-3 py-1.5 bg-brand-sky/5 text-brand-sky rounded-full text-[9px] font-black uppercase tracking-widest border border-brand-sky/10">
                        {p.age}
                      </div>

                      <div className="space-y-2">
                        <h3 className={`text-2xl font-display font-black leading-tight tracking-tight ${p.textColor}`}>{p.name}</h3>
                        <p className="text-brand-dove-gray font-normal text-xs leading-relaxed">{p.desc}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {p.tags.map((tag, ti) => (
                          <span key={ti} className="px-3 py-1 bg-brand-offwhite rounded-full text-[9px] font-black text-brand-primary/40 uppercase tracking-widest border border-brand-white shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const GalleryMoments = () => {
  const images = [
    "https://i.postimg.cc/Jz6sw2wq/DSC00203.jpg",
    "https://i.postimg.cc/1RG4RthN/DSC00435.jpg",
    "https://i.postimg.cc/hGQPk412/DSC00744.jpg",
    "https://i.postimg.cc/HW6DtDb6/DSC01392.jpg",
    "https://i.postimg.cc/qq5FHrLL/DSC01329.jpg",
    "https://i.postimg.cc/XJN1Zq1x/DSC00266.jpg",
    "https://i.postimg.cc/TY575Z0y/DSC00784.jpg",
    "https://i.postimg.cc/5t4Dzs6C/DSC00298.jpg",
    "https://i.postimg.cc/vm22VMJ5/DSC00688.jpg",
    "https://i.postimg.cc/0jPS5Kt9/DSC01037.jpg",
  ];

  // Duplicate for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <section id="gallery" className="py-16 bg-white overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 mb-12">
        <div className="text-center space-y-4">
          <div className="inline-block px-5 py-2 bg-brand-soft-peach/10 text-brand-soft-peach rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-soft-peach/20">Scrapbook</div>
          <h2 className="text-4xl lg:text-5xl font-display font-black text-brand-primary tracking-tight leading-tight">Gallery Moments</h2>
          <p className="text-base text-brand-dove-gray font-normal max-w-lg mx-auto">A scrapbook of smiles, laughter, and school life</p>
        </div>
      </div>

      <div className="relative">
        <motion.div
          animate={{
            x: [0, window.innerWidth < 768 ? -2560 : -3360], // Responsive offset
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-4 px-4"
        >
          {duplicatedImages.map((img, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-[240px] md:w-[320px] h-[300px] md:h-[400px] rounded-[40px] overflow-hidden shadow-[0_24px_48px_-12px_rgba(17,17,17,0.12)] border-6 border-white bubbly-card-white"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <img
                src={img}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-12 flex justify-center gap-3">
        <div className="w-8 h-1.5 bg-brand-soft-peach rounded-full shadow-sm" />
        <div className="w-1.5 h-1.5 bg-brand-soft-peach/30 rounded-full" />
        <div className="w-1.5 h-1.5 bg-brand-soft-peach/30 rounded-full" />
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      text: "We searched for months for the right kindergarten school near us. The moment we walked into Junior Toes Indiranagar, we felt it immediately. The warmth, the structure, the way the teachers spoke to the children. Our daughter has blossomed completely in just one term.",
      author: "Priya Menon",
      subtitle: "Parent of Anika, LKG",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      bubblyClass: "bubbly-card-peach"
    },
    {
      text: "As working parents, the early childhood daycare facility was a lifesaver. But what kept us loyal is the education quality. My son went from barely speaking in groups to confidently presenting at the year-end show. The teachers genuinely care about each child.",
      author: "Rohit & Deepa Nair",
      subtitle: "Parents of Arjun, Nursery",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      bubblyClass: "bubbly-card-sky"
    },
    {
      text: "Junior Toes International Preschool is not just the best preschool in Indiranagar. It is genuinely one of the finest early learning environments in Bangalore. The curriculum, the safety standards, the communication with parents. Everything is done right here.",
      author: "Sunita Rao",
      subtitle: "Parent of Ishaan, UKG",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
      bubblyClass: "bubbly-card-mint"
    },
    {
      text: "The play-based learning approach here is phenomenal. My son looks forward to school every single day. He's developed such a strong foundation in phonics and social skills, far exceeding our expectations for his age.",
      author: "Vikram & Kavitha",
      subtitle: "Parents of Advait, Playgroup",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      bubblyClass: "bubbly-card-peach"
    }
  ];

  return (
    <section id="testimonials" className="py-16 lg:py-24 px-4 md:px-8 lg:px-12 bg-[#F8FBFF] relative">
      <style>{`
        /* Global overflow-x-hidden breaks sticky positioning. Overriding here locally to comply with strict update instructions */
        .overflow-x-hidden { overflow-x: clip !important; }
      `}</style>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-5 py-2 bg-brand-sky/10 text-brand-sky rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-sky/20">Straight From Our Parents</div>
          <h2 className="text-4xl lg:text-5xl font-display font-black text-brand-primary tracking-tight leading-tight">Words That Mean <br />the World to Us</h2>
          <p className="max-w-2xl mx-auto text-base text-brand-dove-gray font-normal leading-relaxed italic mt-6">Nothing makes us prouder than hearing how Junior Toes Indiranagar changed a child's confidence, curiosity, and love for learning.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Summary Card Wrapper */}
          <div className="lg:col-span-4 h-full relative">
            {/* Sticky Content */}
            <div className="bg-white rounded-[48px] p-6 md:p-10 shadow-[0_32px_64px_-24px_rgba(17,17,17,0.15)] border-4 border-white bubbly-card-white lg:sticky lg:top-32">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-20 bg-brand-offwhite rounded-3xl flex items-center justify-center p-4">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="36" width="36" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                </div>
                <div>
                  <div className="text-brand-primary font-black text-[10px] uppercase tracking-widest opacity-40 mb-1">Google Reviews</div>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-display font-black text-brand-primary">4.8</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                    </div>
                  </div>
                  <div className="text-[10px] font-black text-brand-sky uppercase tracking-[0.2em] mt-1 italic">98% Satisfaction Rate</div>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {[
                  { star: 5, weight: '92%' },
                  { star: 4, weight: '6%' },
                  { star: 3, weight: '1%' },
                  { star: 2, weight: '1%' },
                  { star: 1, weight: '0%' }
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-brand-primary/40 w-4">{row.star}★</span>
                    <div className="flex-grow h-2 bg-brand-offwhite rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: row.weight }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-brand-sky rounded-full"
                      />
                    </div>
                    <span className="text-[10px] font-black text-brand-primary/60 w-8">{row.weight}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-5 text-brand-primary font-black text-[10px] uppercase tracking-widest bg-brand-offwhite rounded-3xl border-2 border-brand-sky/10 hover:bg-brand-sky hover:text-white hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                <ChevronLeft size={16} className="rotate-180" /> Write a Review on Google
              </button>
            </div>
          </div>

          {/* Testimonial Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={`bg-white p-6 md:p-10 rounded-[48px] shadow-[0_24px_48px_-12px_rgba(17,17,17,0.1)] border-4 border-white hover:shadow-[0_32px_64px_-16px_rgba(17,17,17,0.15)] transition-all duration-500 group cursor-default`}
              >
                <div className="flex items-center gap-2 mb-6">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                  <span className="text-[9px] font-black text-brand-primary/20 uppercase tracking-widest">Google Review</span>
                  <div className="flex text-yellow-400 ml-auto">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-brand-dove-gray text-base leading-relaxed font-normal italic">
                    "{review.text}"
                  </p>

                  <div className="flex items-center gap-5 pt-4 border-t border-brand-offwhite">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-black text-brand-primary text-sm tracking-tight">{review.author}</h4>
                      <p className="text-brand-sky font-bold text-[10px] uppercase tracking-widest">{review.subtitle}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-sky/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-soft-peach/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

const Mentors = () => {
  const mentors = [
    {
      name: "Sunitha Gowda",
      role: "Founder & Managing Director",
      institution: "Junior Toes",
      image: "https://www.juniortoes.com/static/media/sunithaa.a42b1326a2d56d773175.png",
      accent: "bg-brand-soft-peach"
    },
    {
      name: "Ashwini Puneeth Raj Kumar",
      role: "Co-Founder & Director",
      institution: "Junior Toes",
      image: "https://www.juniortoes.com/static/media/punithrajkumar.0a2a8b58297eec66c7c7.jpg",
      accent: "bg-brand-sky"
    },
    {
      name: "Spoorthi Vishwas",
      role: "Co-Founder & CEO",
      institution: "Junior Toes",
      image: "https://www.juniortoes.com/static/media/spoorthi.eef34828ca4b919ca189.jpg",
      accent: "bg-brand-mint"
    },
    {
      name: "Dr. Stella Pandhare",
      role: "Chief Academic Advisor",
      institution: "Expertise in Early Years",
      image: "https://i.postimg.cc/3wxF9TVT/Gemini-Generated-Image-i1qgrgi1qgrgi1qg.png",
      accent: "bg-brand-pale-yellow"
    },
    {
      name: "Shruthi Kiran",
      role: "Director",
      institution: "Junior Toes",
      image: "https://www.juniortoes.com/static/media/shruthukiran.4299bc7dd90c5fb65a16.jpg",
      accent: "bg-[#D4E6F1]"
    },
  ];

  return (
    <section id="mentors" className="pt-20 lg:pt-32 pb-16 px-4 md:px-8 lg:px-12 bg-[#FDFDFD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 space-y-4">
          <div className="inline-block px-5 py-2 bg-brand-primary/5 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-primary/10">The Leadership</div>
          <h2 className="text-4xl lg:text-6xl font-display font-black text-brand-primary tracking-tight leading-tight">Loving Mentors</h2>
          <p className="max-w-2xl mx-auto text-lg text-brand-dove-gray font-normal leading-relaxed">
            Guided by visionaries dedicated to shaping the future of early childhood education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {mentors.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Minimalist Portrait Container */}
              <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden mb-8 shadow-[0_20px_40px_-15px_rgba(17,17,17,0.1)] transition-all duration-500 group-hover:shadow-[0_30px_60px_-20px_rgba(17,17,17,0.15)]">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover grayscale-0 lg:grayscale transition-all duration-700 lg:group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle color overlay on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${m.accent}`} />
              </div>

              <div className="space-y-2 px-4 transition-transform duration-500 group-hover:translate-x-1">
                <h3 className="text-xl font-display font-black text-brand-primary tracking-tight">
                  {m.name}
                </h3>
                <div className="space-y-1">
                  <p className={`text-[10px] font-black uppercase tracking-widest text-brand-sky`}>
                    {m.role}
                  </p>
                  <p className="text-[10px] font-normal text-brand-dove-gray uppercase tracking-[0.1em]">
                    {m.institution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

const BrandPlaybook = () => {
  const cards = [
    {
      hashtag: "#NutritiousMeals",
      heading: "Nutritious Meals",
      description: "Freshly prepared, child-nutritionist-approved meals and snacks served every day.",
      image: "https://i.postimg.cc/rpj0hPhd/DSC01294.jpg",
      color: "text-brand-soft-peach", // Using similar peach color
      emojis: "🍎🥦",
      rotate: -2
    },
    {
      hashtag: "#CertifiedEducators",
      heading: "Certified Educators",
      description: "Every teacher holds an early childhood education certification and grows through ongoing training.",
      image: "https://i.postimg.cc/ydSKJJSK/DSC00176.jpg",
      color: "text-brand-sky",
      emojis: "👩‍🏫✨",
      rotate: 1
    },
    {
      hashtag: "#EntrepreneurialMindset",
      heading: "Entrepreneurial Mindset",
      description: "As India's first entrepreneurial preschool, we nurture initiative, creativity, and leadership from day one.",
      image: "https://i.postimg.cc/zGSVBQYS/DSC01173.jpg",
      color: "text-brand-mint",
      emojis: "🚀💡",
      rotate: 3
    }
  ];

  return (
    <section id="brand-playbook" className="py-20 lg:py-32 px-6 lg:px-12 bg-[#F9FBFF] relative overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#0189A5 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-5 py-2 bg-brand-primary/5 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-primary/10">The Identity</div>
          <h2 className="text-4xl lg:text-5xl font-display font-black text-brand-primary tracking-tight leading-tight">The Brand Playbook</h2>
          <p className="max-w-2xl mx-auto text-base text-brand-dove-gray font-normal leading-relaxed">
            These are mockups demonstrating how future social media posts visually align with our playful new identity and Brand Playbook.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: card.rotate }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, type: "spring" }}
              className="relative group lg:px-4"
            >
              {/* Tape Effect */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/60 backdrop-blur-sm shadow-sm border border-white/40 rotate-[-2deg] z-20 pointer-events-none" />

              {/* Polaroid Card */}
              <div className="bg-white p-6 pb-12 shadow-[0_20px_50px_rgba(17,17,17,0.06)] border border-brand-offwhite rounded-sm transform transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(17,17,17,0.12)] group-hover:-translate-y-2">
                <div className="aspect-square mb-8 overflow-hidden rounded-[2px] bg-brand-offwhite relative">
                  <img
                    src={card.image}
                    alt={card.heading}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-4 px-2">
                  <span className={`text-base font-black italic tracking-tight font-display ${card.color}`}>
                    {card.hashtag}
                  </span>
                  <p className="text-sm text-brand-dove-gray font-normal leading-relaxed">
                    {card.description}
                  </p>

                  <div className="pt-6 border-t border-dashed border-brand-offwhite flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary/20">By juniortoes</span>
                    <span className="text-xl filter drop-shadow-sm">{card.emojis}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-sky/5 rounded-full blur-[140px] pointer-events-none" />
    </section>
  );
};


const CampusLocation = () => {
  const mapLink = "https://www.google.com/maps/place/Junior+Toes+International+Preschool+%26+Daycare+-+Indiranagar/data=!4m2!3m1!1s0x0:0xcd3524793775ba40?sa=X&ved=1t:2428&ictx=111";

  return (
    <section id="location-map" className="py-10 lg:py-16 px-6 lg:px-12 bg-white relative">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Main Card Container */}
        <div className="bg-[#f0f4f9] rounded-[48px] p-6 lg:p-10 shadow-[0_40px_100px_-20px_rgba(17,17,17,0.08)] relative text-left">

          {/* Header Info */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
            <div className="space-y-4">
              <div className="inline-block px-5 py-2 bg-brand-sky/10 text-brand-sky rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-sky/20">Find Our Campus</div>
              <h2 className="text-4xl lg:text-5xl font-display font-black text-brand-primary tracking-tight leading-tight">Visit Junior Toes <br />Indiranagar</h2>
              <p className="max-w-md text-brand-dove-gray font-normal leading-relaxed">
                Located in the heart of Indiranagar, our campus is designed to be a safe, vibrant haven for your little ones.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 lg:pt-0">
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-brand-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-lg hover:shadow-brand-primary/20 flex items-center gap-3"
              >
                Get Directions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Map Embed and Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

            {/* Map Preview/Embed Area */}
            <div className="lg:col-span-2 group">
              <div className="relative h-full min-h-[350px] rounded-[32px] overflow-hidden border-4 border-white shadow-inner bg-white/50">
                {/* Real Google Maps Iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15551.782869550774!2d77.6433291!3d12.9753177!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a048a1496b%3A0xcd3524793775ba40!2sJunior+Toes+International+Preschool+%26+Daycare+-+Indiranagar!5e0!3m2!1sen!2sin!4v1714578112345!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-4 lg:sticky lg:top-32 self-start">
              <div className="bg-white rounded-[32px] p-8 h-full shadow-sm border border-black/5 hover:border-brand-sky/20 transition-all group">
                <div className="space-y-8">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-sky mb-4 block">Campus Address</span>
                    <p className="text-brand-primary font-normal leading-relaxed">
                      #36, 4th Cross, <br />
                      Coconut Grove Layout, <br />
                      Indiranagar 1st Stage, <br />
                      Bengaluru, Karnataka 560038
                    </p>
                  </div>

                  <div className="pt-8 border-t border-black/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-sky mb-4 block">School Hours</span>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-normal text-brand-dove-gray">Mon - Fri</span>
                        <span className="text-xs font-bold text-brand-primary">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-normal text-brand-dove-gray">Saturday</span>
                        <span className="text-xs font-bold text-brand-primary">9:30 AM - 1:30 PM</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="tel:+919035039028"
                    className="block w-full text-center py-4 rounded-2xl bg-brand-sky/5 text-brand-sky font-bold text-xs uppercase tracking-widest group-hover:bg-brand-sky group-hover:text-white transition-all"
                  >
                    Call for Enquiry
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialReels = () => {
  const reels = [
    "DUFAvqDj3PD",
    "DWF7PAzytlI",
    "DWWIC2yS6bi",
  ];

  return (
    <section id="social-reels" className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 bg-[#F9FBFF] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-5 py-2 bg-brand-sky/10 text-brand-sky rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-brand-sky/20">The Daily Magic</div>
          <h2 className="text-4xl lg:text-5xl font-display font-black text-brand-primary tracking-tight leading-tight">Connect With Us</h2>
          <p className="max-w-xl mx-auto text-base text-brand-dove-gray font-normal leading-relaxed">
            Catch all the latest stories, events, and everyday magic on our social pages!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reels.map((id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group lg:px-2"
            >
              {/* Minimalist Phone Frame Effect */}
              <div className="bg-white rounded-[32px] overflow-hidden p-2 shadow-[0_8px_30px_rgba(17,17,17,0.04)] border border-brand-offwhite group-hover:shadow-[0_20px_50px_rgba(17,17,17,0.08)] transition-all duration-500">
                <div className="aspect-[9/16] rounded-[24px] overflow-hidden bg-brand-offwhite relative">
                  {/* Shimmer loading state placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />

                  <iframe
                    src={`https://www.instagram.com/reel/${id}/embed`}
                    className="w-full h-full border-none"
                    title={`Instagram Reel ${id}`}
                  />
                </div>
              </div>

              {/* Discreet Label */}
              <div className="mt-4 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-soft-peach" />
                  <span className="text-[9px] font-normal text-brand-dove-gray uppercase tracking-widest">Reel Clip</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram size={14} className="text-brand-sky" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
          <motion.a
            href="https://www.instagram.com/juniortoes"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white rounded-full shadow-sm border border-brand-offwhite text-brand-primary text-[11px] font-black uppercase tracking-[0.3em] hover:bg-brand-primary hover:text-white transition-all duration-300 group"
          >
            <Camera size={18} className="group-hover:rotate-12 transition-transform" />
            Follow on IG
            <Instagram size={16} />
          </motion.a>
          <p className="text-[10px] font-bold text-brand-sky uppercase tracking-[0.5em] opacity-40">@juniortoes</p>
        </div>
      </div>

      {/* Soft minimalist patterns */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-sky/20 via-brand-soft-peach/20 to-brand-mint/20" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-brand-sky/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-brand-soft-peach/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="locations" className="bg-brand-primary text-white pt-16 lg:pt-24 pb-12 px-4 md:px-8 lg:px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-sky rounded-full opacity-[0.03] blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-soft-peach rounded-full opacity-[0.02] blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">

          {/* Logo & About Column */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-3xl inline-flex items-center justify-center shadow-xl border-4 border-brand-sky/10">
                <img
                  src="https://i.postimg.cc/L52b2JkV/Main-JT-logo.png"
                  alt="Junior Toes Logo"
                  className="h-12 w-auto rotate-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-white text-base leading-relaxed max-w-sm font-normal italic">
                "First Step To Big Dreams" - Building entrepreneurial thinking from the very beginning in a world of wonder and play.
              </p>
            </div>

            <div className="flex gap-3">
              {[
                { icon: <Instagram size={18} />, url: "https://instagram.com/juniortoes", label: "Instagram" },
                { icon: <Facebook size={18} />, url: "https://facebook.com/juniortoes", label: "Facebook" },
                { icon: <Youtube size={18} />, url: "https://youtube.com/@juniortoes", label: "Youtube" }
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-brand-sky hover:border-brand-sky hover:-translate-y-1 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Group */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-sky">Explore</h4>
              <ul className="space-y-4 font-normal text-sm text-white">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#programs-grid" className="hover:text-white transition-colors">Our Programs</a></li>
                <li><a href="#mentors" className="hover:text-white transition-colors">The Mentors</a></li>
                <li><a href="#why-choose" className="hover:text-white transition-colors">Philosophy</a></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-soft-peach">Learning</h4>
              <ul className="space-y-4 font-normal text-sm text-white">
                <li><a href="#playbook" className="hover:text-white transition-colors">The Playbook</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Parent Stories</a></li>
                <li><a href="#locations" className="hover:text-white transition-colors">Locations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Admissions</a></li>
              </ul>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Visit Our Campus</h4>
              <div className="flex gap-4 group">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-sky transition-colors duration-500">
                  <MapPin size={22} className="text-brand-sky group-hover:text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-black text-white">Junior Toes - Indiranagar</p>
                  <p className="text-xs text-white leading-relaxed font-normal max-w-[220px]">
                    1189, 13th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, KA 560008
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-8 border-t border-white/5">
              <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl border border-white/20 hover:border-brand-sky/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-sky animate-pulse" />
                  <span className="text-xs font-normal text-white">Mon - Fri Doors Open</span>
                </div>
                <span className="text-xs font-black text-white">9:00 - 18:00</span>
              </div>
              <a href="tel:+919035039028" className="inline-block text-2xl font-display font-black hover:text-brand-sky transition-colors">
                +91 90350 39028
              </a>
            </div>
          </div>

        </div>

        {/* Sub-footer */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/90 text-center md:text-left">
          <p>© 2026 Junior Toes School • Innovative Learning for Littles</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors underline decoration-brand-sky decoration-2 underline-offset-4">Enrollment Open 2026</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- App ---

export default function App() {
  return (
    <div className="min-h-screen bg-brand-offwhite selection:bg-brand-sky/30 overflow-x-hidden">
      <CustomCursor />
      <Header />
      <Hero />
      <SlidingRibbon />
      <WhyChooseTimeline />
      <Programs />
      <GalleryMoments />
      <Testimonials />
      <Mentors />
      <BrandPlaybook />
      <CampusLocation />
      <SocialReels />
      <Footer />
    </div>
  );
}
