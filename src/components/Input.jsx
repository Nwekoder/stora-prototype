import PropTypes from "prop-types"

export default function Input(props) {
	return (
		<div className="relative w-full mb-4 bg-slate-900">
			<label className="absolute px-2 text-xs -top-3 left-5 bg-inherit">{props.label}</label>
			<input
				type={props.type}
				name={props.name}
				required={props.required}
				min={props.min}
				minLength={props.minLength}
                inputMode={props.inputMode}
				defaultValue={props.defaultValue}
				className="w-full px-4 py-1.5 mb-1.5 lg:mb-3 text-sm lg:py-2 lg:text-base border-2 border-opacity-25 outline-none bg-inherit focus:border-opacity-100 border-neutral-50 rounded-3xl"
			/>
		</div>
	)
}


Input.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	required: PropTypes.bool,
	min: PropTypes.number,
	minLength: PropTypes.number,
    inputMode: PropTypes.string,
	defaultValue: PropTypes.string
}
