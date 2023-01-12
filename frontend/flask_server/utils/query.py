import openai
import pymongo
import storage as storage
import time
import os
from serpapi import GoogleSearch

openai.api_key = "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"
# query the db for any new request 
# if yes
# send it to gpt
# get the response
# update the pymongo db
cur_document = 0

class WeatherGoogle():
  def __init__(self, answer_box):
    temperature = answer_box["temperature"]
    unit = answer_box["unit"]
    precipitation = answer_box["precipitation"]
    humidity = answer_box["humidity"]
    wind = answer_box["wind"]
    self.result = f"The weather is {temperature} {unit}, the precipitation is {precipitation}, humidity is {humidity}, wind speed is {wind}"
  def get_answer(self):
    return self.result

class TimeGoogle():
  def __init__(self, answer_box):
    result = answer_box["result"]
    self.result = f"Time is {result}"
  def get_answer(self):
    return self.result

class Calculator():
  def __init__(self, answer_box):
    result = answer_box["result"]
    self.result = f"The value is {result}"
  def get_answer(self):
    return self.result

def check_google_search(text):
  search = GoogleSearch({
    "q": text, 
    "location": "Edmonton,Alberta,Canada",
    "api_key": "f33ea78b6d582aa1eb319b3f880f2938cfa038ce5426d5f04ef1a945d051267f"
  })
  result = search.get_dict()
  if "answer_box" in result:
    if result["answer_box"]["type"] == "weather_result":
      return WeatherGoogle(result["answer_box"]).get_answer()
    elif result["answer_box"]["type"] == "local_time":
      return TimeGoogle(result["answer_box"]).get_answer()
    elif result["answer_box"]["type"] == "calculator_result":
      return Calculator(result["answer_box"]).get_answer()
    else:
      return None
  else:
    return None
def main():
  user_msg_col = storage.get_msg_col()
  gpt_msg_col = storage.get_gpt_msg_col()
  cur_cnt = user_msg_col.count_documents({})
  while True:
    new_cnt = user_msg_col.count_documents({})
    if new_cnt > cur_cnt:
      diff = new_cnt - cur_cnt
      # print(f"Documents Received: {diff}")
      documents = user_msg_col.find({}, sort=[( 'timestamp', pymongo.DESCENDING )] ).limit(diff)
      for doc in documents:
        response = check_google_search(doc["text"])
        if(response == None):
          response = openai.Completion.create(model="text-davinci-001", prompt=doc["text"], temperature=0, max_tokens=50)
          resp_msg = storage.Message(doc["username"], int(time.time()), response["choices"][0]["text"])
        else:
          resp_msg = storage.Message(doc["username"], int(time.time()), response)
        # print(resp_msg.text)
        gpt_msg_col.insert_one(resp_msg.get_document())
      cur_cnt = new_cnt

if __name__ == "__main__":
  main()