
import datetime
from app import db, ma

class Deposit(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    amount = db.Column(db.Float,  nullable=False)
    added_date = db.Column(db.DateTime )
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)  
    def __init__(self, amount, user_id):
        super(Deposit, self).__init__(
        user_id=user_id,
        amount=amount,
        added_date=datetime.datetime.now(),
 )


class DepositSchema(ma.Schema):
    class Meta:
        fields = ("id", "amount", "added_date", "user_id" )
        model = Deposit