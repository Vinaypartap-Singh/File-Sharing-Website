export default function ProgressBar({ progress = 100 }) {
  return (
    <div className="w-full bg-gray-200 h-full rounded-lg mt-10">
      <div
        className="bg-red-500 h-full rounded-lg"
        style={{ width: `${progress}%` }}
      >
        <p className="text-xs text-center">{`${Number(progress).toFixed(
          0
        )}%`}</p>
      </div>
    </div>
  );
}
