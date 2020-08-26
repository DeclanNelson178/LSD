from bs4 import BeautifulSoup

# grab downloaded courses from files and feed into soup object
with open('theory_intel.html') as fp:
	soup = BeautifulSoup(fp, features="lxml")

# format html
# print(soup.prettify())

print('---')

# print just text
# print(soup.get_text())

# print only tables
# currently grabbing the first table, the table body, and all rows
t = soup.find_all('table')[0].tbody.find_all('tr')

# narrow down the rows to eliminate headers
for x in t:
	if len(x['class']) == 1:
		try:
			print(x.td.a['title'])
		except:
			try:
				print(x.td.span.a.get_text())
			except:
				print('Problem Child:', x.td.get_text())

# Goals
# 1. scrape thread requirements
# 2. scrape course catalogue
# 3. scrape course pre-reqs
# currently trying to scrape entire thread to generate every class needed

# bs4 notes
# 4 elements of soup
# 1) tag: soup.p, soup.div
# 		can access the attributes of the resulting tag object with tag.attrs 