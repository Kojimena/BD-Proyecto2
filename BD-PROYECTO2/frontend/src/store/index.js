import { createStoreon } from "storeon"
import { storeonDevtools } from 'storeon/devtools'
import user from './user'
import { persistState } from '@storeon/localstorage'


const store = createStoreon([
    user,
    storeonDevtools,
    persistState(['user']) //
])

export default store