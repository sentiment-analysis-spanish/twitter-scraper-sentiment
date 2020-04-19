
import Twitter from 'twitter'

export default class AppScraper {
    public client:any

    constructor(){
        require('dotenv').config();

        this.client = new Twitter({
            consumer_key: process.env.API_KEY,
            consumer_secret: process.env.API_TOKEN,
            access_token_key: process.env.ACCESS_TOKEN_KEY,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET
          });
    }

    public query = async (params:any) => {
        console.log(process.env.API_KEY)
        

        return new Promise((resolve,reject) => {
            this.client.get('search/tweets', params, function(err:any, data:any, response:any) {
                if (err) reject(err)
                resolve({data, response})
            })
        })
    }

    public extractPositiveNews = async () => {
        const params:any = {
            q: ':)',
            count: 10,
            result_type: 'recent',
            lang: 'es'
          }
          let data = []
          
        let queryResult:any = await this.query(params)

        while (queryResult.data.search_metadata.max_id) {
            const max_id = queryResult.data.search_metadata.max_id
            console.log("quering with max_id " + max_id)
            params.since_id = max_id
            queryResult = await this.query(params)
            data.push(...queryResult.data.statuses)
            console.log(data.length)
        }
        return data
        
    }

}