
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PenLine, Coffee, Users, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        <div className="flex flex-col items-center text-center mb-12">
          <PenLine className="h-16 w-16 text-primary mb-6" />
          <h1 className="text-4xl font-bold mb-6 text-gradient-primary">
            About RavenWords
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A modern blog writing platform designed for writers who prefer a beautiful dark theme and exceptional user experience.
          </p>
        </div>
        
        <div className="space-y-16">
          {/* Our Story */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-invert max-w-none">
              <p>
                RavenWords was born out of a simple need: a blog writing platform that's both beautiful and functional, with a focus on the writing experience.
              </p>
              <p>
                As writers ourselves, we were tired of bright, cluttered interfaces that made it difficult to focus on the words. We wanted something that felt like writing at night – peaceful, focused, and distraction-free.
              </p>
              <p>
                So we built RavenWords, a platform designed specifically for writers who appreciate clean design, intuitive interfaces, and most importantly, a dark theme that's easy on the eyes during those late-night writing sessions.
              </p>
              <p>
                Our mission is to create the most writer-friendly platform possible, where technology fades into the background and your words take center stage.
              </p>
            </div>
          </section>
          
          {/* Key Features */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card/50 border border-border/40 p-6 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <PenLine className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Beautiful Editor</h3>
                <p className="text-muted-foreground">
                  A distraction-free writing environment with all the formatting tools you need.
                </p>
              </div>
              
              <div className="bg-card/50 border border-border/40 p-6 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <Coffee className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Dark Theme</h3>
                <p className="text-muted-foreground">
                  Easy on the eyes, perfect for night owls and reducing eye strain.
                </p>
              </div>
              
              <div className="bg-card/50 border border-border/40 p-6 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">User-Centric</h3>
                <p className="text-muted-foreground">
                  Designed with writers in mind, focusing on what matters most to you.
                </p>
              </div>
            </div>
          </section>
          
          {/* Team */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Alex Morgan',
                  title: 'Founder & Designer',
                  bio: 'Writer and UX designer with a passion for creating beautiful digital experiences.'
                },
                {
                  name: 'Jamie Taylor',
                  title: 'Lead Developer',
                  bio: 'Full-stack developer who loves clean code and even cleaner user interfaces.'
                },
                {
                  name: 'Sam Chen',
                  title: 'Content Strategist',
                  bio: 'Professional writer and editor helping shape the future of digital publishing.'
                }
              ].map((member, index) => (
                <div key={index} className="bg-card/50 border border-border/40 p-6 rounded-lg">
                  <div className="h-32 w-32 bg-secondary mx-auto rounded-full mb-4 flex items-center justify-center">
                    <span className="text-4xl text-primary">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-1 text-center">{member.name}</h3>
                  <p className="text-primary text-sm mb-3 text-center">{member.title}</p>
                  <p className="text-muted-foreground text-center">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Final CTA */}
          <section className="text-center py-8">
            <Heart className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Join the DarkWrite Community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              We're building more than just a platform — we're building a community of writers who appreciate beautiful design and thoughtful experiences.
            </p>
            <Link to="/editor">
              <Button size="lg" className="font-medium">
                Start Writing Today
              </Button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
