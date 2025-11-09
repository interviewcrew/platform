import { Container } from "@/components/Container";

export function TalentPool() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              A network built on trust and skill.
            </h2>
          </div>
          
          <div className="mt-12 space-y-6 text-lg text-slate-600">
            <p>
              Every developer in our pool has passed a structured evaluation.
            </p>
            <p>
              That means when companies come to us, they know every candidate has proven technical ability and professional experience.
            </p>
            <p className="pt-6">
              We work mostly with backend, frontend, and full-stack engineers across Europe, from fast-growing startups to established tech teams.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
