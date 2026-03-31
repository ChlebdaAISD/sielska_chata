import { Link } from 'wouter'

/**
 * Unified Button component — Sielska Chata design system.
 *
 * variant:  'primary' | 'primary-dark' | 'secondary' | 'secondary-dark'
 * size:     'sm' | 'md' | 'lg'
 * icon:     React element — displayed in a circle badge on the right
 * href:     external or phone URL → renders <a>
 * to:       internal route       → renders <Link>
 * (neither) → renders <button>
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  href,
  to,
  className = '',
  children,
  ...props
}) {
  const hasIcon = Boolean(icon)

  const variants = {
    primary: {
      // transition: transform handled by .btn-magnetic CSS class
      wrapper: 'btn-magnetic bg-terracotta text-white',
      bg: <span className="btn-bg bg-terracotta-dark rounded-full" />,
      iconBg: 'bg-white/15',
    },
    'primary-dark': {
      wrapper: 'btn-magnetic bg-espresso text-cream',
      bg: <span className="btn-bg bg-terracotta rounded-full" />,
      iconBg: 'bg-white/10',
    },
    secondary: {
      wrapper: 'border border-espresso/15 text-espresso hover:bg-espresso/5 transition-colors duration-300',
      bg: null,
      iconBg: null,
    },
    'secondary-dark': {
      wrapper: 'border border-white/25 text-white hover:bg-white/10 transition-colors duration-300',
      bg: null,
      iconBg: null,
    },
  }

  const sizes = {
    sm: {
      wrapper: hasIcon ? 'pl-5 pr-2.5 py-2.5 text-sm' : 'px-5 py-2.5 text-sm',
      icon: 'w-8 h-8',
    },
    md: {
      wrapper: hasIcon ? 'pl-7 pr-3.5 py-3.5' : 'px-7 py-3.5',
      icon: 'w-9 h-9',
    },
    lg: {
      wrapper: hasIcon ? 'pl-7 pr-3.5 py-4 text-lg' : 'px-8 py-4 text-lg',
      icon: 'w-10 h-10',
    },
  }

  const v = variants[variant] ?? variants.primary
  const s = sizes[size] ?? sizes.md

  const cls = [
    'group inline-flex shrink-0 items-center gap-3 rounded-full font-semibold whitespace-nowrap',
    v.wrapper,
    s.wrapper,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      {v.bg}
      <span className="relative z-10 inline-flex items-center gap-1.5">{children}</span>
      {hasIcon && (
        <span
          className={[
            'relative z-10 rounded-full flex items-center justify-center',
            'transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover:translate-x-0.5 group-hover:scale-105',
            s.icon,
            v.iconBg ?? 'bg-espresso/5',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {icon}
        </span>
      )}
    </>
  )

  if (to) return <Link href={to} className={cls} {...props}>{inner}</Link>
  if (href) return <a href={href} className={cls} {...props}>{inner}</a>
  return <button className={cls} {...props}>{inner}</button>
}
