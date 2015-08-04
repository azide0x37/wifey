'''
wifey.py
Class implementation of wifey module
'''

class Wifey(Object):
    def __init__(self, accounts = [], username = '', password = '', pin = '0000'):

    def __str__(self):
        try:
            return self.accounts[0]
        except ValueError as e:
            return "Failure to resolve name."
