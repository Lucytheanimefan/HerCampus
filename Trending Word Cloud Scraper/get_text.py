'''
Created on Mar 16, 2016
Getting all of the text from articles that contain a set list of hashtags
@author: lucy
'''
from Automate_Searches import *
import requests, bs4

# get sites
driver = init_driver()
lookup(driver, "college")
html=driver.page_source

res=requests.get('http://today.duke.edu/showcase/mmedia/features/lacrosse_incident/announce_archive.html')
res.raise_for_status

soup=bs4.BeautifulSoup(html,'html.parser')

# get all article urls 
for i in soup.findAll('li',{"class" : "search-result"}):
    print i.a['href']
    