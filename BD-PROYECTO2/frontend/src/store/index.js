import { createStoreon } from "storeon"
import { storeonDevtools } from 'storeon/devtools'
import user from './user'


const store = createStoreon([
    user,
    storeonDevtools
])

export default store