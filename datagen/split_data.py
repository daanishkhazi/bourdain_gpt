import json
import random


def split_data(input_file, train_file, test_file, train_ratio=0.9):
    # Load all data
    with open(input_file, 'r') as jsonl_input:
        data = [line for line in jsonl_input]

    # Shuffle the data
    random.shuffle(data)

    # Calculate split index
    train_idx = int(len(data) * train_ratio)

    # Split the data
    train_data = data[:train_idx]
    test_data = data[train_idx:]

    # Write train data
    with open(train_file, 'w') as train_output:
        for item in train_data:
            train_output.write(item)

    # Write test data
    with open(test_file, 'w') as test_output:
        for item in test_data:
            test_output.write(item)


split_data('dataset.jsonl', 'train.jsonl', 'test.jsonl')
