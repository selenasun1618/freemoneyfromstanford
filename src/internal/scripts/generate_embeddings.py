import os
import json
from openai import OpenAI

def generate_embeddings():
    client = OpenAI()
    model="text-embedding-3-small"
    data_path = os.path.join(os.path.dirname(__file__),'..', 'database.json')
    embeddings_path = os.path.join(os.path.dirname(__file__),'..', 'embeddings.json')
    with open(data_path, 'r') as file:
        data = json.load(file)
    with open(embeddings_path, 'r') as file:
        embeddings = json.load(file)
    
    for key,value in data.items():  
        description = value['description'].replace("\n", " ")
        embedding = client.embeddings.create(input = [description], model = model).data[0].embedding
        embeddings[key] = embedding
    
    with open(embeddings_path, 'w') as file:
        json.dump(embeddings, file, indent=4)

if __name__ == '__main__':
    generate_embeddings()