import { auth } from "@/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link } from "react-router-dom"

export default function DashboardPage() {
	const [user, loading] = useAuthState(auth)

	return (
		<div>
			<header className="w-full h-[40vh] bg-gradient-to-b from-slate-800 shadow-lg shadow-slate-950 mb-16 to-slate-900 px-2 py-4 rounded-b-2xl">
				<h1 className="text-xl font-bold">Hello, {!loading ? user.displayName : ""}</h1>
			</header>

			<div className="w-11/12 mx-auto">
				<Link to="/app/transaction/add" className="flex items-center w-full gap-4 px-4 py-2 rounded-lg bg-neutral-50 text-slate-950">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
                    
					Transaksi Baru
				</Link>
			</div>
		</div>
	)
}
