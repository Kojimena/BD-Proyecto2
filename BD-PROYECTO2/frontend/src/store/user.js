import { createStoreon } from "storeon";

const user = store => {
    store.on('@init', () => ({ user: {dpi: '', password: '', role: ''} }))
    store.on('user/login', (_, { dpi, role }) => ({ user:{dpi, role} }))

}

export default user