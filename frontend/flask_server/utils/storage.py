import pymongo

# singleton value
def get_url():
  url = "mongodb://bangghim1.duckdns.org:27019"
  return url

def get_client():
  client = pymongo.MongoClient(get_url())
  return client

def get_user_col():
  return get_client()["gigachat"]["users"]

def get_msg_col():
  return get_client()["gigachat"]["user_messages"]

def get_gpt_msg_col():
  return get_client()["gigachat"]["gpt_messages"]


class Message:  
  def __init__(self, user_name, time_stamp, text):
    self.user_name = user_name
    self.time_stamp = time_stamp
    self.text = text

  def convert(self, document):
    # TODO: convert document to message class
    self.user_name = document["username"]
    self.time_stamp = document["timestamp"]
    self.text = document["text"]

  def get_document(self):
    document = {
      "username": self.user_name,
      "timestamp": self.time_stamp,
      "text": self.text,
    }
    return document

class User:
  def __init__(self, user_name, password):
    self.user_name = user_name
    self.password = password
  def convert(self, document):
    # TODO: convert document to message class
    self.user_name = document["username"]
    self.password = document["password"]
  def get_document(self):
    document = {
      "username": self.user_name,
      "password": self.password
    }
    return document