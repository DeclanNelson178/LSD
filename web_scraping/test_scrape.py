import requests
import json
from bs4 import BeautifulSoup

# course information can be found on buzzport under course details

def get_name(soup):
	divs = soup.body.find_all('div')
	body = ''
	for d in divs:
		if d['class'] == ['pagebodydiv']:
			body = d

	table = body.find_all('table')[1]
	row = table.find_all('tr')[0]
	return row.td.get_text()

def get_credits(soup):
	divs = soup.body.find_all('div')
	body = ''
	for d in divs:
		if d['class'] == ['pagebodydiv']:
			body = d

	table = body.find_all('table')[1]
	text = table.find_all('tr')[1].td.br.get_text()
	i = 0
	while not text[i].isdigit():
		i += 1
	return text[i]

def get_prereqs(soup):
	divs = soup.body.find_all('div')
	body = ''
	for d in divs:
		if d['class'] == ['pagebodydiv']:
			body = d

	table = body.find_all('table')[1]
	text = table.find_all('tr')[1].td.br.get_text()
	text = text.split()
	i = 0
	for (x, t) in enumerate(text):
		if t == 'Prerequisites:':
			i = x
	prereqs = ''
	while i < len(text):
		if text[i].isdigit():
			prereqs += (text[i-1].lower() + text[i])
		elif len(text[i]) == 4 and text[i][0].isdigit():
			prereqs += (text[i-1].lower() + text[i])
		elif '(' in text[i]:
			prereqs += '('
		elif ')' in text[i]:
			prereqs += ')'
		elif text[i] == 'or':
			prereqs += '+'
		elif text[i] == 'and':
			prereqs += '*'

		i += 1
	return prereqs

	



urls = ['https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1100',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1171',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1301',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1315',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1316',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1331',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1332',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1371'\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1372',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1801',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1802',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1803',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1804',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1805',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=1XXX',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2050',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2051',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2110',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2200',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2261',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2316',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2335',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2340',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2345',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2600',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2698',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2699',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2701',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2801',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2802',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2803',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2804',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2805',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=2XXX',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3101',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3210',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3220',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3240',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3251',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3300',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3311',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3312',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3451',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3510',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3511',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3600',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3630',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3651',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3743',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3744',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3750',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3790',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3801',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3802',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3803',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3804',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3805',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3873',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=3XXX',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4001',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4002',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4005',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4010',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4052',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4057',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4210',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4220',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4233',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4235',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4237',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4240',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4245',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4251',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4255',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4260',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4261',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4270',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4280',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4290',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4320',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4330',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4342',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4365',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4392',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4400',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4420',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4432',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4440',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4452',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4455',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4460',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4464',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4470',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4472',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4475',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4476',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4480',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4495',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4496',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4497',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4510',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4520',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4530',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4540',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4550',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4560',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CS&crse_numb_in=4590',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=APPH&crse_numb_in=1040',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=APPH&crse_numb_in=1050',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=ENGL&crse_numb_in=1101',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=ENGL&crse_numb_in=1102',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=MATH&crse_numb_in=1552',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=PHYS&crse_numb_in=2211',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=MATH&crse_numb_in=1551',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=MATH&crse_numb_in=1554',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=MATH&crse_numb_in=1564',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=HIST&crse_numb_in=2111',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=HIST&crse_numb_in=2112',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=INTA&crse_numb_in=1200',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=POL&crse_numb_in=1101',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=PUBP&crse_numb_in=3000',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=PSYC&crse_numb_in=1101',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=MATH&crse_numb_in=2550',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=MATH&crse_numb_in=3406',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=SLS&crse_numb_in=3110',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=MATH&crse_numb_in=3406',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=MATH&crse_numb_in=4022',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=MATH&crse_numb_in=4032',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=MATH&crse_numb_in=4150',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=PSYC&crse_numb_in=3040',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=MATH&crse_numb_in=3012',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=MATH&crse_numb_in=3215',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=MATH&crse_numb_in=3670',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=CEE&crse_numb_in=3770',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=ISYE&crse_numb_in=3770',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=ISYE&crse_numb_in=2027',\
'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_course_detail?cat_term_in=202008&subj_code_in=ISYE&crse_numb_in=2028',\
]

courses = []
for url in urls:
	page = None
	c = {}
	try:
		page = requests.get(url)
	except:
		print('Issue loading url')
		print(url)
	soup = BeautifulSoup(page.content, 'html.parser')
	
	try:
		course = get_name(soup)
		pieces = course.split('-')
		name = pieces[1][1:]
		id = pieces[0].lower().split()
		id = id[0]+id[1]
		print(id, name)
		c['id'] = id
		c['name'] = name
	except:
		c['name'] = 'ERROR'

	try:
		c['credits'] = get_credits(soup)
	except:
		c['credits'] = 'ERROR'

	try:
		c['prereqs'] = get_prereqs(soup)
	except:
		c['prereqs'] = ''
	courses.append(c)

data = {}
data['courses'] = courses

with open('total_courses.json', 'w') as outfile:
	for line in courses:
		json.dump(line, outfile, indent=2)
		outfile.write(',\n')
