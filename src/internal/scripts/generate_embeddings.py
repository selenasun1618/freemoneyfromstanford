import json
from openai import OpenAI

def generate_embeddings():
    client = OpenAI()
    model="text-embedding-3-small"
    data_path = '../database.json'
    with open(data_path, 'r') as file:
        data = json.load(file)
    
    grants = data['grants']
    for i, grant in enumerate(grants):  
        description = grant['description'].replace("\n", " ")
        embedding = client.embeddings.create(input = [description], model = model).data[0].embedding
        print(f'embedding: {len(embedding)}\n')
        data['grants'][i]['embedding'] = embedding
    
    with open(data_path, 'w') as file:
        json.dump(data, file, indent=4)

if __name__ == '__main__':
    generate_embeddings()