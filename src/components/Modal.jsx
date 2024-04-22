import { atom, useAtom } from "jotai"
import PropTypes from "prop-types"

export const ModalStateAtom = atom(false)

export function Modal({ children }) {
	const [modalState] = useAtom(ModalStateAtom)

	return <>{modalState && <div className="fixed top-0 left-0 flex z-[1000] items-center justify-center w-full h-screen bg-opacity-25 bg-neutral-800 backdrop-blur-md">{children}</div>}</>
}

Modal.propTypes = {
	children: PropTypes.node.isRequired
}