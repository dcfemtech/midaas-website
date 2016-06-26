n=100000 #number of records to extract
subset = open('subset.csv', 'w', newline='')
with open('csv_pus\ss14pusa.csv', 'r') as f:
   for x in range(0, n):
       first_line = f.readline()
       subset.write(first_line)
   subset.close()