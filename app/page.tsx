'use client';

import { useState } from 'react';

// Declare dataLayer for TypeScript
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export default function InfluenceYield() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        
        // Push email_capture event to dataLayer for GTM
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'email_capture',
            event_category: 'engagement',
            event_label: 'newsletter_signup',
            value: 1
          });
        }
      } else {
        // Handle error - you might want to show an error message to the user
        console.error('Subscription failed:', data.error);
        alert(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        
        {/* Hero Section */}
        <div className="text-center mb-8 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            The <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent underline decoration-orange-500">Next Big</span> Fashion Influencers Are <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent underline decoration-orange-500">Still Small</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-900 mb-8 max-w-3xl mx-auto leading-relaxed font-bold">
          Tap Loyal Audiences Before Creators Blow Up and Price You Out.
          </h2>
        </div>

        {/* CTA Section - Right After Headlines */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-lg mb-12">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 underline">
                  Access Our Hidden Creator Pipeline
                </h3>
                <p className="text-gray-900 font-bold">
                  Turn Micro Budgets Into Mega Results
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? 'Unlocking ROI...' : 'Get Access Now'}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-4">🔓</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">You are in. Now unlock your ROI!</h2>
              <p className="text-gray-600">
                Check your email for confirmation. Your first list arrives shortly.
              </p>
            </div>
          )}
        </div>

          {/* Key Benefits Section - Mobile: 2 sections, Desktop: 4 sections */}
          <div className="text-center mb-8">
            {/* Mobile: Show only Free and 10-15× */}
            <div className="grid grid-cols-2 md:hidden gap-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-3 text-gray-900 font-bold">Free</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Forever</h3>
                <p className="text-gray-600 text-sm">Zero cost for access. Keep your budget for posts that convert.</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-3 text-gray-900 font-bold">10-15×</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Engagement Spikes</h3>
                <p className="text-gray-600 text-sm">We do deep dive analysis and track engagement jumps before they go mainstream.</p>
              </div>
            </div>
            
            {/* Desktop: Show all 4 sections */}
            <div className="hidden md:grid md:grid-cols-4 gap-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-3 text-gray-900 font-bold">Free</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Forever</h3>
                <p className="text-gray-600 text-sm">Zero cost for access. Keep your budget for posts that convert.</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-3 text-gray-900 font-bold">2x/week</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Twice-Weekly Emails</h3>
                <p className="text-gray-600 text-sm">Fresh lists every Tuesday & Friday—we provide the emails that save you time.</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-3 text-gray-900 font-bold">10-15×</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Engagement Spikes</h3>
                <p className="text-gray-600 text-sm">We do deep dive analysis and track engagement jumps before they go mainstream.</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-3 text-gray-900 font-bold">1,900–13.2K</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Follower Sweet Spot</h3>
                <p className="text-gray-600 text-sm">Our research shows this range delivers the highest ROI for small fashion brands.</p>
              </div>
            </div>
          </div>

        {/* Mobile: Additional 2 sections below CTA */}
        <div className="md:hidden text-center mb-12">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-4 text-gray-900 font-bold">2x/week</div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Twice-Weekly Emails</h3>
              <p className="text-gray-600 text-sm">Fresh lists every Tuesday & Friday—we provide the emails that save you time.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-4 text-gray-900 font-bold">1,900–13.2K</div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Follower Sweet Spot</h3>
              <p className="text-gray-600 text-sm">Our research shows this range delivers the highest ROI for small fashion brands.</p>
            </div>
          </div>
        </div>

          {/* Benefits Section */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-2xl font-bold text-gray-900 mb-8">
              Be First. Pay Less. Win Bigger. (Free Forever).
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Two emails a week of breakout creators with devoted audiences—contacts included.
            </p>
            
            {/* Mobile-only second CTA */}
            <div className="md:hidden bg-white rounded-lg border border-gray-200 p-6 shadow-lg mb-8">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 underline">
                      Access Our Hidden Creator Pipeline
                    </h3>
                    <p className="text-gray-900 font-bold">
                      Turn Micro Budgets Into Mega Results
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-4">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                      >
                        {isLoading ? 'Unlocking ROI...' : 'Get Access Now'}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-4">🔓</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">You are in. Now unlock your ROI!</h2>
                  <p className="text-gray-600">
                    Check your email for confirmation. Your first list arrives shortly.
                  </p>
                </div>
              )}
            </div>
          </div>

        {/* Features Section */}
        <div className="mb-12">
          <h3 className="text-4xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            What&apos;s Inside Every Email
          </h3>
          
          <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="text-blue-600 font-bold text-lg">📧</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Ready-to-contact creators</h4>
                <p className="text-gray-600 text-sm">Direct emails and handles—skip the DM guessing game.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="text-blue-600 font-bold text-lg">📊</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Performance intel that matters</h4>
                <p className="text-gray-600 text-sm">Engagement rates, save ratios, growth momentum—the numbers that predict surge.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="text-blue-600 font-bold text-lg">🎯</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Small brand winners only</h4>
                <p className="text-gray-600 text-sm">We scan thousands daily; only creators perfect for your budget make the list.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="text-blue-600 font-bold text-lg">⚡</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">First-mover advantage</h4>
                <p className="text-gray-600 text-sm">Get creator contacts before they blow up and their rates skyrocket.</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 font-medium mt-8 max-w-2xl mx-auto text-center">
            Lock in tomorrow&apos;s stars while they&apos;re hungry—and ride the wave when they explode.
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-lg mb-12">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 underline">
                  Access Our Hidden Creator Pipeline
                </h3>
                <p className="text-gray-900 font-bold">
                  Turn Micro Budgets Into Mega Results
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Joining...' : 'Get Access Now'}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-4">🔓</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">You are in. Now unlock your ROI!</h2>
              <p className="text-gray-600">
                Check your email for confirmation. Your first list arrives shortly.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}