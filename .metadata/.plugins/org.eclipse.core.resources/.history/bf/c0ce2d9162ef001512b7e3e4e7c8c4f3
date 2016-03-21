'''
Created on Mar 17, 2016

@author: lucy
'''
from twython import Twython
TWITTER_APP_KEY = 'uwAcM2cGOqcuslNIFHgYoyJRL' #supply the appropriate value
TWITTER_APP_KEY_SECRET = 'aV03HYizmS1vmMJ5dZROeVVcXQWGMiq48CsTgFGCZK1xiahRBx'
TWITTER_ACCESS_TOKEN = '1486245986-nwqzW414I9CvVyHfpAksoZW1gz95tAnv3zoCJNP'
TWITTER_ACCESS_TOKEN_SECRET = 'JlBa1Fewyhk6S4sLw9I4D5GEOTI849gL8TShPQVeUlV5l'

t = Twython(app_key=TWITTER_APP_KEY, 
            app_secret=TWITTER_APP_KEY_SECRET, 
            oauth_token=TWITTER_ACCESS_TOKEN, 
            oauth_token_secret=TWITTER_ACCESS_TOKEN_SECRET)

search = t.search(q='#HerConferenceHS',   #**supply whatever query you want here**
                  count=100)

tweets = search['statuses']

for tweet in tweets:
    print tweet['id_str'], '\n', tweet['text'], '\n\n\n'