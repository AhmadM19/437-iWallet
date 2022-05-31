
import datetime
from app import db, ma

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    amount = db.Column(db.Float,  nullable=False)
    added_date = db.Column(db.DateTime )
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False) 
    receiver_id=db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False) 

    def __init__(self, amount, sender_id, receiver_id):
        super(Transaction, self).__init__(amount=amount,
        sender_id=sender_id,
        receiver_id=receiver_id,
        added_date=datetime.datetime.now())




class TransactionSchema(ma.Schema):
    class Meta:
        fields = ("id", "amount", "sender_id" ,"receiver_id","added_date")
        model = Transaction