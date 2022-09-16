import {City} from '@redux/types';

export const baseStorage: Storage = {
    setItem: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
    getItem: (key) => {
        const item = localStorage.getItem(key)
        if (item) {
            return JSON.parse(item)
        }
        return undefined
    }
}

type Storage = {
    setItem: (key: string, val: City[]) => void
    getItem: (key: string) => City[] | undefined
}