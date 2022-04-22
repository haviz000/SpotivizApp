import {rest} from 'msw'
import config from '../utils/config'

export const handlers = [
    rest.get(`${config.SPOTIFY_BASE_URL}/me/playlists`,(req,res,ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                playlists:{
                    items:[
                        {
                            id:'1',
                            name:"test name",
                            images:
                                {
                                    url:'test image url'
                                },
                            external_urls:
                            {
                                spotify : 'test external url'
                            }
                        }
                    ]
                }
            })
        )
    })
]