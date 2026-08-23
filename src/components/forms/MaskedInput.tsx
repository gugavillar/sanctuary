import { forwardRef, type ReactNode } from 'react'
import { PatternFormat, type PatternFormatProps } from 'react-number-format'

import { Input } from './Input'

type MaskedInputProps = Omit<PatternFormatProps, 'customInput'> & {
	error?: string
	rightIcon?: ReactNode
	label: string
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(({ ...props }, ref) => {
	return <PatternFormat customInput={Input} getInputRef={ref} {...props} />
})

MaskedInput.displayName = 'MaskedInput'
