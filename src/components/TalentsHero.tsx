import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export function TalentsHero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-indigo-200/20 to-purple-200/30 blur-3xl"></div>
      <Container className="relative pb-20 pt-16 text-center lg:pt-24">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
          Find your next{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
            <span className="relative">perfect role</span>
          </span>{" "}
          through trusted connections
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl tracking-tight text-slate-600">
          Join our exclusive talent pool and get matched with opportunities at top companies through your professional network.
        </p>
        <div className="mt-10">
          <Button
            href="#join-pool"
            className="bg-slate-900 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Join our talent pool
          </Button>
        </div>
        
        <div className="relative mt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200/40 via-indigo-200/30 to-purple-200/40 blur-2xl"></div>
          <div className="relative flex justify-center items-center space-x-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Sarah</div>
                  <div className="text-sm text-slate-600">Senior Engineer</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Marcus</div>
                  <div className="text-sm text-slate-600">Product Manager</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full"></div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full"></div>
          <div className="absolute top-1/2 -left-8 w-4 h-4 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full"></div>
          <div className="absolute top-1/4 -right-8 w-5 h-5 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"></div>
        </div>
      </Container>
    </div>
  );
}


