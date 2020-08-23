import requests
from bs4 import BeautifulSoup

urls = ['https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1171']

for url in urls:
	page = requests.get(url)
	soup = BeautifulSoup(page.content, 'html.parser')
	divs = soup.body.find_all('div')
	body = ''
	for d in divs:
		if d['class'] == ['pagebodydiv']:
			body = d

	table = body.find_all('table')[1].prettify()





# def get_name():
