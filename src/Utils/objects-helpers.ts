
export const updateObjectInArray = (items: any, itemsId: any, ObjPropName: any, newObjProps: any) => {
    return items.map ((u: any) => {
        if (u[ObjPropName] === itemsId){
            return {...u, ...newObjProps}
        }
        return u;
    })
}