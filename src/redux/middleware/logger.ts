/** @format */

const logger = (store: { getState: () => any }) => (next: (arg0: any) => any) => (action: { type: any }) => {
    const returnValue = next(action)
    console.groupEnd()
    return returnValue
}
export default logger
