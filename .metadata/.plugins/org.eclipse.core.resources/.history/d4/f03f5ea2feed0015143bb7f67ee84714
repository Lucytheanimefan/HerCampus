'''
Created on Mar 19, 2016

@author: lucy
'''
import csv

# parameter words is the array of words
def getFrequency(words):
    wordFreq={}
    for word in words:
        if word in wordFreq.keys():
            wordFreq[word]=wordFreq[word]+1
        else:
            wordFreq[word]=1;
    return wordFreq

# Parameters: textFile-name as seen in the topGoogleSearchTerms file
# wordFreq: the dictionary
def write_to_csv(textFile, wordFreq):
    fieldnames=['word', 'frequency']
    outputCount=open(textFile+'.csv','w')
    outputWriter=csv.DictWriter(outputCount,  delimiter=',', lineterminator='\n',fieldnames=fieldnames)
    outputWriter.writeheader()
    for key in wordFreq.keys():
        outputWriter.writerow({'word':key, 'frequency':wordFreq.get(key)})

# get frequencies of the words
terms = [line.rstrip('\n') for line in open('topGoogleSearchTerms.txt')]

for term in terms:
    print term
    thefile=open(term+'_AllWords.txt')
    text=thefile.read().replace(',','').replace('(','').replace('.','').replace(')','').replace('"','').replace(';','').replace(':','').replace('?','')
    print text.split()
    wordFreq=getFrequency(text.split())
    write_to_csv(term, wordFreq)
