export const setFormValues = <ObjKeys, ObjApi>(entity: ObjApi, setValue: (key: ObjKeys, value: string) => void) => {
  // @ts-ignore
  //   Object.keys(entity).forEach(key => {
  //     // @ts-ignore
  //     setValue(key, value)
  //   })
  for (let key in entity) {
    // @ts-ignore
    setValue(key, entity[key])
  }
}
