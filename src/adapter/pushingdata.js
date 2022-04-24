const constants=require('../data')
const IndexManager=require('./algoliaIndexManager')
function getFieldObject(name,value=''){
    if(value===null){
        value=''
    }
    return{
        [name]:value
    }
}
async function push(){
    console.log('starting to push data to Algolia')
    if(constants.data.length>0){
        let pushedData=[]
        const {replaceAll,setSettings,createReplica} =new IndexManager('Demo-Index')
        constants.data.forEach((node)=>{
            if(node){
                pushedData.push({
                    ...getFieldObject('image',node.imgUrl),
                    ...getFieldObject('name',node.name),
                    ...getFieldObject('price',node.price),
                    ...getFieldObject('facetCollection',node.facets)

                })
            }

        })
        try{
            await replaceAll(pushedData)
            await setSettings(['name'])
            await createReplica([
                'Demo-Index-desc(name)',
                'Demo-Index-desc(price)'
            ])
        
        console.info('Pushing Data successfull')
        }
        catch(err){
            console.error('Error Pushing data to Algolia completed')
        }
    }
}
push()