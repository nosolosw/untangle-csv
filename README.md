# Untangle CSV columns

This utility converts this stream:

	date,"text/plain, text/html",text/plain,"text/plain, text/html, text/rtf","text/html, text/plain"
	2017-02-07,1,2,3,4
	2017-02-08,5,6,7,8
	2017-02-09,1,0,1,0
	2017-02-10,9,0,0,9

into:

	date,text/plain,text/html,text/rtf
	2017-02-07,10,8,3
	2017-02-08,26,20,7
	2017-02-09,2,2,1
	2017-02-10,18,18,0

Under the hood, it adds the contents of the columns splitted. The columns not repeated will have the same contents - see the `date` column in the example.

# How to use it

Install it as a global module:

	npm install -g untangle-csv

Use it UNIX-like:

	cat demo.csv | untangle-csv > demo-untangled.csv

Or as a regular script:

	untangle-csv demo.csv demo-untangled.csv
