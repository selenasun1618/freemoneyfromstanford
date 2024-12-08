export async function getSimilarGrants(searchQuery: string, numResults: number = 10) {
    try {
        // get embedding for search query
        const response = await fetch('/api/embed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: searchQuery }),
        });
        
        const queryEmbedding = await response.json();
        
        // load embeddings
        const embeddingsResponse = await fetch('@/embeddings.json');
        const embeddings = await embeddingsResponse.json();
        
        // calculate cosine similartiy
        const similarities = Object.entries(embeddings).map(([grantId, embedding]) => ({
            grantId,
            similarity: cosineSimilarity(queryEmbedding, embedding as number[])
        }));
        
        // sort by similarity, get top N results
        return similarities
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, numResults)
            .map(result => result.grantId);
    } catch (error) {
        console.error('Error in similarity search:', error);
        return [];
    }
}

function cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}