export default function WaveDivider({ flipped }) {
  return (
    <div className="relative -mt-1">
      <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
        <path
          d={flipped
            ? 'M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z'
            : 'M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V0H0V30Z'}
          fill="currentColor"
          className="text-gray-50/60"
        />
      </svg>
    </div>
  );
}
