import { Star } from 'lucide-react'

export function StarRow() {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-terracotta text-terracotta" />
            ))}
        </div>
    )
}

export function getInitials(name) {
    return name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('')
}

export default function ReviewCard({ review }) {
    const initials = getInitials(review.name)
    return (
        <div className="bg-white border border-stone-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
                <div className="shrink-0 w-9 h-9 rounded-full bg-espresso flex items-center justify-center text-cream text-xs font-bold">
                    {initials}
                </div>
                <div className="min-w-0">
                    <p className="font-semibold text-espresso text-sm leading-tight">{review.name}</p>
                    <div className="mt-1">
                        <StarRow />
                    </div>
                    <blockquote className="mt-2 text-stone-600 text-sm leading-relaxed whitespace-pre-line">
                        „{review.review.trim()}"
                    </blockquote>
                    <span className="text-stone-400 text-xs font-mono mt-2 block">Opinia z Google</span>
                </div>
            </div>
        </div>
    )
}
