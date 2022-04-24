const { getWriteClient } =require('./algoliaClient')
class IndexManager {
    constructor(name){
        if(!name){
            throw new Error('Algolia index name cannot be empty')
        }
        this.name=name
        this.index=getWriteClient(name)
        this.replaceAll=this.replaceAll.bind(this)
        this.createReplica=this.createReplica.bind(this)
        this.setSettings=this.setSettings.bind(this)
    }
    async replaceAll (data, {safe =false, requestOptions={}}={}){
        if(!data.length){
            console.log('No Data')
            return
        }
        const {objectID}=await this.index
        .replaceAllObjects(
            data,{safe,autoGenerateObjectIDIfNotExist:true},
            requestOptions,
        )
        .catch((error)=>{
            console.error('Error on Inserting Data in Algolia',error)
        })
        return objectID
    }
    async setSettings(attributes){
        await this.index.setSettings({
            searchableAttributes:attributes
        })
    }
    async createReplica(replicaIndexName){
        this.index.setSettings({
            replicas:replicaIndexName
        }).then(()=>{
            console.log('Created Replica',replicaIndexName)
        }).catch((error)=>{
            console.error(`Error creating Replica ${replicaIndexName}`,error)
        })

    }
}
module.exports=IndexManager