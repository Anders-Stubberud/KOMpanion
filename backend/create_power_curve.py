import pandas as pd
import csv

df = pd.read_csv('Cycling analytics distributed power chart.csv')
matrix = df.values.tolist()

end_column = 3600
i_column = 5
index_column = 1

def insertion_columns(left_time, right_time, left_watt, right_watt):
    diff_time = right_time - left_time
    diff_watt = left_watt - right_watt
    relative_watt = diff_watt/diff_time
    wattage = left_watt - relative_watt
    return round(wattage, 2)

while i_column < end_column:
    if matrix[0][index_column] == i_column:
        i_column += 1
        index_column += 1
        continue
    matrix[0].insert(index_column, i_column)
    for j in range(1, len(matrix)):
        matrix[j].insert(index_column, insertion_columns(i_column - 1, matrix[0][index_column + 1], matrix[j][index_column-1], matrix[j][index_column]))
    i_column += 1
    index_column += 1

end_row = 5
i_row = 99
index_row = 1

def insertion_row(percent, row_index):
    arr = [0] * 3597
    arr[0] = percent
    for i in range(1, len(arr)):
        percentage_over = matrix[row_index - 1][0]
        percentage_under = matrix[row_index][0]
        percentage_diff = int(percentage_over) - int(percentage_under)
        watt_over = matrix[row_index - 1][i]
        watt_under = matrix[row_index][i]
        watt_diff = watt_over - watt_under
        relative_watt = watt_diff / percentage_diff
        wattage = watt_over - relative_watt
        arr[i] = round(wattage, 2)
    return arr

while i_row > end_row:
    if int(matrix[index_row][0]) == i_row:
        i_row -= 1
        index_row += 1
        continue
    matrix.insert(index_row, insertion_row(i_row, index_row))
    i_row -= 1
    index_row += 1

with open('power curve.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    for row in matrix:
        writer.writerow(row)
