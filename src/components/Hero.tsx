import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-orange-200/20 to-purple-200/30 blur-3xl"></div>
      <Container className="relative pb-20 pt-16 text-center lg:pt-24">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
          Find incredible people, through people you trust.
      </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl tracking-tight text-slate-600">
          Stop Interviewing the Wrong People; Select from a curated shortlist of vetted talent.
        </p>
        <div className="mt-10">
          <Button
            href="#request-access"
            className="bg-slate-900 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Book a session with us
          </Button>
        </div>
        
        <div className="relative mt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/40 via-orange-200/30 to-purple-200/40 blur-2xl"></div>
          <div className="relative flex justify-center items-center space-x-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Amber</div>
                  <div className="text-sm text-slate-600">Head of Marketing</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  D
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Daniel</div>
                  <div className="text-sm text-slate-600">Visionary leader</div>
                  <div className="text-xs text-slate-500">Early stage AI</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"></div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full"></div>
          <div className="absolute top-1/2 -left-8 w-4 h-4 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full"></div>
          <div className="absolute top-1/4 -right-8 w-5 h-5 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full"></div>
        </div>
    </Container>
    </div>
  );
}
