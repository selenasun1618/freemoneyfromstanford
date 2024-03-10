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

interface PersistentCacheConfig {
    readonly maxPersistentItems: number,
    readonly maxTransientItems: number,
    readonly mode: 'lru',
}

// EMBEDDINGS CACHE

class EmbeddingsCache implements AsyncCacheInternal<string, EmbeddingType> {
    config: PersistentCacheConfig
    // TODO persistent cache hookup

    constructor(config: PersistentCacheConfig) {
        this.config = config
    }

    async get(key: string): Promise<EmbeddingType|null> {
        // TODO add functionality
        return null
    }
}

export const embeddingsCache: AsyncCache<string, EmbeddingType> = new AsyncCache(new EmbeddingsCache({
    maxPersistentItems: Limits.MAX_PERSISTENT_EMBEDDING_CACHE,
    maxTransientItems: Limits.MAX_TRANSIENT_EMBEDDING_CACHE,
    mode: "lru"
}))

