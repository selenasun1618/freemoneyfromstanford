import {EmbeddingType} from "@/internal/search";
import {Limits} from "@/constants/search";

class AsyncCache<K,V> implements AsyncCacheInternal<K,V> {
    inner: AsyncCacheInternal<K, V>
    constructor(inner: AsyncCacheInternal<K, V>) {
        this.inner = inner
    }
    get(key: K): Promise<V | null> {
        return this.inner.get(key)
    }
    async getOrElse(key: K, fallback: (key: K) => Promise<V>): Promise<V> {
        return this.inner.get(key).then(
            async (x) => {
                if(x === null)
                    return await fallback(key)
                return x
            }
        )
    }
}
interface AsyncCacheInternal<K,V> {
    get(key: K): Promise<V|null>
}
class EmbeddingsCache implements AsyncCacheInternal<string, EmbeddingType> {
    limit : number
    // TODO persistent cache hookup

    constructor(config: {
        limit: number,
    }) {
        this.limit = config.limit
    }

    async get(key: string): Promise<EmbeddingType|null> {
        // TODO add functionality
        return null
    }
}

export const embeddingsCache: AsyncCache<string, EmbeddingType> = new AsyncCache(new EmbeddingsCache({
    limit: Limits.MAX_EMBEDDING_CACHE
}))

