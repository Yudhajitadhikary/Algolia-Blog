const algoliasearch=require('algoliasearch')
const getWriteClient=(name)=>{
// API keys below contain actual values tied to your Algolia account
const client = algoliasearch('AAFOFP264H', '47a036007d9665e81cd85914d7b83913')
return client.initIndex(name)
}
module.exports={
    getWriteClient
}