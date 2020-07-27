from bs4 import BeautifulSoup
with open('class_listing.html') as fp:
	soup = BeautifulSoup(fp, features="lxml")

# soup = BeautifulSoup('<html>a web page</html>', features="lxml")
div = soup.find("div", class_="pagebodydiv").table
print(div)
