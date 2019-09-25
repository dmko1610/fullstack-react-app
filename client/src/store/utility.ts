export const updateObject = (oldObject: any, updatedObject: Object) => {
    return {
        ...oldObject,
        ...updatedObject
    }
};
