import ProgressBar from "./progress-bar";

export default function Spinner({ message }: { message?: string }) {
  return (
    <>
      <ProgressBar />
      {message && (
        <div className="m-20 mx-auto max-w-lg rounded-lg bg-yellow-50 p-10 text-center text-yellow-900">
          {message}
        </div>
      )}
    </>
  );
}
