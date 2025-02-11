'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronRight, Shield, Clock, Hospital, Users, Calendar, Database, Lock, Globe, Cpu, Wallet, FileCheck, Network, ArrowRight, CheckCircle2, ServerCrash, Blocks, Stethoscope, Award, Heart, BookOpen, Search, Bell } from 'lucide-react';

interface NavDropdownProps {
  title: string;
  items: {
    label: string;
    description: string;
    icon?: React.ElementType;
  }[];
}

interface Stat {
  value: number;
  target: number;
  label: string;
  suffix: string;
}

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('patients');
  const [scrollY, setScrollY] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [networkStatus, setNetworkStatus] = useState('connected');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<Stat[]>([
    { value: 0, target: 50000, label: 'Patient Records', suffix: '+' },
    { value: 0, target: 1000, label: 'Healthcare Providers', suffix: '+' },
    { value: 0, target: 25, label: 'African Countries', suffix: '+' },
    { value: 0, target: 99.9, label: 'Uptime', suffix: '%' }
  ]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulated blockchain connection status
  const connectWallet = () => {
    setIsConnected(true);
  };

  const NavDropdown = ({ title, items }: NavDropdownProps) => (
    <div className="relative group"
         onMouseEnter={() => setActiveDropdown(title)}
         onMouseLeave={() => setActiveDropdown(null)}>
      <button className="flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-300
                         hover:bg-white/10 text-gray-300 hover:text-white">
        <span>{title}</span>
        <ChevronRight className={`w-4 h-4 transform transition-transform duration-300 
                                ${activeDropdown === title ? 'rotate-90' : 'group-hover:rotate-90'}`} />
      </button>
      
      <div className={`absolute top-full left-0 mt-2 w-64 p-3 rounded-xl transform transition-all duration-300 
                    bg-gradient-to-br from-[#0B1437]/95 to-[#090B1E]/95 backdrop-blur-xl border border-white/10
                    ${activeDropdown === title ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
                    shadow-2xl shadow-[#4361EE]/20`}>
        {items.map((item, index) => (
          <a key={index} href={`#${item.label.toLowerCase()}`} 
             className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200">
            {item.icon && <item.icon className="w-5 h-5 text-[#00B4D8]" />}
            <div>
              <div className="font-medium text-white">{item.label}</div>
              <div className="text-sm text-gray-400">{item.description}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );

  // Network status simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStatus(prev => prev === 'connected' ? 'syncing' : 'connected');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animate stats on mount
  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const steps = 60;
    const stepTime = duration / steps;

    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setStats(prevStats => {
          const newStats = [...prevStats];
          const step = stat.target / steps;
          newStats[index] = {
            ...stat,
            value: Math.min(newStats[index].value + step, stat.target)
          };
          return newStats;
        });
      }, stepTime);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { width, height } = heroRef.current.getBoundingClientRect();
        const x = (clientX - width / 2) / width;
        const y = (clientY - height / 2) / height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const colors = {
    primary: {
      from: '#00B4D8', // Bright cyan
      to: '#4361EE',   // Vibrant blue
    },
    secondary: {
      from: '#4CC9F0', // Light cyan
      to: '#7209B7',   // Deep purple
    },
    accent: {
      from: '#48CAE4', // Soft cyan
      to: '#023E8A',   // Deep blue
    },
    success: '#2EC4B6', // Teal
    warning: '#FF9F1C', // Orange
    error: '#E71D36',   // Red
    highlight: '#F72585', // Pink
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-b from-[#090B1E] via-[#0B1437] to-[#090B1E] text-white">


      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-[#090B1E]/95 backdrop-blur-xl border-b border-white/10' : 'py-4 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-8">
              <a href="#" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00B4D8] to-[#4361EE] blur-lg opacity-50 
                                group-hover:opacity-75 transition-opacity duration-300"></div>
                  <Heart className="w-8 h-8 text-white relative z-10" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#00B4D8] to-[#4361EE] bg-clip-text text-transparent">
                  HealthTrove
                </span>
              </a>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-2">
                <NavDropdown title="Features" items={[
                  { label: "Patient Records", description: "Secure digital health records", icon: FileCheck },
                  { label: "Analytics", description: "Healthcare insights & reporting", icon: Cpu },
                  { label: "Security", description: "Advanced data protection", icon: Shield }
                ]} />
                <NavDropdown title="Solutions" items={[
                  { label: "Hospitals", description: "Enterprise healthcare systems", icon: Hospital },
                  { label: "Clinics", description: "Small practice management", icon: Users },
                  { label: "Research", description: "Medical research platform", icon: Database }
                ]} />
                <NavDropdown title="Resources" items={[
                  { label: "Documentation", description: "Integration guides & API docs", icon: BookOpen },
                  { label: "Community", description: "Join our healthcare network", icon: Users },
                  { label: "Support", description: "24/7 technical assistance", icon: Award }
                ]} />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              {/* Search Bar */}
              <div className={`hidden md:flex items-center transition-all duration-300 ${
                searchFocused ? 'w-64' : 'w-48'
              }`}>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[#00B4D8]/50 
                             focus:bg-white/10 transition-all duration-300 focus:outline-none text-sm"
                  />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Notification Bell */}
              <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Bell className="w-5 h-5 text-gray-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#F72585] rounded-full"></span>
              </button>

              {/* Connect Wallet Button */}
              <button
                onClick={connectWallet}
                className="hidden md:flex items-center space-x-2 px-6 py-2 rounded-lg relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00B4D8] to-[#4361EE] opacity-80 
                              group-hover:opacity-100 transition-opacity duration-300"></div>
                <Wallet className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{isConnected ? 'Connected' : 'Connect Wallet'}</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-gradient-to-b from-[#090B1E]/95 to-[#0B1437]/95 backdrop-blur-xl border-b border-white/10">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[#00B4D8]/50 
                           focus:bg-white/10 transition-all duration-300 focus:outline-none"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>

              {/* Mobile Navigation Links */}
              {['Features', 'Solutions', 'Resources'].map((item) => (
                <div key={item} className="space-y-2">
                  <div className="font-medium text-gray-300 px-4">{item}</div>
                  <div className="space-y-1">
                    {[1, 2, 3].map((subItem) => (
                      <a
                        key={subItem}
                        href="#"
                        className="block px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        {item} {subItem}
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              {/* Mobile Connect Wallet */}
              <button className="w-full px-4 py-3 bg-gradient-to-r from-[#00B4D8] to-[#4361EE] rounded-lg 
                               text-white font-medium hover:opacity-90 transition-opacity">
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <div ref={heroRef} className="relative h-screen flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating hexagons */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <svg
                className="w-12 h-12 opacity-[0.03]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                      strokeWidth="1" />
              </svg>
            </div>
          ))}

          {/* Glowing orbs */}
          {/* <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/30 rounded-full blur-3xl animate-pulse-slow"
               style={{
                 transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
               }}
          />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow"
               style={{
                 transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
               }}
          /> */}

          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00B4D8]/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#4361EE]/30 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Network Status Pill */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-900/30 to-blue-900/30 
                            rounded-full border border-teal-500/30 backdrop-blur-sm animate-fade-in">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-teal-400 text-sm">Powered by Base Network</span>
              </div>

              {/* Main Heading with Gradient Animation */}
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent 
                               animate-gradient-x">
                  Revolutionizing
                </span>
                <span className="block bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent 
                               animate-gradient-x animation-delay-1000">
                  African Healthcare
                </span>
              </h1>

              <p className="text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 animate-fade-in animation-delay-500">
                Decentralized healthcare management powered by blockchain technology. Secure, Transparent and accessible accross the continent. 
              </p>

              {/* CTA Buttons with Advanced Hover Effects */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg 
                                 overflow-hidden shadow-lg hover:shadow-teal-500/25 transition-all duration-300">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-600 to-blue-600 
                                 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center space-x-2">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className="px-8 py-4 border border-teal-500/30 rounded-lg hover:bg-teal-900/30 
                                 transition-colors duration-300">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Column - Interactive 3D Card */}
            <div className="hidden lg:block">
              <div className="relative transform hover:scale-105 transition-all duration-300"
                   style={{
                     transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
                   }}>
                {/* Card Background with Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl opacity-20 blur" />
                <div className="relative bg-gradient-to-br from-gray-900/90 to-black rounded-2xl p-8 backdrop-blur-sm 
                              border border-gray-800/50">
                  {/* Feature Icons with Floating Animation */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {[
                      { icon: <Lock className="w-6 h-6" />, label: "Secure Records" },
                      { icon: <Database className="w-6 h-6" />, label: "IPFS Storage" },
                      { icon: <Network className="w-6 h-6" />, label: "Cross-Border" },
                      { icon: <Shield className="w-6 h-6" />, label: "Privacy" }
                    ].map((feature, index) => (
                      <div key={index} 
                           className="flex flex-col items-center p-4 bg-black/50 rounded-lg border border-gray-800/50 
                                    hover:border-teal-500/30 transition-colors"
                           style={{
                             transform: `translateZ(${mousePosition.x * 20}px)`,
                             transition: 'transform 0.3s ease-out',
                           }}>
                        <div className="text-teal-400 mb-2 animate-float">{feature.icon}</div>
                        <span className="text-sm text-gray-400">{feature.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Visualization */}
                  <div className="relative h-48 bg-gradient-to-br from-teal-900/20 to-blue-900/20 rounded-lg 
                                overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 
                                  group-hover:opacity-100 transition-opacity duration-300" />
                    <img src="/api/placeholder/400/200" alt="Blockchain Visualization" 
                         className="w-full h-full object-cover rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Section: Health Tech Innovation */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4D8]/20 to-[#4361EE]/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Healthcare Innovation</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Leveraging cutting-edge technology to transform healthcare delivery
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-12 h-12 text-[#F72585]" />,
                title: "Patient-Centric Care",
                description: "Personalized healthcare experiences powered by AI and blockchain"
              },
              {
                icon: <Stethoscope className="w-12 h-12 text-[#4CC9F0]" />,
                title: "Digital Diagnostics",
                description: "Advanced diagnostic tools with real-time analysis and reporting"
              },
              {
                icon: <Award className="w-12 h-12 text-[#00B4D8]" />,
                title: "Quality Assurance",
                description: "Blockchain-verified healthcare quality metrics and certifications"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-[#090B1E]/80 to-[#0B1437]/80 p-8 rounded-2xl border border-[#4361EE]/30 hover:border-[#00B4D8]/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Stats Section - New */}
      <div className="border-y border-gray-800 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works - New */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-blue-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the future of healthcare management through our blockchain-powered platform
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wallet className="w-12 h-12 text-teal-400" />,
                title: "Connect Wallet",
                description: "Link your Web3 wallet to access the decentralized healthcare network"
              },
              {
                icon: <FileCheck className="w-12 h-12 text-teal-400" />,
                title: "Verify Identity",
                description: "Complete KYC verification to ensure secure access to medical records"
              },
              {
                icon: <Network className="w-12 h-12 text-teal-400" />,
                title: "Access Network",
                description: "Connect with healthcare providers across Africa securely"
              }
            ].map((step, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-teal-500/50 transition-colors">
                <div className="mb-6">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section - Updated */}
      <div id="features" className="py-24 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built on cutting-edge blockchain technology to provide secure and efficient healthcare services
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-teal-400" />,
                title: "Secure Records",
                description: "End-to-end encrypted patient data with blockchain verification"
              },
              {
                icon: <Database className="w-8 h-8 text-teal-400" />,
                title: "IPFS Storage",
                description: "Decentralized storage ensuring data availability and integrity"
              },
              {
                icon: <Lock className="w-8 h-8 text-teal-400" />,
                title: "Smart Contracts",
                description: "Automated healthcare service agreements and payments"
              },
              {
                icon: <Globe className="w-8 h-8 text-teal-400" />,
                title: "Cross-Border Access",
                description: "Seamless healthcare access across African countries"
              },
              {
                icon: <Cpu className="w-8 h-8 text-teal-400" />,
                title: "AI Integration",
                description: "Advanced diagnostics and health monitoring systems"
              },
              {
                icon: <Calendar className="w-8 h-8 text-teal-400" />,
                title: "DApp Scheduling",
                description: "Decentralized appointment booking and management"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-teal-500/50 transition-colors">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ecosystem Section - New */}
      <div id="ecosystem" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-blue-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ecosystem</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A comprehensive Web3 healthcare network connecting all stakeholders
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-8">
            <div className="flex flex-wrap gap-4 mb-8">
              {['Patients', 'Healthcare Providers', 'Insurance', 'Researchers'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    activeTab === tab.toLowerCase()
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500'
                      : 'border border-gray-800 hover:border-teal-500/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  {activeTab === 'patients' && 'Take Control of Your Health Data'}
                  {activeTab === 'healthcare providers' && 'Streamline Your Practice'}
                  {activeTab === 'insurance' && 'Efficient Claims Processing'}
                  {activeTab === 'researchers' && 'Access Anonymized Health Data'}
                </h3>
                <p className="text-gray-400 mb-6">
                  {activeTab === 'patients' && 'Secure access to your complete medical history, control data sharing, and schedule appointments with ease.'}
                  {activeTab === 'healthcare providers' && 'Access patient records instantly, manage appointments, and collaborate with specialists securely.'}
                  {activeTab === 'insurance' && 'Process claims faster with smart contracts and verified medical records.'}
                  {activeTab === 'researchers' && 'Analyze trends and patterns while maintaining patient privacy through blockchain technology.'}
                </p>
                <button className="flex items-center text-teal-400 hover:text-teal-300 transition-colors">
                  Learn More <ArrowRight className="ml-2" />
                </button>
              </div>
              <div className="bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-lg p-8">
                <img src="/api/placeholder/400/300" alt="Ecosystem illustration" className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Section - New */}
      <div id="roadmap" className="py-24 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Roadmap</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our journey to revolutionize healthcare in Africa
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                phase: "Phase 1",
                title: "Foundation",
                items: ["Smart contract development", "IPFS integration", "Basic DApp features"]
              },
              {
                phase: "Phase 2",
                title: "Expansion",
                items: ["Multi-country launch", "Healthcare provider onboarding", "Advanced scheduling system"]
              },
              {
                phase: "Phase 3",
                title: "Integration",
                items: ["AI diagnostics integration", "Cross-border payments", "Insurance smart contracts"]
              },
              {
                phase: "Phase 4",
                title: "Scale",
                items: ["Pan-African expansion", "Research platform launch", "Governance token"]
              }
            ].map((phase, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-teal-500/50 transition-colors">
                <div className="text-teal-400 mb-2">{phase.phase}</div>
                <h3 className="text-xl font-semibold mb-4">{phase.title}</h3>
                <ul className="space-y-3">
                  {phase.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-gray-400">
                      <ChevronRight className="text-teal-400 mr-2 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Section: Success Stories */}
      <div className="py-24 bg-gradient-to-r from-[#090B1E] to-[#0B1437]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Real impact across African healthcare systems
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                country: "Nigeria",
                metric: "500K+",
                description: "Patient records digitized",
                icon: <Users className="w-8 h-8 text-[#00B4D8]" />
              },
              {
                country: "Kenya",
                metric: "200+",
                description: "Healthcare facilities connected",
                icon: <Hospital className="w-8 h-8 text-[#4361EE]" />
              },
              {
                country: "Ghana",
                metric: "98%",
                description: "Data accuracy improvement",
                icon: <CheckCircle2 className="w-8 h-8 text-[#F72585]" />
              }
            ].map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-[#090B1E]/80 to-[#0B1437]/80 p-8 rounded-2xl border border-[#4361EE]/30 hover:border-[#00B4D8]/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#4CC9F0]">{story.country}</span>
                  {story.icon}
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00B4D8] to-[#4361EE] bg-clip-text text-transparent">
                  {story.metric}
                </div>
                <p className="text-gray-300">{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Section: Research & Development */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4CC9F0]/20 to-[#7209B7]/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Research & Development</h2>
              <p className="text-gray-300 mb-8">
                Advancing healthcare through continuous innovation and research
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "AI-Powered Diagnostics",
                    description: "Machine learning algorithms for early disease detection"
                  },
                  {
                    title: "Blockchain Security",
                    description: "Advanced cryptographic protection for patient data"
                  },
                  {
                    title: "Cross-Border Healthcare",
                    description: "Seamless medical service delivery across Africa"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <BookOpen className="w-6 h-6 text-[#00B4D8] flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00B4D8] to-[#4361EE] blur-3xl opacity-30" />
              <img src="/api/placeholder/500/400" alt="Research visualization" className="relative rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - New */}
      <div className="py-24 bg-gradient-to-r from-teal-900/50 to-blue-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join the Healthcare Revolution</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Be part of the movement to transform healthcare across Africa through blockchain technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Launch App
            </button>
            <button className="border border-teal-500/30 px-8 py-4 rounded-lg font-semibold hover:bg-teal-900/30 transition-colors">
              Read Docs
            </button>
          </div>
        </div>
      </div>

      {/* Footer - Updated with Web3 elements */}
      <footer className="bg-[#090B1E] border-t border-[#4361EE]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-4">
                HealthTrove
              </h3>
              <p className="text-gray-400">
                Decentralized healthcare for a connected Africa.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-teal-400 transition-colors">Features</a></li>
                <li><a href="#ecosystem" className="hover:text-teal-400 transition-colors">Ecosystem</a></li>
                <li><a href="#roadmap" className="hover:text-teal-400 transition-colors">Roadmap</a></li>
                <li><a href="#token" className="hover:text-teal-400 transition-colors">Token</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Whitepaper</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Audit Reports</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Telegram</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Medium</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HealthTrove. Built on Base Network.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;