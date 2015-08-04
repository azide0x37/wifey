'''
wifey.py
Class implementation of wifey module
'''

class Wifey(Object):
    def __init__(self, accounts = [], username = '', password = '', pin = '0000'):
        self.accounts = accounts
        self.username = username
        self.password = password
        
        if pin != '0000':
            self.pin = pin

    def __str__(self):
        try:
            return self.accounts[0]
        except ValueError as e:
            return "Failure to resolve name."
