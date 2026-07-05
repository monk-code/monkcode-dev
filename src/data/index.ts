import { en } from './copy.en'
import { nl } from './copy.nl'
import type { Locale, PageCopy } from './types'

export const locales: Locale[] = ['en', 'nl']
export const getCopy = (locale: Locale): PageCopy => (locale === 'nl' ? nl : en)
export type { Locale, PageCopy, WorkItem } from './types'
