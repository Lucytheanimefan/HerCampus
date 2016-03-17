'''
Created on Mar 16, 2016
Getting all of the text from articles that contain a set list of hashtags
@author: lucy
'''
from Automate_Searches import *
import bs4

herCampusUrls=open('herCampusUrls.txt','w')
# get sites
driver = init_driver()
lookup(driver, "college")
html=driver.page_source


soup=bs4.BeautifulSoup(html,'html.parser')
# get all article urls 
for i in soup.findAll('li',{"class" : "search-result"}):
    url=i.a['href']
    print url
    # write all of the urls to a text file
    #herCampusUrls.write(url+'\n')
    
    