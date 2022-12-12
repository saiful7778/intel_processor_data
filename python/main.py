import requests
from bs4 import BeautifulSoup

url = "https://www.intel.com/content/www/us/en/products/details/processors/core.html"
r = requests.get(url)
soup = BeautifulSoup(r.content, "lxml")
mainDiv = soup.find_all("div", id = "ps-accordion-panel-0")
for x in range(len(mainDiv)):
    links = mainDiv.find_all("h4", class_ = "panel")
    print(links)