import pandas as pd


df = pd.read_csv('Cycling analytics distributed power chart.csv')
matrix = df.values.tolist()

tid = 337
watt = 400

bounds = [5, 60, 300, 1200, 3600]

upper_bound = 5 if tid <= 5 else \
60 if tid <= 60 else \
300 if tid <= 300 else \
1200 if tid <= 1200 else 3600

scale = (upper_bound - (tid - bounds[bounds.index(upper_bound) - 1])) \
      / (upper_bound - bounds[bounds.index(upper_bound) - 1])

column = bounds.index(upper_bound) + 1

row = 1

while  row + 1 < len(matrix) and watt < matrix[row][column]:
    row += 1

print(matrix[row][0])


