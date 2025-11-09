import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export function TalentsHero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-indigo-200/20 to-purple-200/30 blur-3xl"></div>
      <Container className="relative pb-20 pt-16 text-center lg:pt-24">
        <h1 
          className="mx-auto max-w-4xl font-spaceGrotesk"
          style={{
            fontWeight: 600,
            fontSize: '64px',
            lineHeight: '70px',
            color: 'rgb(24, 18, 41)',
            fontStyle: 'normal'
          }}
        >
          Find your next role through a trusted and selective process
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl tracking-tight text-slate-600">
          We evaluate your skills once, then match you with multiple companies that fit your goals and culture.
        </p>
        <div className="mt-10">
          <Button
            href="#join-pool"
            className="bg-slate-900 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-slate-800 transition-colors"
          >
            → Apply to the Talent Pool
          </Button>
        </div>
      </Container>
    </div>
  );
}


