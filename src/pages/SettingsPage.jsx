import {useSignOut} from 'react-firebase-hooks/auth'
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function SettingsPage() {
    const [signOut] = useSignOut(auth)
    const navigate = useNavigate()

    async function logout() {
        await signOut()
        navigate('/')
    }

    return (
        <div>
            <h1 className="text-4xl font-bold">SettingsPage</h1>
            <button onClick={logout} type="button" className="px-4 py-2 text-sm bg-red-600 rounded-md">Logout</button>

        </div>
    )
}