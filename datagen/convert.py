import json


def transform_data(input_file, output_file):
    with open(input_file, 'r') as jsonl_input, open(output_file, 'w') as jsonl_output:
        for line in jsonl_input:
            data = json.loads(line)
            prompt = data['prompt']
            completion = data['completion']
            jsonl_output.write(json.dumps(
                {"text": f"### Human: {prompt} ### Assistant: {completion}"}) + '\n')


transform_data('cities.jsonl', 'dataset.jsonl')
