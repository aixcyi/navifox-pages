import type { Hyperlink } from '@navifox/types';
import { thisYear } from './chore';

function* detect(): Generator<Hyperlink> {
    if (import.meta.env.VITE_ICP_NO)
        yield { text: import.meta.env.VITE_ICP_NO, link: import.meta.env.VITE_ICP_REF }
    if (import.meta.env.VITE_MPS_NO)
        yield { text: import.meta.env.VITE_MPS_NO, link: import.meta.env.VITE_MPS_REF }
    if (import.meta.env.VITE_MOE_NO)
        yield { text: import.meta.env.VITE_MOE_NO, link: import.meta.env.VITE_MOE_REF }
}

export const copyrights = [ ...detect() ]
export const copyrightInterval = { start: 2016, stop: thisYear }
