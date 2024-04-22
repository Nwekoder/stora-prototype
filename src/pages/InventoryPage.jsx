import { Link } from "react-router-dom"
import { Modal, ModalStateAtom } from "@/components/Modal"
import { useAtom } from "jotai"
import Input from "@/components/Input"
import { useCollection } from "react-firebase-hooks/firestore"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/firebase"
import Loading from "@/components/Loading"
import { ProductCard } from "@/components/ProductCard"

export default function InventoryPage() {
	const [value, loading, error] = useCollection(collection(db, "inventory"))
	const [, setAddDataModal] = useAtom(ModalStateAtom)

	async function addItem(e) {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const data = JSON.parse(JSON.stringify(Object.fromEntries(formData)))

		await addDoc(collection(db, "inventory"), {
			...data,
			qty: Number(data.qty),
			stock: Number(data.qty),
			price: Number(data.price),
		})
		e.target.reset()
		setAddDataModal(false)
	}

	return (
		<div className="px-2 pt-4">
			<div className="flex gap-2 mb-4">
				<input
					type="search"
					placeholder="Cari barang..."
					className="w-full px-4 py-2 bg-transparent border-2 border-opacity-25 outline-none focus:border-opacity-100 border-neutral-50 rounded-3xl"
				/>
			</div>

			<button
				type="button"
				onClick={() => setAddDataModal(true)}
				className="absolute flex items-center justify-center p-4 rounded-full bottom-4 right-4 bg-neutral-50 text-slate-950"
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
					<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
			</button>
			<Modal>
				<div className="w-11/12 max-h-[80vh] overflow-y-auto p-4 rounded-lg lg:w-1/3 bg-slate-900">
					<header className="flex items-center justify-between h-12 mb-4">
						<h4 className="text-lg font-bold lg:text-xl">Tambah produk</h4>

						<button type="button" onClick={() => setAddDataModal(false)} className="flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
							</svg>
						</button>
					</header>

					<form onSubmit={addItem}>
						<Input label="Nama Barang" name="name" type="text" required />
						<Input label="No. Barcode" name="barcode" type="text" inputMode="numeric" />
						<Input label="Harga" name="price" type="number" required defaultValue="0" min={0} />
						<div className="flex flex-col w-full gap-2 md:flex-row">
							<Input label="Stok Barang" name="stock" type="number" required defaultValue="1" min={0} />
							<Input label="Satuan Barang" name="unit" type="text" required defaultValue="pcs" />
						</div>

						<button type="submit" className="px-4 py-2 rounded-3xl bg-neutral-50 text-slate-950">
							Simpan
						</button>
					</form>
				</div>
			</Modal>

			<div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
				{loading ? (
					<Loading />
				) : (
					<>
						{!error ? (
							<>{value.docs.length > 0 ? value.docs.map((d) => <ProductCard key={d.id} data={d.data()} />) : <NoData />}</>
						) : (
							<div className="h-[50vh] flex items-center justify-center bg-red-600">Error : {error.message}</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}

function NoData() {
	return (
		<div className="h-[50vh] col-span-2 md:col-span-4 sm:col-span-3 lg:col-span-7 bg-neutral-400 bg-opacity-5 flex items-center justify-center flex-col">
			<h4 className="mb-4 text-lg font-bold">Tidak ada data</h4>
			<p className="text-sm">
				Tambahkan data baru{" "}
				<Link to="/app/inventory/add" className="text-blue-400 underline">
					disini
				</Link>
			</p>
		</div>
	)
}