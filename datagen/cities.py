import csv

def extract_cities(input_file, output_file):
    with open(input_file, 'r') as csvinput:
        with open(output_file, 'w', newline='') as csvoutput:
            writer = csv.writer(csvoutput)
            reader = csv.reader(csvinput)
            next(reader, None)  # skip headers
            for row in reader:
                city_country = f"{row[2]}, {row[4]}"
                writer.writerow([city_country])

input_file = 'cities-raw.csv'
output_file = 'cities.csv'
extract_cities(input_file, output_file)

