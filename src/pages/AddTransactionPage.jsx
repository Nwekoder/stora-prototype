import { db } from "@/firebase"
import { formatCurrency } from "@/lib"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { Scanner } from "@yudiel/react-qr-scanner"
import { Modal, ModalStateAtom } from "@/components/Modal"
import { atom, useAtom } from "jotai"
import { ProductCard } from "@/components/ProductCard"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

const CartItemAtom = atom([])

export default function AddTransactionPage() {
	const [data, setData] = useState("")
	const [value, loading, error] = useCollection(collection(db, "inventory"))
	const [selectedProduct, setSelectedProduct] = useState(null)
	const [cartItems, setCartItems] = useAtom(CartItemAtom)
	const navigate = useNavigate()
	// const [search, setSearch] = useState('')

	const [, setModalState] = useAtom(ModalStateAtom)

	useEffect(() => {
		if (data !== "") {
			const selectedData = value.docs.find((doc) => doc.data().barcode === data)

			if (selectedData.id) {
				setSelectedProduct({
					id: selectedData.id,
					...selectedData.data(),
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, loading, error])

	function openSearchModal() {
		setModalState(true)
	}

	function addToCart() {
		if (selectedProduct) {
			setCartItems([
				...cartItems,
				{
					...selectedProduct,
					qty: 1,
					total: selectedProduct.price,
				},
			])
			setData("")
			setSelectedProduct(null)
		}
	}

	async function bayar() {
		const dibayar = Number(prompt("Dibayar"))
		const subtotal = cartItems.reduce((a, b) => a + b.total, 0)

		const kembalian = dibayar - subtotal
		alert(`Kembalian: ${formatCurrency(kembalian)}`)

		// FIXME
		await addDoc(collection(db, "transactions"), {
			timestamp: serverTimestamp(),
			items: cartItems,
			subtotal,
			payed: dibayar
		})

		navigate('/app/transaction')
	}

	return (
		<div className="relative w-11/12 h-full pt-8 mx-auto overflow-hidden">
			<Modal>
				<div className="w-11/12 max-h-[80vh] overflow-y-auto p-4 rounded-lg lg:w-1/3 bg-slate-900">
					<header className="flex items-center justify-between h-12 mb-4">
						<h4 className="text-lg font-bold lg:text-xl">Cari Barang</h4>

						<button type="button" onClick={() => setModalState(false)} className="flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
							</svg>
						</button>
					</header>

					<div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
						{value?.docs.map((doc) => (
							<ProductCard
								key={doc.id}
								data={doc.data()}
								onClick={() => {
									setData(doc.data().barcode)
									setModalState(false)
								}}
							/>
						))}
					</div>
				</div>
			</Modal>

			<div className="flex flex-col gap-2">
				{cartItems.map((item, i) => (
					<CartItem key={item.id} index={i} />
				))}
			</div>
			{cartItems.length > 0 && (
				<div className="grid grid-cols-2 gap-2 mt-8 border-t border-neutral-50">
					<div>
						<p className="text-xs">Subtotal: <span className="text-sm font-bold">{formatCurrency(cartItems.reduce((a, b) => Number(a) + b.total, 0))}</span></p>
					</div>

					<button onClick={bayar} type="button" className="px-4 py-2 bg-neutral-50 text-slate-950">Bayar</button>
				</div>
			)}

			<div className="absolute w-full rounded-lg bg-opacity-15 bottom-4 bg-slate-900">
				<div className="grid w-full grid-cols-2 gap-8 p-4 mx-auto">
					<div className="flex items-center justify-center w-full h-auto mx-auto overflow-hidden rounded-lg bg-neutral-50 aspect-video">
						<Scanner
							options={{ constraints: { width: { ideal: 203 }, height: { ideal: 114 }, facingMode: "environment", aspectRatio: { exact: 16 / 9 } } }}
							onResult={(text) => setData(text)}
						/>
					</div>

					<div className="flex items-center justify-end text-sm text-right">
						<div>
							{selectedProduct ? (
								<div>
									<h5 className="text-sm font-bold">{selectedProduct.name}</h5>
									<span className="mb-8 text-xs opacity-40">{selectedProduct.barcode}</span>

									<p className="text-sm font-bold">Harga: {formatCurrency(selectedProduct.price)}</p>
								</div>
							) : (
								<>
									{data !== "" ? (
										<p className="font-bold text-center">Barcode {data} tidak terdaftar!</p>
									) : (
										<p className="font-bold text-center">Data barang tidak ditemukan!</p>
									)}
								</>
							)}
						</div>
					</div>
				</div>

				<div className="flex gap-4">
					<button
						disabled={selectedProduct === null}
						onClick={addToCart}
						type="button"
						className="flex items-center justify-center w-full gap-4 px-2 py-1.5 text-sm rounded-lg disabled:opacity-25 bg-neutral-50 text-slate-950"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
						{selectedProduct !== null ? "Tambah ke daftar belanja" : "Mencari barcode...."}
					</button>
					<button
						onClick={openSearchModal}
						type="button"
						className="flex items-center justify-center w-full gap-4 px-2 py-1.5 border-2 text-sm rounded-lg disabled:opacity-25 border-neutral-50"
					>
						Cari Barang
					</button>
				</div>
			</div>
		</div>
	)
}

function CartItem({ index }) {
	const [cartItems, setCartItems] = useAtom(CartItemAtom)

	function increaseQuantity() {
		setCartItems(
			cartItems.map((item, i) => {
				if (i === index) {
					return {
						...item,
						qty: item.qty + 1,
						total: (item.qty + 1) * item.price,
					}
				}
				return item
			})
		)
	}

	function decreaseQuantity() {
		setCartItems(
			cartItems.map((item, i) => {
				if (i === index && item.qty > 0) {
					return {
						...item,
						qty: item.qty - 1,
						total: (item.qty - 1) * item.price,
					}
				}
				return item
			})
		)
	}

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-col">
				<h5 className="text-lg font-bold">{cartItems[index].name}</h5>
				<p className="text-xs opacity-25">{formatCurrency(cartItems[index].total)}</p>
			</div>

			<div className="flex items-center gap-2">
				<button type="button" onClick={decreaseQuantity} className="disabled:opacity-25" disabled={cartItems[index].qty === 0}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</button>
				<p className="text-lg font-bold">{cartItems[index].qty}</p>
				<button type="button" onClick={increaseQuantity} className="disabled:opacity-25">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</button>
			</div>
		</div>
	)
}

CartItem.propTypes = {
	index: PropTypes.number.isRequired,
}
