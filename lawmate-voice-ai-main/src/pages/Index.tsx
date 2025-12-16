import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mic, BookOpen, Shield, Zap, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-legal.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Interactive Chat",
      description: "Type or speak your legal questions naturally",
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Voice Assistant",
      description: "Hands-free legal guidance with voice commands",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Legal Database",
      description: "Access to comprehensive Indian law sections",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Simple Explanations",
      description: "Complex laws explained in plain language",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Answers",
      description: "Get immediate responses to your queries",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Accurate Information",
      description: "Reliable legal information you can trust",
    },
  ];

  const steps = [
    { number: "1", title: "Ask Your Question", desc: "Type or speak your legal query in plain language" },
    { number: "2", title: "AI Analyzes", desc: "LawMate processes your question using Indian legal database" },
    { number: "3", title: "Get Clear Answer", desc: "Receive easy-to-understand explanation with legal references" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-light/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90 animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-scale-in border border-white/20">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm text-white font-medium">Powered by Advanced AI</span>
            </div>

            <div className="mb-8 animate-fade-in">
              <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm mx-auto flex items-center justify-center shadow-glow animate-bounce-subtle border-4 border-white/20">
                <span className="text-6xl">⚖️</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up leading-tight">
              Your Friendly AI
              <span className="block bg-gradient-to-r from-accent to-white bg-clip-text text-transparent animate-shimmer" style={{ backgroundSize: "200% auto" }}>
                Legal Assistant
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: "0.2s" }}>
              Get instant answers about Indian laws and legal procedures. Simple, clear, and always available.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Button
                onClick={() => navigate("/chat")}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-glow text-lg px-8 py-6 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 group-hover:animate-wiggle" />
                  Start Chatting Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-20 transition-opacity" />
              </Button>
              
              <Button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </div>
            
            <p className="text-sm text-white/70 mt-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              ✨ Free to use • No signup required • Instant access
            </p>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="hsl(var(--card))"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "1000+", label: "Legal Topics" },
              { number: "24/7", label: "Available" },
              { number: "10K+", label: "Questions Answered" },
              { number: "99%", label: "Accuracy" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center animate-scale-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How LawMate Helps You</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features designed to make legal information accessible to everyone
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-6 border shadow-card hover:shadow-glow transition-all duration-500 animate-fade-in hover:scale-105 hover:-translate-y-1 cursor-pointer relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-glow">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Simple steps to get your legal questions answered</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary -translate-y-1/2" />

              <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="relative animate-scale-in"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <div className="bg-background rounded-2xl p-8 border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-glow group">
                      <div className="w-20 h-20 rounded-full bg-gradient-accent mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold shadow-glow group-hover:scale-110 transition-transform">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                      <p className="text-muted-foreground text-center text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block animate-bounce-subtle mb-6">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <MessageSquare className="w-8 h-8" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Ready to Get Legal Clarity?
            </h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Start your conversation with LawMate and get instant answers to your legal questions
            </p>
            <Button
              onClick={() => navigate("/chat")}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-glow text-lg px-10 py-7 group animate-scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              <MessageSquare className="w-6 h-6 mr-2 group-hover:animate-wiggle" />
              Launch LawMate
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            © 2025 LawMate. Legal information, not legal advice. Consult a qualified lawyer for specific cases.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
