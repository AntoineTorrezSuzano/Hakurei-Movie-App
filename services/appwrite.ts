// track the search made by a user
import { Client, Databases, Query, ID} from "react-native-appwrite";

const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const TABLE_NAME = process.env.EXPO_PUBLIC_APPWRITE_TABLE_NAME;


const client = new Client()
    .setEndpoint(ENDPOINT!) // Your API Endpoint
    .setProject(PROJECT_ID!) // Your project ID
;
const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID!, TABLE_NAME!, [
            Query.equal('searchTerm', query)
        ])
        console.log(result)
        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument(
                DATABASE_ID!,
                TABLE_NAME!,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            )
        } else {
            await database.createDocument(DATABASE_ID!, TABLE_NAME!, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
    } catch (error) {
        console.error('Error updating search count:', error);
        throw error;
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie [] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID!, TABLE_NAME!, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])

        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

