import { EmptyStateIconGhost } from "./icons/EmptyStateIconGhost";

export default async function EmptyInterviewDetails() {
  return (
    <div className="flex justify-center content-center bg-white shadow sm:rounded-lg p-5 min-h-96">
      <div className="flex flex-col justify-center">
        <EmptyStateIconGhost />
        <div>select an interview to view details</div>
      </div>
    </div>
  );
}
