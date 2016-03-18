'''
Created on Mar 18, 2016
Gets all urls of Her Campus articles that correspond to top google search terms
@author: lucy
'''
from Automate_Searches import *
import bs4

def getText(word):
    herCampusUrls=open(word+'.txt','w')
    # get sites
    driver = init_driver()
    lookup(driver, word)
    html=driver.page_source
    
    soup=bs4.BeautifulSoup(html,'html.parser')
    # get all article urls 
    for i in soup.findAll('li',{"class" : "search-result"}):
        url=i.a['href']
        print url
        # write all of the urls to a text file
        herCampusUrls.write(url+'\n')
    
    driver.quit()

lines = [line.rstrip('\n') for line in open('topGoogleSearchTerms.txt')]
print lines
for line in lines:
    getText(line)
    
    
    