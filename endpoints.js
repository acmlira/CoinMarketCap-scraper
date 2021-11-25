const { get } = require('axios')

module.exports = (app) => {
  app.get('/pancakeswap/:token', async (request, response) => {
    /*
      #swagger.tags = ['GET']
      #swagger.description = 'Endpoint to get the informations about coin to scrap.'
      #swagger.produces = ["application/json"]
      #swagger.parameters['token'] = { 
        description: 'Coin token (e.g. for cryptomines the token should be: 0xD44FD09d74cd13838F137B590497595d6b3FEeA4).', 
        type: 'string'
      }  
    */
    const retrive = async () => {
      try {
        const url = `https://api.pancakeswap.info/api/v2/tokens/${request.params.token}`
        const fetch = await get(url)
        console.log(fetch);
        return { 
          succeed: true, 
          status: fetch.status, 
          message: fetch.statusText, 
          update: fetch.data.updated_at,
          content: { 
            name: fetch.data.data.name,  
            symbol: fetch.data.data.symbol,  
            price: fetch.data.data.price  
          } 
        }
      } catch (error) {
        return { 
          succeed: false,
          status: error.response.status, 
          message: error.response.statusText
        }
      }
    }

    const data = await retrive()
    if (data.succeed) {
      return response.status(200).send(data) // #swagger.responses[200] = { description: 'Success.' } 
    } else {
      return response.status(400).send(data) // #swagger.responses[400] = { description: 'Failure.' } 
    }
  });
}