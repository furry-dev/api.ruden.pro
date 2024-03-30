import {ApolloServer} from "apollo-server"
import {schema} from "./schema"
import {context} from "./context";

const port = process.env.PORT || 3005

export const server = new ApolloServer({
    schema,
    context,
    cors: {
        origin: ["http://localhost:3000", "https://studio.apollographql.com"]
    }
})

server.listen({port}).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})
