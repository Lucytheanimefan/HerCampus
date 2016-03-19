'''
Created on Mar 16, 2016
Functions to automate searching through the Her Campus search bar
@author: lucy
'''
import time
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
 
def init_driver():
    '''
    profile = webdriver.FirefoxProfile();
    profile.set_preference("browser.startup.homepage", "about:blank");
    profile.set_preference("startup.homepage_welcome_url", "about:blank");
    profile.set_preference("startup.homepage_welcome_url.additional", "about:blank");
    dr = webdriver.Firefox(profile)
    dr.title
    '''
    driver = webdriver.Firefox()
    driver.wait = WebDriverWait(driver, 5)
    return driver
 
 
def lookup(driver, query):
    driver.get("http://www.hercampus.com/search/site")
    try:
        box = WebDriverWait(driver, 10).until(lambda driver: driver.find_element_by_id("edit-keys"))
        button = WebDriverWait(driver, 10).until(lambda driver: driver.find_element_by_id("edit-submit"))
        box.send_keys(query)
        button.click()
    except TimeoutException:
        print("Box or Button not found in hercampus.com")
 
 
if __name__ == "__main__":
    driver = init_driver()
    lookup(driver, "college")
    time.sleep(5)
    #driver.quit()