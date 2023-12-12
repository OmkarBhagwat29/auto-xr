export function GetEdges(rhino,geom)
{
    const edges = [];

    let brepEdges;
    let meshEdges;

    if (rhino.ObjectType.InstanceReference === geom.objectType) {
        

        // const brp = rhino.Brep.tryConvertBrep(geom)

        // if(brp)
        // {
        //     console.log(geom)
        //      brepEdges = brp.edges()
        // }

    }
    else if (rhino.ObjectType.Extrusion == geom.objectType ||
        rhino.ObjectType.Surface === geom.objectType) {

        const brp = geom.toBrep(false)
        if(brp)
        {
            brepEdges = brp.edges()
        }
        
    }
    else if (rhino.ObjectType.Mesh == geom.objectType) {

        meshEdges = geom.topologyEdges()
        //console.log("Mesh")
    }
    else if (rhino.ObjectType.Brep === geom.objectType) {
        //console.log("Brep")
        brepEdges = geom.edges()
        console.log(geom)
    }
    
    //console.log(brepEdges)
    if(brepEdges)
    {
        for(let i=0;i<brepEdges.count;i++)
        {
            const e = brepEdges.get(i).toNurbsCurve()
            edges.push(e)
        }
    }
    return edges;
}

export function GetLayers(doc)
{
    const layerTable = doc.layers()

    const layers = []
    for(let i = 0; i<layerTable.count;i++)
    {
        const la = layerTable.get(i)

        layers.push(la)
    }

    return layers
}