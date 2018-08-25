import pandas as pd

def main():
    bird_dataframe = pd.read_csv('bird_dataset.csv', encoding='utf-8')

    print(bird_dataframe)

    # bird_dataframe.rename(columns={'bird_name'}, inplace=True)
    bird_dataframe.insert(1, 'rarity', 'common') #adds all that is common as a placeholder
    bird_dataframe.insert(len(bird_dataframe.columns), 'illustration', 0)

    print(bird_dataframe.columns)

    bird_dataframe.to_csv('bird_dataset.csv', index=False)


# def add_values():
    # bird.add('Kea')



if  __name__ =='__main__':main()