
export const updateObjectInArray = (items, itemsId, ObjPropName, newObjProps) => {
    return items.map (u => {
        if (u[ObjPropName] === itemsId){
            return {...u, ...newObjProps}
        }
        return u;
    })
}