'''
Word frequencies
@author: lucy Zhang
'''
import csv, requests, bs4, re



def getWords(url):
    string=''
    res=requests.get(url)
    res.raise_for_status
    soup=bs4.BeautifulSoup(res.text, 'html.parser')
    for i in soup.findAll('p', attrs={'class': None}):
        string=string+''.join(i.findAll(text=True))
    return string.encode('utf-8')
# Get word frequencies
# Parameter: textFile 
def getFrequency(textFile):
    wordFreq={}
    afile=open(textFile+'.txt')
    words=afile.readlines()
    for word in words:
        if word in wordFreq.keys():
            wordFreq[word]=wordFreq[word]+1
        else:
            wordFreq[word]=1;
    return wordFreq

# write all of the <p> text to files
terms = [line.rstrip('\n') for line in open('topGoogleSearchTerms.txt')]

for term in terms:
    print term
    allwords=open(term+'_AllWords.txt','w')
    lines = [line.rstrip('\n') for line in open(term+'.txt')]
    for url in lines:
        #print url
        #print getWords(url)
        allwords.write(getWords(url))
        
    