import {ApolloServer} from "apollo-server"
import {schema} from "./schema"
import {context} from "./context"

const port = process.env.PORT || 3005

export const server = new ApolloServer({
    schema,
    context,
    cors: {
        origin: ["http://localhost:3000", "https://studio.apollographql.com", "http://192.168.31.3:3000"]
    }
})

server.listen({port}).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})
