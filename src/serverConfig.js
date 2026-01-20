// function serverConfig() {
// 	// const server = 'http://localhost:4000/api'
// 	const server = import.meta.env.VITE_API
// 	return server
// }

// export default serverConfig()


export const API = import.meta.env.VITE_API
export const UPLOAD = import.meta.env.VITE_UPLOAD