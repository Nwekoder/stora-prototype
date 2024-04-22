import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth"
import { auth } from "../firebase"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../components/Loading"

export default function LoginPage() {
	const [signIn] = useSignInWithGoogle(auth)
	const [user, loading] = useAuthState(auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (!loading && user) {
			navigate("/app/dashboard")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, loading])

	async function login() {
		await signIn()
	}

	if (loading) return <Loading />

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="w-96">
				<h1 className="mb-4 text-5xl font-bold">Project Stora</h1>
				<p className="mb-8 opacity-50">Silahkan login untuk melanjutkan!</p>

				<button onClick={login} type="button" className="flex items-center gap-4 px-4 py-2 text-sm bg-white border rounded-md text-neutral-950 border-neutral-200">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
						/>
					</svg>
					Login with Google
				</button>
			</div>
		</div>
	)
}
