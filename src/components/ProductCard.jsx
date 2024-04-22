import { formatCurrency } from "@/lib"
import PropTypes from 'prop-types'

export function ProductCard(props) {
	return (
		<div className="p-1.5 rounded-lg bg-neutral-800 bg-opacity-15" onClick={props.onClick}>
			<img src={props.data.image} alt={props.data.name} width={320} height={320} loading="eager" className="object-cover object-center w-full mb-4 rounded-lg aspect-square" />
			<div className="px-1.5">
				<h5 className="mb-4 text-sm">{props.data.name}</h5>
				<div className="flex flex-col gap-1">
					<span className="text-xs opacity-25">Stok: {`${props.data.stock} ${props.data.unit}`}</span>
					<span className="text-xs opacity-25">Harga: {formatCurrency(props.data.price)}</span>
				</div>
			</div>
		</div>
	)
}

ProductCard.propTypes = {
	data: PropTypes.object.isRequired,
	onClick: PropTypes.any
}