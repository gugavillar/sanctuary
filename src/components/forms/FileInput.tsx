import { FileText, Upload, X } from 'lucide-react'
import { type ChangeEvent, useRef } from 'react'
import { type Control, Controller, type FieldValues, type Path, type UseFormWatch } from 'react-hook-form'

type FileInputProps<T extends FieldValues> = {
	control: Control<T>
	handleRemoveFile: VoidFunction
	watch: UseFormWatch<T>
	fieldName: Path<T>
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	error?: string
}

export const FileInput = <T extends FieldValues>({
	control,
	watch,
	fieldName,
	handleRemoveFile,
	onChange,
	error,
}: FileInputProps<T>) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const file = watch(fieldName)

	return (
		<div className="flex flex-col space-y-2">
			{file ? (
				<div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-primary/10 p-4">
					<FileText className="size-8 shrink-0 text-primary" />
					<div className="min-w-0 flex-1">
						<p className="truncate text-sm">{file?.name}</p>
						<p className="text-gray-500 text-xs">{(file?.size / 1024).toFixed(0)} KB</p>
					</div>
					<button
						className="cursor-pointer text-rose-600 transition-colors hover:text-rose-500"
						onClick={handleRemoveFile}
						type="button"
					>
						<X />
					</button>
				</div>
			) : (
				<Controller
					control={control}
					name={fieldName}
					render={({ field }) => (
						<>
							<input
								accept=".pdf"
								className="hidden"
								id="file"
								multiple={false}
								onChange={onChange}
								ref={(e) => {
									field.ref(e)
									inputRef.current = e
								}}
								type="file"
							/>
							<button
								className='w-full cursor-pointer cursor-pointer" rounded-lg border-2 border-gray-200 border-dashed p-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/10'
								onClick={() => inputRef.current?.click()}
								type="button"
							>
								<Upload className="mx-auto mb-3 size-10 text-gray-500" />
								<p className="text-sm">Clique para selecionar o documeto</p>
								<p className="mt-1 text-gray-500 text-xs">Apenas PDF, máximo de 5MB</p>
							</button>
						</>
					)}
				/>
			)}
			{error && <p className="ps-1 text-red-500 text-xs">{error}</p>}
		</div>
	)
}
