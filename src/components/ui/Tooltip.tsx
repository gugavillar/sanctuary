import { type ReactNode, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'

type TooltipPosition = 'bottom' | 'left' | 'right' | 'top'

type TooltipProps = {
	children: ReactNode
	content: ReactNode
	position?: TooltipPosition
	className?: string
}

type Coords = { top: number; left: number }

const GAP = 8

const getCoords = (trigger: HTMLElement, position: TooltipPosition): Coords => {
	const rect = trigger.getBoundingClientRect()

	switch (position) {
		case 'bottom':
			return { left: rect.left + rect.width / 2, top: rect.bottom + GAP }
		case 'left':
			return { left: rect.left - GAP, top: rect.top + rect.height / 2 }
		case 'right':
			return { left: rect.right + GAP, top: rect.top + rect.height / 2 }
		case 'top':
			return { left: rect.left + rect.width / 2, top: rect.top - GAP }
	}
}

const POSITION_TRANSFORM: Record<TooltipPosition, string> = {
	bottom: 'translate(-50%, 0)',
	left: 'translate(-100%, -50%)',
	right: 'translate(0, -50%)',
	top: 'translate(-50%, -100%)',
}

export const Tooltip = ({ children, content, position = 'top', className }: TooltipProps) => {
	const [coords, setCoords] = useState<Coords | null>(null)
	const triggerRef = useRef<HTMLSpanElement>(null)

	const show = () => {
		if (!triggerRef.current) return
		setCoords(getCoords(triggerRef.current, position))
	}

	const hide = () => setCoords(null)

	return (
		<span className="inline-flex" onBlur={hide} onFocus={show} onMouseEnter={show} onMouseLeave={hide} ref={triggerRef}>
			{children}
			{coords &&
				createPortal(
					<span
						className={twMerge(
							'pointer-events-none fixed z-50 text-nowrap rounded-lg bg-slate-800 px-3 py-1.5 text-white text-xs shadow',
							className
						)}
						role="tooltip"
						style={{ left: coords.left, top: coords.top, transform: POSITION_TRANSFORM[position] }}
					>
						{content}
					</span>,
					document.body
				)}
		</span>
	)
}
