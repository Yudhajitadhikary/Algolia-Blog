const algoliasearch= require("algoliasearch")

module.exports={
    getAlgoliaResults: function (request_object={},name){
        const SearchIndex=name=='name'?'Demo-Index-desc(name)':name=='price'?'Demo-Index-desc(price)':'Demo-Index'

        return new Promise((resolve,reject)=>{
                algoliasearch('AAFOFP264H','47a036007d9665e81cd85914d7b83913').initIndex(SearchIndex).search('',request_object).then(response=>{
                    resolve(response)
                })
                .catch(error=>reject(error))
            
        })
    },
    getAlgoliaSearchResults: function (request_object={},query){
        const SearchIndex='Demo-Index'

        return new Promise((resolve,reject)=>{
                algoliasearch('AAFOFP264H','47a036007d9665e81cd85914d7b83913').initIndex(SearchIndex).search(query,request_object).then(response=>{
                    resolve(response)
                })
                .catch(error=>reject(error))
            
        })
    }
}