declare module 'akasha' {
  const set: (key: string, val: any) => void
  const get: (key: string) => any
  const remove: (key: string) => void
  const clear: () => void
}
