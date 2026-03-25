export default function MountainSilhouette({ className = '', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 1440 120" fill="none" className={className} preserveAspectRatio="none">
      <path
        d="M0 120L48 108C96 96 192 72 288 66C384 60 480 72 576 78C672 84 768 84 864 72C960 60 1056 36 1152 30C1248 24 1344 36 1392 42L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
        fill={color}
      />
    </svg>
  )
}
