import { db } from "@/firebase"
import { formatCurrency } from "@/lib"
import { collection } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"

export default function TransactionPage() {
	const [value, loading] = useCollection(collection(db, "transactions"))

	return (
		<div className="relative w-11/12 min-h-full pt-8 mx-auto">
			{!loading &&
				value.docs.map((doc) => (
					<details key={doc.id} className="w-full p-4 bg-opacity-25 rounded-lg group bg-slate-900">
						<summary className="flex flex-col">
							<span className="text-xs">{doc.data().timestamp.toDate().toLocaleString("id-ID")}</span>
							<span className="text-lg font-bold group-open:hidden">{formatCurrency(doc.data().subtotal)}</span>
						</summary>
						<ol className="px-4 py-2 list-decimal list-inside">
							{doc.data().items.map((item) => (
								<li className="text-xs" key={item.id}>
									{item.name} x{item.qty} = {formatCurrency(item.total)}
								</li>
							))}
						</ol>

						<p className="text-sm text-right">Total: {formatCurrency(doc.data().subtotal)}</p>
					</details>
				))}
		</div>
	)
}
