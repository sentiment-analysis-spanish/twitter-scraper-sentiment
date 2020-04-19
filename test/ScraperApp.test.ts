
import AppScraper from '../src/scrapers/AppScraper'
require('dotenv').config();

describe('Extracts tweets from twitter', function () {
    const scraper = new AppScraper()
    describe('test query', function () {

        jest.setTimeout(999999)
        it('should return twitts', async function () {
            const params = {
                q: ':)',
                count: 10,
                result_type: 'recent',
                lang: 'es'
            }
            const results: any = await scraper.query(params)
            console.log(results["response"].max_id)
        });

        it('should iterate', async function () {
            
            const results: any = await scraper.extractPositiveNews()
            console.log(results)
        });
    });
});